import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CarritoScreen from './CarritoScreen';
import BarCodeScanner from './BarCodeScanner';

const Stack = createStackNavigator();

function CarritoNavigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={CarritoScreen} options={{ title: 'Carrito' }} />
        <Stack.Screen name="BarCodeScanner" component={BarCodeScanner} options={{ title: 'Escaner' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default CarritoNavigation;