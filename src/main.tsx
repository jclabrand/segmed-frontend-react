
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, concat, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

import { getAuth } from './app/client'
import { App } from './app/app'


function main() {
	const authLink = setContext((_, { headers }) => {
		const { bearer, token } = getAuth()

		return {
			headers: {
				...headers,
				authorization: `${bearer} ${ token }`,
			}
		}
	})

	const client = new ApolloClient({
		link: split(
			({ query }) => {
				const def = getMainDefinition(query)
				return def.kind === 'OperationDefinition' && def.operation === 'subscription'
			},
			new GraphQLWsLink(createClient({
				url: 'ws://localhost:3000/graphql'
			})),
			concat(authLink, new HttpLink({ uri: 'http://localhost:3000/graphql' }))
		),
		cache: new InMemoryCache({
			typePolicies: {
				User: {
					fields: {
						isAuthorized: {
							read() {
								return true
							}
						}
					}
				}
			}
		})
	})

	return {
		client
	}
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<ApolloProvider client={ main().client }>
				<App/>
			</ApolloProvider>
		</BrowserRouter>
	</React.StrictMode>
)
