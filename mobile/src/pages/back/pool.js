import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	NativeModules,
	TouchableHighlight
} from 'react-native';
import styles from '../../../style/page';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var MFLReactNativePayPal = NativeModules.MFLReactNativePayPal;
MFLReactNativePayPal.initializePaypalEnvironment(1, "ATuxOMBcSxoVUU_FF1NosbPIgMI-H-G5Zk0uj9VWEvcNTJTvB1Zc77q3fWGokWI5ebv3y3d9hF8hbEaW");

var PayPal = require('react-native-paypal');

var radio_props = [
  {label: 'Single Play', value: 0 },
  {label: 'Double Play', value: 1 }
];
var pools = ["10", "20", "25", "50", "100"];


var firebase = require("firebase");

var Quantity = require("react-quantity-textinput");

module.exports = React.createClass({
	componentWillMount: function () {
		var user = firebase.auth().currentUser;

		if (user) {

			this.props.parent_state.setState({
				isLoggedIn: true
			});
			
		} else {
		  	this.props.navigator.resetTo({name: 'login'});
		}
	},
	getInitialState: function () {
		return {
			ticket: this.props.parent_state.state.ticket,
			currentPrice: 0,
			currentOptions: []
		}
	},
	render: function () {
		var ticket = this.state.ticket;
		
		var ticketType = '';

		if(ticket.name == 'Powerball') {
			ticketType = 'PPL';
		} else if(ticket.name == 'Mega') {
			ticketType = 'MPL';
		}
		

		return <View style={[styles.page, {padding:0}]}>
			<ScrollView style={[styles.section, {padding:10}]}>

				<View style={{alignItems:'center'}}>
					<Image style={styles.ticketImage} resizeMode='cover' source={{uri: ticket.image}} />
				</View>
				<View style={styles.section}>
					<Text style={{marginBottom:25, fontWeight:'bold'}}>Select Play Type:</Text>
					<RadioForm
					  radio_props={radio_props}
					  buttonColor={'#007804'}
					  labelHorizontal={true}
					  formHorizontal={true}
					  labelStyle={{marginRight: 15}}
					  animation={false}
					  onPress={(value) => { this.setState({single_double: value}) }}/>

				</View>

				<View style={styles.section}>
					<Text style={{marginBottom:5, marginTop:5, fontWeight:'bold'}}>Select Pool:</Text>
					<View style={[styles.sectionVer]}>
						{
							pools.map((item, index) => {

								var value = this.state.single_double;
								var single_double = '';

								if(value == 0){
									single_double = 'SP'
								} else {
									single_double = 'MP'
								}
								
								var text1 = ticketType + item + single_double + "1";
								var text2 = ticketType + item + single_double + "2";

								return <View key={index}><View style={[styles.sectionHor, {marginBottom:5, justifyContent:'center', alignItems:'center'}]}>
									<Text style={{flex:1, fontSize:18}}><Text style={{fontWeight:'bold'}}>${item}</Text> Pool 1</Text>
									<Text style={{flex:1, fontSize:18}}>0/{10000/parseInt(item)}</Text>
									<Quantity onChangeText={(text) => this.setCurrentOption(text1, item, text, ticket)} />
								</View>
								<View style={[styles.sectionHor, {marginBottom:15, justifyContent:'center', alignItems:'center'}]}>
									<Text style={{flex:1, fontSize:18}}><Text style={{fontWeight:'bold'}}>${item}</Text> Pool 2</Text>
									<Text style={{flex:1, fontSize:18}}>0/{10000/parseInt(item)}</Text>
									<Quantity onChangeText={(text) => this.setCurrentOption(text2, item, text, ticket)} />
								</View></View>

							})
						}
					</View>
				</View>
				
			</ScrollView>

			<View style={{position:'relative', left:0, right:0, bottom:0, backgroundColor:'#eeeeee', zIndex:5, padding:10}}>
				<View style={[styles.sectionHor, {marginTop:10}]}>
					<Text style={{flex:1, fontWeight:'bold', fontSize:18}}>Total:</Text>
					<Text style={{flex:1, fontSize:18, textAlign:'right'}}>${this.state.currentPrice}.00</Text>
				</View>
				<View style={styles.section}>
					<TouchableHighlight underlayColor={'#007804'} onPress={this.buyBtnPressed} style={[styles.greenBtn, {marginTop:10}]}>
						<Text style={styles.borderBtnText}>Buy {ticket.name}</Text>
					</TouchableHighlight>
				</View>
			</View>

		</View>
	},
	dissmissLoadingEffect: function () {
		this.setState({
			isLoadingVisible: false
		});
	},
	showLoadingEffect: function () {
		this.setState({
			isLoadingVisible: true
		})
	},
	buyBtnPressed: function () {

		MFLReactNativePayPal.preparePaymentOfAmount(this.state.currentPrice.toString(), "USD", "YEAHAMIN LOTTERY TICKETS");

		MFLReactNativePayPal.presentPaymentViewControllerForPreparedPurchase((error, payload) => {
		    if (error) {
		      console.log(error);
		      return;
		    } else {
		     console.log(this.state.currentOptions);
		     console.log(payload);
		     if (payload.status == 1) {
		        console.log(payload.confirmation);
		     } else {
		        console.log("User cancelled payment");
		     }
		    }
		 });

		// PayPal.paymentRequest({
		//   clientId: '',
		//   environment: PayPalAndroid.SANDBOX,
		//   price: this.state.currentPrice.toString(),
		//   currency: 'USD',
		//   description: 'YEAHAMIN Lottery Tickets'
		// }).then((confirm, payment) => console.log('Paid'))
		// .catch((error_code) => console.error('Failed to pay through PayPal'));

	},
	setCurrentOption: function (option, value, quantity, ticket) {

		var currentOptions = this.state.currentOptions;

		var currentPrice = 0;

		// ['option', 1, price]

		if(currentOptions.length == 0){
			currentOptions.push([option, parseInt(quantity), parseInt(value)]);
		} else {

			var isIn = false;

			for(var i=0; i<currentOptions.length; i++){
				if(currentOptions[i][0] == option) {
					currentOptions[i][1] = parseInt(quantity);
					isIn = true;
					break;
				}

				if(currentOptions[i][1] == 0){
					currentOptions.splice(i, 1)
				}

			}

			if(!isIn){
				currentOptions.push([option, parseInt(quantity), parseInt(value)]);
			}

		}

		for(var i=0; i<currentOptions.length; i++){
			if(currentOptions[i][1] > 0){
				currentPrice += (currentOptions[i][1] * 3);
			}

			currentPrice += (currentOptions[i][1] * currentOptions[i][2]);
		}

		this.setState({currentPrice: currentPrice});
	}
})