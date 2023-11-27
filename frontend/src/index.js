import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";

import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/root";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { setContext } from '@apollo/client/link/context';
import {
	ApolloProvider,
	ApolloClient,
	createHttpLink,
	InMemoryCache,
} from '@apollo/client';

const defaultOptions = {
	watchQuery: {
		fetchPolicy: 'network-only',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'network-only',
		errorPolicy: 'all',
		nextFetchPolicy: 'no-cache',
	},
	mutate: {
		errorPolicy: 'all'
	}
}

const link = createHttpLink({
	uri: process.env.REACT_APP_GQL
});

const authLink = setContext((_, { headers }) => {
	const accessToken = localStorage.getItem("access-token");
	return {
		headers: {
			...headers,
			authorization: accessToken ? `Bearer ${accessToken}` : ''
		}
	};
});

const client = new ApolloClient({
	link: authLink.concat(link),
	cache: new InMemoryCache(),
	defaultOptions
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<Provider store={store}>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
const configuration = {
	onUpdate: (registration) => {
		if (registration && registration.waiting) {
			if (
				window.confirm("New version available!  refresh to update your app?")
			) {
				registration.waiting.postMessage({ type: "SKIP_WAITING" });
				window.location.reload();
			}
		}
	},
};
serviceWorkerRegistration.register(configuration);
// reportWebVitals();
