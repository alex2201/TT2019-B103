/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import {
  StatusBar
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppInternalStorageKey from './components/AppInternalStorageKey';
import CuentaNavigation from './components/Cuenta/CuentaNavigation';
import Globals from './components/Globals';
import TabBarPrincipal from './components/TabBarController/TabBarPrincipal';
import Socio from './model/Socio';

class App extends Component<any, { socio: Socio | null }> {

  state = {
    socio: null
  }

  componentDidMount() {
    Globals.setSocio = (socio) => { this.setSocioGlobal(socio) };
    this.obtenerCuentaGuardada()
  }

  async obtenerCuentaGuardada() {
    console.log("Cargando Socio Guardado...")
    let key = AppInternalStorageKey.cuenta;
    let cuentaString = await AsyncStorage.getItem(key);
    if (cuentaString !== null) {
      let socio = JSON.parse(cuentaString) as Socio
      Globals.socio = socio
      this.setState({ socio: socio })
      console.log("Socio guardado.", socio)
    } else {
      console.log("No hay socio guardado.")
    }
  }

  setSocioGlobal(socio: Socio | null) {
    console.log("Configurando nuevo socio...")
    Globals.socio = socio
    console.log(socio)
    this.setState({ socio: socio })
  }

  render() {
    let haySocio = this.state.socio !== null;

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          {
            haySocio
            &&
            <TabBarPrincipal />
          }
          {
            !haySocio
            &&
            <CuentaNavigation />
          }
        </SafeAreaView>
      </>
    );
  }
};

export default App;
