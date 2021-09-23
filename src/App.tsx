import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { AppRoutes } from "./route";

import "./App.css";

const httpLink = createHttpLink({
	uri: "https://api.github.com/graphql",
});

const TOKEN = "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";

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: `Bearer ${TOKEN}`,
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="app">
				<AppRoutes />
			</div>
		</ApolloProvider>
	);
}

export default App;
