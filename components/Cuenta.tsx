import React, { Component } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Socio from '../model/Socio';
import AppInternalStorageKey from './AppInternalStorageKey';
import SecondaryButton from './SecondaryButton';


class CuentaScreen extends Component<{}, { socio: Socio | null }> {

  state = {
    socio: null
  }

  componentDidMount() {
    this.obtenerCuentaGuardada()
    this.props.navigation.addListener('willFocus', this.obtenerCuentaGuardada)
  }

  async obtenerCuentaGuardada() {
    let key = AppInternalStorageKey.cuenta;
    let cuentaString = await AsyncStorage.getItem(key);
    if (cuentaString !== null) {
      let socio = JSON.parse(cuentaString) as Socio
      this.setState({ socio: socio })
      console.log("Socio Guardado")
      console.log(socio)
    } else {
      this.props.navigation.navigate("InicioSesion")
    }
  }

  async cerrarSesion() {
    let key = AppInternalStorageKey.cuenta;
    await AsyncStorage.removeItem(key)
    this.setState({socio: null})
    this.props.navigation.navigate("InicioSesion")
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