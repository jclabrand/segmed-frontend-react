
/*	Copyright (C) 2023, All Rights Reserved
 *	Written by Juan Carlos Labrandero <jcharly@labrandero.com>
 */


import React from 'react'
import ReactDOM from 'react-dom/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, concat } from '@apollo/client'

import { App } from './app/app'

function main() {
	const authLink = setContext(() => {
		return {}
	})

	const client = new ApolloClient({
		link: concat(authLink, new HttpLink({ uri: 'http://localhost:3000/graphql' })),
		cache: new InMemoryCache({})
	})

	return {
		client
	}
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ApolloProvider client={ main().client }>
			<App/>
		</ApolloProvider>
	</React.StrictMode>
)
