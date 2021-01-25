import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ToastAndroid } from 'react-native';
import Socio from '../../model/Socio';
import AppInternalStorageKey from '../AppInternalStorageKey';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../BaseUrl';
import Globals from '../Globals';

class InicioSesionScreen extends Component {

    state = {
        correo: "",
        clave: ""
    };

    enviarIniciarSesion() {
        let { correo, clave } = this.state
        this.iniciarSesion(correo, clave)
    }

    async iniciarSesion(correo: string, clave: string) {
        let claveHash = Globals.hashFunc(clave)
        console.log("Loggin in...")
        let request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: correo, passwd: claveHash })
        };
        const rawResponse = await fetch(`${BaseUrl}/login`, request);
        console.log(rawResponse)
        const content = await rawResponse.json();
        console.log(content)
        if (content.ok === true) {
            let socio: Socio = content.socio as Socio
            this.guardarSocio(socio)
            if (Globals.setSocio !== null) {
                Globals.setSocio(socio)
            }
        } else {
            Alert.alert("Aviso", "No se encontró el usuario o la contraseña es incorrecta.")
        }
    }

    async guardarSocio(socio: Socio) {
        let key = AppInternalStorageKey.cuenta;
        await AsyncStorage.setItem(key, JSON.stringify(socio))
    }

    render() {
        return (
            <View
                style={{
                    height: "100%",
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 30,
                        fontWeight: 'bold',
                        margin: 20,
                    }}
                >
                    {"Inicia Sesión"}
                </Text>

                <View
                    style={{
                        marginTop: 20,
                        marginBottom: 20,
                        marginLeft: 40,
                        marginRight: 40,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextInput
                        style={styles.textField}
                        keyboardType={'email-address'}
                        placeholder={'Correo'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        value={this.state.correo}
                        onChangeText={(text) => { this.setState({ correo: text }) }}
                    />
                    <TextInput
                        style={styles.textField}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType={'default'}
                        placeholder={'Clave'}
                        secureTextEntry={true}
                        value={this.state.clave}
                        onChangeText={(text) => { this.setState({ clave: text }) }}
                    />
                </View>

                <PrimaryButton
                    style={{
                        marginLeft: 40,
                        marginRight: 40,
                    }}
                    text={"Entrar"}
                    onPress={() => { this.enviarIniciarSesion() }}
                />

                <SecondaryButton
                    style={{
                        marginLeft: 40,
                        marginRight: 40,
                    }}
                    text={"Registrarse"}
                    onPress={() => { this.props.navigation.navigate("Registro") }}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    textField: {
        borderRadius: 9,
        borderColor: 'black',
        borderWidth: 1,
        width: '100%',
        height: 40,
        fontSize: 17,
        padding: 10,
        margin: 5,
    }
});

export default InicioSesionScreen;