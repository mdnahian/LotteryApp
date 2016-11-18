import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableHighlight
} from 'react-native';

import styles from '../../../style/page';

module.exports = React.createClass({
	render: function () {
		return <ScrollView style={styles.page}>
			<TouchableHighlight underlayColor={'#eeeeee'} onPress={() => this.navigate('account')}>
				<View style={[styles.sectionHor, styles.border, styles.settingsSection]}>
					<View style={{marginRight: 15}}>
						<Image source={require('../../../img/account.png')} />
					</View>
					<View style={styles.sectionHor}>
						<Text style={styles.settingsOption}>My Account</Text>
					</View>
				</View>
			</TouchableHighlight>

			<TouchableHighlight underlayColor={'#eeeeee'} onPress={() => this.navigate('billing')}>
				<View style={[styles.sectionHor, styles.border, styles.settingsSection]}>
					<View style={{marginRight: 15}}>
						<Image source={require('../../../img/billing.png')} />
					</View>
					<View style={styles.sectionHor}>
						<Text style={styles.settingsOption}>Billing Information</Text>
					</View>
				</View>
			</TouchableHighlight>

			<TouchableHighlight underlayColor={'#eeeeee'} onPress={() => this.navigate('terms')}>
				<View style={[styles.sectionHor, styles.border, styles.settingsSection]}>
					<View style={{marginRight: 15}}>
						<Image source={require('../../../img/terms.png')} />
					</View>
					<View style={styles.sectionHor}>
						<Text style={styles.settingsOption}>Terms & Conditions</Text>
					</View>
				</View>
			</TouchableHighlight>

			<TouchableHighlight underlayColor={'#eeeeee'} onPress={() => this.navigate('privacy')}>
				<View style={[styles.sectionHor, styles.border, styles.settingsSection]}>
					<View style={{marginRight: 15}}>
						<Image source={require('../../../img/privacy.png')} />
					</View>
					<View style={styles.sectionHor}>
						<Text style={styles.settingsOption}>Privacy Policy</Text>
					</View>
				</View>
			</TouchableHighlight>

		</ScrollView>
	},
	navigate: function (route) {

	}
})