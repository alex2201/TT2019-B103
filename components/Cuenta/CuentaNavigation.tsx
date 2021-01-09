import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CuentaScreen from './CuentaScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InicioSesionScreen from './InicioSesionScreen';
import RegistroScreen from './RegistroScreen';

const Stack = createStackNavigator();

enum AppInternalStorageKey {
  cuenta = '@CarritoInteligente-Cuenta',
}

class CuentaNavigation extends React.Component {

  async obtenerCuentaGuardada() {
    let key = AppInternalStorageKey.cuenta;
    let cuentaString = await AsyncStorage.getItem(key);
    if (cuentaString !== null) {
      let cuenta = JSON.parse(cuentaString);
    }
  }

  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName={'Home'}>
          <Stack.Screen name="Cuenta" component={RegistroScreen} options={{ title: 'Cuenta' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default CuentaNavigation;