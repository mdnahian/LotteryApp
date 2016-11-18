import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TextInput,
	TouchableHighlight,
	ScrollView
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../../../style/page';
var firebase = require("firebase");

module.exports = React.createClass({
	componentWillMount: function () {
		firebase.auth().onAuthStateChanged((user) => {
		  if (user) {
		  	if(user.emailVerified){
		  		this.props.navigator.resetTo({name: 'tickets'});
		  	} else {
		  		this.props.navigator.resetTo({name: 'confirm'});
		  	}
		  }
		});
	},
	getInitialState: function () {
		return {
			isLoadingVisible: false,
			errorMessage: <Text></Text>
		}
	},
	render: function () {
		return <ScrollView> 
			<View style={[styles.page, {justifyContent:'center', margin:25}]}>
				{this.state.errorMessage}
				<Text style={[styles.title, {textAlign:'center'}]}>My Account</Text>
				<View style={[styles.section]}>
					<View style={styles.sectionHer}>
						<Text style={styles.label}>Email</Text>
						<TextInput 
							style={styles.textInput}
							value={this.state.email}
							onChangeText={(text) => this.setState({email: text})}/>
					</View>
					<View style={[styles.sectionHer, {marginTop:10}]}>
						<Text style={styles.label}>Password</Text>
						<TextInput 
							style={styles.textInput}
							value={this.state.password}
							secureTextEntry={true}
							onChangeText={(text) => this.setState({password: text})}/>
					</View>
					<TouchableHighlight underlayColor={'#007804'} onPress={this.signIn} style={[styles.greenBtn, {marginTop:20, padding:20}]}>
						<Text style={styles.borderBtnText}>LOGIN</Text>
					</TouchableHighlight>

					<TouchableHighlight underlayColor={'#ffffff'} onPress={() => this.props.navigator.push({name: 'forgot'})} style={[styles.greenBtn, {marginTop:20, padding:20, backgroundColor:'#ffffff'}]}>
						<Text style={styles.borderBtnText, {color:'#242424', textAlign:'center'}}>FORGOT PASSWORD?</Text>
					</TouchableHighlight>

					<TouchableHighlight underlayColor={'#dedede'} onPress={() => this.props.navigator.push({name: 'signup'})} style={[styles.greenBtn, {marginTop:20, padding:20, backgroundColor:'#eeeeee'}]}>
						<Text style={styles.borderBtnText, {color:'#242424', textAlign:'center'}}>SIGN UP</Text>
					</TouchableHighlight>
				</View>

				<Spinner visible={this.state.isLoadingVisible}/>
			</View>
		</ScrollView>
	},
	signIn: function () {
		if(this.state.email != null && this.state.password != null){
			this.setState({isLoadingVisible: true});
			firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
			  if(error){
			  	this.setState({
			  		isLoadingVisible: false,
			  		errorMessage: <Text style={styles.errorMessage}>{error.message}</Text>
			  	});
			  }
			});
		}
	}
})