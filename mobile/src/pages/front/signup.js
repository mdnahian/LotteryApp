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
		  	user.updateProfile({
		  		displayName: this.state.fname+' '+this.state.lname,
		  		fname: this.state.fname,
		  		lname: this.state.lname
		  	}).then(() => {
		  		user.sendEmailVerification().then(() => {
					this.props.navigator.resetTo({name: 'confirm'});
				}, function(error) {
				  // An error happened.
				});
		  	});
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
				<Text style={[styles.title, {textAlign:'center'}]}>Create an Account</Text>
				<View style={[styles.section]}>
					<View style={styles.sectionHer}>
						<Text style={styles.label}>First Name</Text>
						<TextInput 
							style={styles.textInput}
							value={this.state.fname}
							onChangeText={(text) => this.setState({fname: text})}/>
					</View>
					<View style={[styles.sectionHer, {marginTop:10}]}>
						<Text style={styles.label}>Last Name</Text>
						<TextInput 
							style={styles.textInput}
							value={this.state.lname}
							onChangeText={(text) => this.setState({lname: text})}/>
					</View>
					<View style={[styles.sectionHer, {marginTop:10}]}>
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
					<View style={[styles.sectionHer, {marginTop:10}]}>
						<Text style={styles.label}>Confirm Password</Text>
						<TextInput 
							style={styles.textInput}
							value={this.state.confirm}
							secureTextEntry={true}
							onChangeText={(text) => this.setState({confirm: text})}/>
					</View>
					<TouchableHighlight underlayColor={'#007804'} onPress={this.signUp} style={[styles.greenBtn, {marginTop:20, padding:20}]}>
						<Text style={styles.borderBtnText}>SIGN UP</Text>
					</TouchableHighlight>
				</View>

				<Spinner visible={this.state.isLoadingVisible}/>
			</View>
		</ScrollView>

	},
	signUp: function () {
		if(this.state.email != null
		 && this.state.password != null
		 && this.state.fname != null
		 && this.state.lname != null
		 && this.state.confirm != null){
			this.setState({isLoadingVisible: true});

			firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
			  
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  
			  this.setState({
			  	errorMessage: <Text style={styles.errorMessage}> {errorMessage} </Text>
			  })

			});

		}
	}
})