import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	Navigator
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

var firebase = require("firebase");

var Login = require('./pages/front/login');
var Signup = require('./pages/front/signup');
var Forgot = require('./pages/front/forgot');

var front_ROUTES = {
	login: Login,
	signup: Signup,
	forgot: Forgot
};

var Tickets = require('./pages/back/tickets');
var Pools = require('./pages/back/pools');
var Checkout = require('./pages/back/checkout');
var Account = require('.pages/back/account');

var back_ROUTES = {
	tickets: Tickets,
	pools: Pools,
	checkout: Checkout,
	account: Account
}


module.exports = React.createClass({
	getInitialState: function () {
		return {
			isLoadingVisible: true,
			isLoggedIn: false
		}
	},
	componentWillMount: function () {
		var config = {
			apiKey: "AIzaSyCBc6vrJJmz2kcj4pQiXcugceW2LQScQ0c",
			authDomain: "lottery-90cf1.firebaseapp.com",
			databaseURL: "https://lottery-90cf1.firebaseio.com",
			storageBucket: "lottery-90cf1.appspot.com",
			messagingSenderId: "114192495687"
		};
  		firebase.initializeApp(config);

  		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    this.setState({
		    	isLoggedIn: true,
		    	isLoadingVisible: false,
		    	initialRoute: 'tickets'
		    });
		  } else {
		    this.setState({
		    	isLoggedIn: false,
		    	isLoadingVisible: false,
		    	initialRoute: 'login'
		    });
		  }
		});

	},
	renderScene: function (route, navigator) {
		var Component = front_ROUTES[route.name];

		if(this.state.isLoggedIn){
			Component = back_ROUTES[route.name];
		}

		return <Component route={route} navigator={navigator} />
	},
	render: function () {
		return <View style={styles.container}>
			<View style={styles.navbar}>
				<Text>Lottery</Text>
				<Image style={styles.settingsBtn} source={require('../../img/settings.png')} />
			</View>
			<Navigator style={{flex: 1}}
				initialRoute={{name: this.state.initialRoute}}
				renderScene={this.renderScene}
				configScence={() => { return Navigator.SceneConfigs.FloatFromRight; }} />
		</View>
	}
});