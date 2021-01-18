import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegistroScreen from './RegistroScreen';
import InicioSesionScreen from './InicioSesionScreen';
import CuentaScreen from './CuentaScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

class InicioSesionNavigation extends React.Component {

  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName={"InicioSesion"} headerMode={"none"}>
          <Stack.Screen name="InicioSesion" component={InicioSesionScreen} options={{ title: 'InicioSesion', gestureEnabled: false, }} />
          <Stack.Screen name="Registro" component={RegistroScreen} options={{ title: 'Registro', gestureEnabled: false, }} />
          <Stack.Screen name="Cuenta" component={CuentaScreen} options={{ title: 'Cuenta', gestureEnabled: false, }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default InicioSesionNavigation;