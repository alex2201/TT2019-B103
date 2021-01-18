import React, { Component } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Socio from '../../model/Socio';
import AppInternalStorageKey from '../AppInternalStorageKey';
import SecondaryButton from '../SecondaryButton';
import Globals from '../Globals';


class CuentaScreen extends Component<{}, { socio: Socio | null }> {

  state = {
    socio: Globals.socio
  }

  async cerrarSesion() {
    let key = AppInternalStorageKey.cuenta;
    await AsyncStorage.removeItem(key)
    this.setState({socio: null})
    if (Globals.setSocio !== null) {
      Globals.setSocio(null)
    }
  }

  render() {
    return (
      <View
        style={{
          height: "100%",
        }}
      >
        <Text>{"Cuenta"}</Text>
        <SecondaryButton
          style={{
            marginLeft: 40,
            marginRight: 40,
          }}
          text={"Cerrar sesión"}
          onPress={() => { this.cerrarSesion() }}
        />
      </View>
    );
  }
}

export default CuentaScreen;