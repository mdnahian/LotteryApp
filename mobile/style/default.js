import React from 'react';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1
	},
	statusBar: {
		backgroundColor: '#dedede',
		height: (Platform.OS === 'ios') ? 20 : 0
	},
	navbar: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff',
		padding:15
	},
	title: {
		flex: 3,
		fontWeight:'bold',
		fontSize: 15
	},
	settingsBtn: {
		width: 24,
		height: 24
	}
})