import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BarCodeScannerApp from "./barcodescanner.js";
import ScannedBarcodes from "./scannedbarcodes.js";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Scan Barcodes"
        onPress={() => navigation.navigate('Scan Barcodes')}
      />
    </View>
  );
}

function ScanBarcodeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <BarCodeScannerApp />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scan Barcodes" component={ScanBarcodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
