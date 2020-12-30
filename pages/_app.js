import React from 'react';
import Head from 'next/head';
import App from 'next/app';
import { UiContextProvider } from '../contexts/ui/ui.context';
import { DataContextProvider } from "../contexts/data/data.context";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.css';

class MyApp extends App {
	static async getInitialProps({ Component, ctx, query }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	render() {
		const { Component, pageProps } = this.props;
		return (
			<DataContextProvider>
				<UiContextProvider>
					<Head>
						<title>Stock Charts</title>
						<link rel="icon" href="/logo.svg" />
					</Head>
					<Component {...pageProps}/>
				</UiContextProvider>
			</DataContextProvider>
		);
	}
}

export default MyApp;
