import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Vibration } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';


export default function BarCodeScannerApp() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');
  const [scannedBarcodes, setScannedBarcodes] = useState([]);
  const navigation = useNavigation(); 

  const askForCameraPermission = () => {
	(async () => {
	  const { status } = await BarCodeScanner.requestPermissionsAsync();
	  setHasPermission(status === 'granted');
	})()
  }

  // Request Camera Permission
  useEffect(() => {
	askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
	setScanned(true);
	setText(data);
	setScannedBarcodes(scannedBarcodes => scannedBarcodes.concat(data));
	Vibration.vibrate();
	console.log('Type: ' + type + '\nData: ' + data);
	console.log(scannedBarcodes);
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
	return (
	  <View style={styles.container}>
		<Text>Requesting for camera permission</Text>
	  </View>)
  }
  if (hasPermission === false) {
	return (
	  <View style={styles.container}>
		<Text style={{ margin: 10 }}>No access to camera</Text>
		<Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
	  </View>)
  }

  // Return the View
  return (
	<View style={styles.container}>
	  <View style={styles.barcodebox}>
		<BarCodeScanner
		  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
		  style={{ height: 400, width: 400 }} />
	  </View>
	  <Text style={styles.maintext}>{text}</Text>

  		{scanned && <Button title={'Scan more?'} onPress={() => setScanned(false)} color='orange' />}
		{scanned && <Button title={'View Scanned Barcodes'} onPress={() => navigation.navigate('Scanned Barcodes',{
				scannedBarcodes: scannedBarcodes
			  })} color='green' />}
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
  }
});
