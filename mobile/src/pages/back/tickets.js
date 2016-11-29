import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableHighlight
} from 'react-native';
import styles from '../../../style/page';

var firebase = require("firebase");

module.exports = React.createClass({
	componentWillMount: function () {
		// var user = firebase.auth().currentUser;

		// if (user) {

		// 	this.props.parent_state.setState({
		// 		isLoggedIn: true
		// 	});
			
			firebase.database().ref('tickets/').on('child_added', (snapshot) => {
				var ticketlist = this.state.ticketlist.concat(snapshot.val());
				this.setState({
					ticketlist: ticketlist
				});
				this.props.parent_state.setState({isLoadingVisible: false});
			});

		// } else {
		//   	this.props.navigator.resetTo({name: 'login'});
		// }
	},
	getInitialState: function () {
		return {
			ticketlist: [],
			tickets: <View></View>
		}
	},
	render: function () {
		return <ScrollView style={styles.page}>

			<View style={[styles.section, {marginBottom:45}]}>
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
						<Text style={{fontSize:18, textAlign:'right'}}>$0.00</Text>
					</View>
				</View>
				<View style={styles.borderBtn}>
					<Text style={styles.borderBtnText}>Add Credits</Text>
				</View>
			</View>
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
	onTicketSelected: function (ticket) {
		this.props.parent_state.setState({
			ticket: ticket
		});

		this.props.navigator.push({ name: "pool" });
	},
	buildTickets: function () {
		return this.state.ticketlist.map((ticket, id) => {
			return <View key={id} style={styles.ticket}>
				<Image style={styles.ticketImage} resizeMode='cover' source={{uri: ticket.image}} />
				<TouchableHighlight underlayColor={'#007804'} onPress={() => this.onTicketSelected(ticket)} style={styles.borderBtn}>
					<Text style={styles.borderBtnText}>Buy {ticket.name}</Text>
				</TouchableHighlight>
			</View>
		});
	}
})