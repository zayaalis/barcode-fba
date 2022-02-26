import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Clipboard, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ScannedBarcodesApp() {
	
	const route = useRoute();
	const navigation = useNavigation(); 
	
	
	// Get params
	const { scannedBarcodes } = route.params;
	const displayScanned = scannedBarcodes.join('\r\n');
	console.log('Barcodes - ' + displayScanned)
		
	const copyToClipboard = () => {
		Clipboard.setString(scannedBarcodes.join('\r\n'));
		Alert.alert('Barcodes Copied','Happy days!');
	}
	
	const clearBarcodes = () => {
		Clipboard.setString('');
		navigation.setParams({scannedBarcodes: ''})
		console.log("Clipboard cleared")
	}
	
	const DisplayifExists = () => {
		if (typeof(displayScanned) !== 'undefined' && displayScanned != null) {
				 console.log('Not Undefined and Not Null')
				 
				 return (
					 <Text>{displayScanned}</Text>
				 )
		  } else {
				 console.log('Undefined or Null')
				 
				  return (
					  <Text>Nothing</Text>
				  )
		}
	}
	
	// Clear Clipboard
	const ClearClipboardConfirmation = () =>
	Alert.alert(
	  "Are you sure?",
	  "All data will dissappear if you proceed?",
	  [
		{
			text: "Cancel",
		    onPress: () => console.log("Cancel Pressed"),
		    style: "cancel"
		},
		{ 	text: "Clear Clipboard", 
			onPress: () => clearBarcodes()
		}
	  ]
	);

  // Return the View
  return (
	<View style={styles.container}>
	  <Text style={styles.maintext}>Scanned Barcodes will be here</Text>
	  <DisplayifExists />
	  <TouchableOpacity >
		<Button title={'Copy to Clipboard'} onPress={() => copyToClipboard()}/>
	  </TouchableOpacity>
	  
	  <Button title={'Clear Scanned Barcodes'} color='red' onPress={ClearClipboardConfirmation}/>
	</View>
  );
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	justifyContent: 'center',
  },
  maintext: {
	fontSize: 16,
	margin: 20,
  },
  barcodebox: {
	alignItems: 'center',
	justifyContent: 'center',
	height: 300,
	width: 300,
	overflow: 'hidden',
	borderRadius: 30,
	backgroundColor: 'tomato'
  },  
  copiedText: {
	  marginTop: 10,
	  color: 'red'
  }
});
