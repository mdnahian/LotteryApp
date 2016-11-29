import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	Navigator,
	TouchableHighlight
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../style/default';


var firebase = require("firebase");

var Login = require('./pages/front/login');
var Signup = require('./pages/front/signup');
var Forgot = require('./pages/front/forgot');
var Confirm = require('./pages/front/confirm')

var Tickets = require('./pages/back/tickets');
var Pool = require('./pages/back/pool');
var Checkout = require('./pages/back/checkout');
var Settings = require('./pages/back/settings');


var ROUTES = {
	login: Login,
	signup: Signup,
	forgot: Forgot,
	tickets: Tickets,
	pool: Pool,
	checkout: Checkout,
	settings: Settings,
	confirm: Confirm
};


module.exports = React.createClass({
	getInitialState: function () {
		return {
			isLoadingVisible: true,
			isLoggedIn: false,
			initialRoute: 'login'
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

		// var user = firebase.auth().currentUser;

		// if(user){
		// 	return {
		// 		isLoggedIn: true,
		// 		initialRoute: 'tickets'
		// 	}
		// } else {
		// 	return {
		// 		isLoadingVisible: false,
		// 		isLoggedIn: false,
		// 		initialRoute: 'login'
		// 	}
		// }
	},
	renderScene: function (route, navigator) {

		var Component = ROUTES[route.name];
		var settingsBtn;
		var backBtn;
		var header = <Text style={styles.title}>YEAHAMIN</Text>;

		var routes = navigator.getCurrentRoutes(0);
		var currentRoute = routes[routes.length - 1].name;

		if(this.state.isLoggedIn && currentRoute != 'settings'){
			settingsBtn = <TouchableHighlight underlayColor={'#eeeeee'} onPress={() => this.openSettings(navigator)}><Image style={styles.settingsBtn} source={require('../img/settings.png')} /></TouchableHighlight>
		}

		if(currentRoute != 'tickets' && currentRoute != 'login'){
			backBtn = <TouchableHighlight underlayColor={'#eeeeee'} onPress={() => this.goBack(navigator)}><Image style={[styles.settingsBtn, {marginRight:25}]} source={require('../img/back.png')} /></TouchableHighlight>
		}

		if(currentRoute == 'login' || currentRoute == 'signup' || currentRoute == 'forgot'){
			header = <Image style={{marginTop:35, width:65, height:65}} source={require('../img/icon.png')} />;
		}

		return <View style={styles.container}>
			<View style={styles.statusBar}></View>
			<View style={styles.navbar}>
				{backBtn}
				{header}
				{settingsBtn}
			</View>
			<Component route={route} navigator={navigator} parent_state={this} />
			<Spinner visible={this.state.isLoadingVisible}/>
		</View>
	},
	render: function () {
		return <Navigator style={{flex: 1}}
			initialRoute={{name: this.state.initialRoute}}
			renderScene={this.renderScene}
			configScence={() => { return Navigator.SceneConfigs.FloatFromRight; }} />
	},
	openSettings: function (navigator) {
		navigator.push({ name: 'settings' });
	},
	goBack: function (navigator) {
		navigator.pop(0);
	}
});