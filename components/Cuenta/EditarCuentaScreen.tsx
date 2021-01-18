import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import PrimaryButton from '../PrimaryButton';
import { Picker } from '@react-native-picker/picker';
import SecondaryButton from '../SecondaryButton';
import DatePicker from 'react-native-datepicker'
import Socio from '../../model/Socio';
import DateDiff from '../Utils';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppInternalStorageKey from '../AppInternalStorageKey';
import BaseUrl from '../BaseUrl';
import Globals from '../Globals';

class EditarCuentaScreen extends Component<any, {
    nombre: string,
    apPaterno: string,
    apMaterno: string,
}> {

    constructor(props: any) {
        super(props)
        let socio = Globals.socio!
        this.state = {
            nombre: socio.nombre,
            apPaterno: socio.apPaterno,
            apMaterno: socio.apMaterno,
        }
    }

    enviarRegistro() {
        var socio = {
            apPaterno: this.state.apPaterno,
            apMaterno: this.state.apMaterno,
            nombre: this.state.nombre,
        }
        this.actualizarInformacion(socio)
    }

    async actualizarInformacion(socio: any) {
        const rawResponse = await fetch(`${BaseUrl}/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(socio)
        });
        const content = await rawResponse.json();
        if (content.success === true) {
            let socio: Socio = content.socio.socio as Socio
            this.guardarSocio(socio)
            if (Globals.setSocio !== null) {
                Globals.setSocio(socio)
            }
        } else {
            let mensaje =
                content.email_used
                    ? "Ya existe una cuenta asociada al correo que usaste."
                    : "Ocurrió un error al registrarte."
            Alert.alert("Aviso", mensaje)
        }
    }

    async guardarSocio(socio: Socio) {
        let key = AppInternalStorageKey.cuenta;
        await AsyncStorage.setItem(key, JSON.stringify(socio))
    }

    render() {

        console.log(this.state)
        return (
            <View
                style={{
                    height: "100%",
                }}
            >
                <View>

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
                            keyboardType={'default'}
                            placeholder={'Nombre'}
                            value={this.state.nombre}
                            onChangeText={(text) => { this.setState({ nombre: text }) }}
                        />
                        <TextInput
                            style={styles.textField}
                            keyboardType={'default'}
                            placeholder={'Apellido Paterno'}
                            value={this.state.apPaterno}
                            onChangeText={(text) => { this.setState({ apPaterno: text }) }}
                        />
                        <TextInput
                            style={styles.textField}
                            keyboardType={'default'}
                            placeholder={'Apellido Materno'}
                            value={this.state.apMaterno}
                            onChangeText={(text) => { this.setState({ apMaterno: text }) }}
                        />

                    </View>
                </View>

                <View
                    style={{
                        flexGrow: 2,
                        justifyContent: 'flex-end',
                        marginBottom: 40,
                        marginRight: 20,
                        marginLeft: 20,
                    }}
                >
                    <PrimaryButton
                        style={{
                            marginLeft: 40,
                            marginRight: 40,
                        }}
                        text={"Actualizar datos"}
                        onPress={() => { this.enviarRegistro() }}
                    />
                    <SecondaryButton
                        style={{
                            marginLeft: 40,
                            marginRight: 40,
                        }}
                        text={"Cancelar"}
                        onPress={() => { this.props.navigation.goBack() }}
                    />
                </View>
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
    },
    label: {
        width: '100%',
        height: 40,
        fontSize: 17,
        paddingTop: 10,
        paddingBottom: 10,
    }
});

export default EditarCuentaScreen;