import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegistroScreen from './RegistroScreen';
import InicioSesionScreen from './InicioSesionScreen';
import CuentaScreen from './CuentaScreen';
import { NavigationContainer } from '@react-navigation/native';
import EditarCuentaScreen from './EditarCuentaScreen';
import HistorialScreen from './HistorialScreen';
import HTMLScreen from './HTMLScreen';

const Stack = createStackNavigator();

class CuentaNavigation extends React.Component {

  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName={"Cuenta"} >
          <Stack.Screen name="Cuenta" component={CuentaScreen} options={{ title: 'Cuenta', gestureEnabled: false, }} />
          <Stack.Screen name="EditarCuenta" component={EditarCuentaScreen} options={{ title: 'Editar Cuenta', gestureEnabled: false, }} />
          <Stack.Screen name="Historial" component={HistorialScreen} options={{ title: 'Historial', gestureEnabled: true, }} />
          <Stack.Screen name="HTML" component={HTMLScreen} options={{ title: 'Ticket', gestureEnabled: true, }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default CuentaNavigation;