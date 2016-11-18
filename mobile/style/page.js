import React from 'react';
import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
	page: {
		flex:1,
		padding: 10,
		backgroundColor: '#ffffff'
	},
	section: {
		marginTop:10,
		marginBottom:10
	},
	title: {
		fontSize: 18,
		marginBottom:5,
		fontWeight:'bold'
	},
	sectionHor: {
		flex: 1,
		flexDirection: 'row'
	},
	sectionVer: {
		flex: 1,
		paddingLeft:5,
		paddingRight:5
	},
	border: {
		borderColor:'#dedede',
		borderWidth:1,
		paddingTop:5,
		paddingBottom:5
	},
	ticket: {
		flex: 1,
		borderColor:'#dedede',
		borderWidth:1,
		justifyContent: 'center',
		alignItems: 'center',
		margin:5,
		width:150
	},
	ticketImage: {
		width:150,
		height:100
	},
	borderBtn: {
		flex:1,
		backgroundColor:'#00BA06',
		padding:10,
		position:'absolute',
		left:0,
		right:0
	},
	borderBtnText: {
		textAlign: 'center',
		color: '#ffffff'
	},
	settingsSection: {
		padding:10,
		paddingTop:20,
		paddingBottom:20
	},
	settingsOption: {
		fontSize: 18
	},
	modalContainer: {
		flex: 1,
		marginTop: (Platform.OS === 'ios') ? 20 : 0,
		backgroundColor:'rgba(0,0,0, 0.5)'
	},
	modal: {
		position: 'absolute',
		left:10,
		right:10,
		top:20,
		backgroundColor: '#ffffff',
		borderColor: '#cccccc',
		borderWidth: 1,
		padding: 10
	},
	poolBtn: {
		backgroundColor:'#00BA06',
		padding:5,
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	greenBtn: {
		flex:1,
		backgroundColor:'#00BA06',
		padding:10
	},
	greenBtn0: {
		backgroundColor:'#00BA06',
		padding:10
	},
	textInput: {
		flex: 1,
		height:35,
		padding:5,
		backgroundColor:'#eeeeee'
	},
	label: {
		fontSize:18,
		marginBottom:5
	},
	errorMessage: {
		color: 'red',
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 5
	}
})