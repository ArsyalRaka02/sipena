import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "./src/store";
import NavigatorProvider from "./src/navigator/mainNavigator";
import FlashMessage from "react-native-flash-message";
import { persistStore } from 'redux-persist';

console.disableYellowBox = true;

export default function App(props) {
	const [ready, setReady] = useState(false);

	const loadInitialData = async () => {
		await new Promise(resolve => {
			persistStore(store, null, async () => {
				resolve(null);
			});
		});

		setReady(true);
	};

	useEffect(() => {
		loadInitialData();
	}, []);

	if (ready) {
		return (
			<ReduxProvider store={store}>
				<StatusBar barStyle="light-content" />
				<NavigatorProvider />
				<FlashMessage position="top" />
			</ReduxProvider>
		);
	} else {
		return null;
	}
}

const styles = StyleSheet.create({
	flex: { flex: 1 }
});