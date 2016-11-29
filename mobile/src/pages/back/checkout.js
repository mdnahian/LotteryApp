import React, { Component } from 'react';
import {
	View,
	Text,
	Image
} from 'react-native';
import styles from '../../../style/page';

module.exports = React.createClass({
	render: function () {
		return <View style={styles.page}>
			<Text style={styles.title}>Checkout</Text>
		</View>
	}
})