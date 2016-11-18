import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight
} from 'react-native';
var firebase = require("firebase");
import styles from '../../../style/page';

module.exports = React.createClass({
	componentWillMount: function () {

		firebase.auth().onAuthStateChanged((user) => {
		  if (user) {
		    this.setState({fname: user.fname, lname: user.lname, email: user.email});
		    firebase.auth().signOut();
		  }
		});

	},
	getInitialState: function () {
		return {
			fname: '',
			lname: '',
			email: ''
		}
	},
	render: function () {
		return <View style={[styles.page, {justifyContent:'center'}]}>
			<View>
				<Text style={[styles.title, {textAlign:'center'}]}>Sign Up Successful</Text>
				<Text style={{padding:20, textAlign:'center'}}>You will recieve a confimation email sent to {this.state.email}.</Text>
			</View>
			<TouchableHighlight underlayColor={'#dedede'} onPress={this.resendEmail} style={[styles.greenBtn0, {marginTop:20, padding:20, height:50, backgroundColor:'#eeeeee', justifyContent:'center', alignItems:'center'}]}>
				<Text style={styles.borderBtnText, {color:'#242424', textAlign:'center'}}>RESEND CONFIRMATION EMAIL</Text>
			</TouchableHighlight>
			<TouchableHighlight underlayColor={'#007804'} onPress={() => this.props.navigator.resetTo({name: 'login'})} style={[styles.greenBtn0, {marginTop:20, padding:20, height:50, justifyContent:'center', alignItems:'center'}]}>
				<Text style={styles.borderBtnText}>LOGIN</Text>
			</TouchableHighlight>
		</View>
	},
	resendEmail: function () {
		
	}
})