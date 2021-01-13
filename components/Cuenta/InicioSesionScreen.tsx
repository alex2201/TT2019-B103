import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Socio from '../../model/Socio';
import AppInternalStorageKey from '../AppInternalStorageKey';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseUrl from '../BaseUrl';

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
        const rawResponse = await fetch(`${BaseUrl}:4356/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: correo, passwd: clave })
        });
        const content = await rawResponse.json();
        console.log(content)
        if (content.ok === true) {
            let socio: Socio = content.socio as Socio
            this.guardarSocio(socio)
            this.props.navigation.navigate('Cuenta', {}) 
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