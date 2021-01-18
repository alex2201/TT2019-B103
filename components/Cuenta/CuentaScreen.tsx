import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Socio from '../../model/Socio';
import AppInternalStorageKey from '../AppInternalStorageKey';
import SecondaryButton from '../SecondaryButton';
import Globals from '../Globals';
import Icon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from '../PrimaryButton';


class CuentaScreen extends Component<any, { socio: Socio | null }> {

  componentDidMount(){
    this.props.navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => { this.props.navigation.navigate('BarCodeScanner', {}) }} title="Historial" />
      ),
      headerRight: () => (
        <Button onPress={() => { this.props.navigation.navigate('EditarCuenta', {}) }} title="Editar" />
      ),
    });
  }

  state = {
    socio: Globals.socio
  }

  async cerrarSesion() {
    let key = AppInternalStorageKey.cuenta;
    await AsyncStorage.removeItem(key)
    this.setState({ socio: null })
    if (Globals.setSocio !== null) {
      Globals.setSocio(null)
    }
  }

  render() {
    let socio = this.state.socio!
    return (
      <View
        style={{
          height: "100%",
        }}
      >

        <View
          style={{
            margin: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

          <Icon
            name="person-circle-outline"
            size={100}
            color={'black'}
          />

          <Text
            style={styles.label}
          >
            {socio.nombre}
          </Text>
          <Text
            style={styles.label}
          >
            {socio.apPaterno}
          </Text>
          <Text
            style={styles.label}
          >
            {socio.apPaterno}
          </Text>
          <Text
            style={styles.label}
          >
            {socio.email}
          </Text>

          <PrimaryButton
            text={"Cerrar sesión"}
            style={{
              marginTop: 16
            }}
            onPress={() => this.cerrarSesion()}
          />

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    margin: 4
  }
})

export default CuentaScreen;