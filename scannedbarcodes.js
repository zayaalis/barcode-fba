import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Clipboard, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function ScannedBarcodesApp() {
	
	const route = useRoute();
	
	// Get params
	const { scannedBarcodes } = route.params;
		
	const copyToClipboard = () => {
		Clipboard.setString(scannedBarcodes.join('\r\n'));
		Alert.alert('Barcodes Copied','Happy days!');
	}

  // Return the View
  return (
	<View style={styles.container}>
	  <Text style={styles.maintext}>Scanned Barcodes will be here</Text>
	  <Text>{scannedBarcodes.join('\r\n')}</Text>
	  <TouchableOpacity onPress={() => copyToClipboard()}>
		<Text>Click here to copy to Clipboard</Text>
	  </TouchableOpacity>
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
