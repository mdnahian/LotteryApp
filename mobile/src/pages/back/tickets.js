import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	Modal,
	TouchableHighlight
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from '../../../style/page';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DropDown, {
  Select,
  Option,
  OptionList,
} from 'react-native-selectme';

var radio_props = [
  {label: 'Single Play', value: 0 },
  {label: 'Double Play', value: 1 }
];

var firebase = require("firebase");

module.exports = React.createClass({
	componentWillMount: function () {
		var user = firebase.auth().currentUser;

		if (user) {
			
			firebase.database().ref('tickets/').on('child_added', (snapshot) => {
				var ticketlist = this.state.ticketlist.concat(snapshot.val());
				this.setState({
					ticketlist: ticketlist,
					isLoadingVisible: false
				});
			});

		} else {
		  	this.props.navigator.resetTo({name: 'login'});
		}
	},
	getInitialState: function () {
		return {
			isLoadingVisible: true,
			ticketlist: [],
			tickets: <View></View>,
			modalVisible: false,
			currentModal: <View></View>,
			currentPrice: 0,
			single_double: 1
		}
	},
	render: function () {
		return <ScrollView style={styles.page}>

			<Modal
	          animationType={"none"}
	          transparent={true}
	          visible={this.state.modalVisible}
	          onRequestClose={() => {
	          	user = {};
	          }}>
		         {this.state.currentModal}
	        </Modal>


			<View style={[styles.section, {marginBottom:35}]}>
				<Text style={styles.title}>Tickets</Text>
				<View style={styles.sectionHor}>
					{this.buildTickets()}
				</View>
			</View>

			<View style={styles.section}>
				<Text style={styles.title}>My Pools</Text>
				<View style={styles.sectionVer}>
					<Text>You are not in any pools.</Text>
				</View>
			</View>

			<View style={styles.section}>
				<Text style={styles.title}>My Account</Text>
				<View style={[styles.sectionHor, styles.border]}>
					<View style={styles.sectionVer}>
						<Text style={{fontSize:18}}>Winnings</Text>
					</View>
					<View style={styles.sectionVer}>
						<Text style={{fontSize:18, textAlign:'right'}}>$0.00</Text>
					</View>
				</View>
				<View style={[styles.sectionHor, styles.border]}>
					<View style={styles.sectionVer}>
						<Text style={{fontSize:18}}>Balance</Text>
					</View>
					<View style={styles.sectionVer}>
						<Text style={{fontSize:18, textAlign:'right'}}>$10.00</Text>
					</View>
				</View>
				<View style={styles.borderBtn}>
					<Text style={styles.borderBtnText}>Add Credits</Text>
				</View>
			</View>

			<Spinner visible={this.state.isLoadingVisible}/>
		</ScrollView>
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
	buildTickets: function () {
		return this.state.ticketlist.map((ticket, id) => {
			return <View key={id} style={styles.ticket}>
				<Image style={styles.ticketImage} resizeMode='cover' source={{uri: ticket.image}} />
				<TouchableHighlight underlayColor={'#007804'} onPress={() => this.buyBtnPressed(ticket)} style={styles.borderBtn}>
					<Text style={styles.borderBtnText}>Buy {ticket.name}</Text>
				</TouchableHighlight>
			</View>
		});
	},
	buyBtnPressed: function (ticket) {

		var buildPools = ticket.pools.map((pool, id) => {
			return <View key={id} style={[styles.sectionHor, styles.border, {marginBottom:5, paddingTop:0, paddingBottom:0}]}>
				<View style={[styles.sectionVer, {flex:2, padding:10, justifyContent:'center'}]}>
					<Text style={{fontSize:18}}>Pool{id}</Text>
					<Text style={{fontSize:15}}>{pool.people} people</Text>
				</View>
				<View style={styles.sectionHor}>
					<TouchableHighlight underlayColor={'#007804'} style={styles.poolBtn}>
						<Text style={[styles.borderBtnText, {fontSize:18}]}>${pool.price}.00</Text>
					</TouchableHighlight>
				</View>
			</View>
		});

		var buildModal = <ScrollView style={styles.modalContainer}>
			<View style={styles.modal}>
				<View style={{alignItems:'center'}}>
					<Image style={styles.ticketImage} resizeMode='cover' source={{uri: ticket.image}} />
				</View>
				<View style={[styles.section]}>
					{buildPools}
				</View>
				<View style={[styles.sectionHor, {marginTop:10}]}>
					<Text style={{flex:1, fontWeight:'bold', fontSize:18}}>Total:</Text>
					<Text style={{flex:1, fontSize:18, textAlign:'right'}}>${this.state.currentPrice}.00</Text>
				</View>
				<View style={styles.section}>
					<TouchableHighlight style={[styles.greenBtn, {marginTop:10}]}>
						<Text style={styles.borderBtnText}>Buy {ticket.name}</Text>
					</TouchableHighlight>
				</View>
				<TouchableHighlight underlayColor={'#ffffff'} onPress={() => this.setState({modalVisible:false, currentModal:<View></View>})} style={{position:'absolute', right:20, top:20}}>
					<Image source={require('../../../img/close.png')} style={{height:18, width:18}}/>
				</TouchableHighlight>
			</View>
		</ScrollView>

		this.setState({
			currentModal: buildModal,
			modalVisible: true
		});

	}
})