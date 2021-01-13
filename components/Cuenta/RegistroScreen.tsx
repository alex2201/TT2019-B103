import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GlobalStyles from '../GlobalStyles';
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

class RegistroScreen extends Component {

    state = {
        correo: "",
        correoConfirmacion: "",
        clave: "",
        sexo: "M",
        fecha: "22-01-1996",
        nombre: '',
        apPaterno: '',
        apMaterno: '',
    };

    enviarRegistro() {
        let fechaActual = new Date()
        let fechaNacimiento = moment(this.state.fecha, "DD-MM-YYYY").toDate()
        let edad = DateDiff.inYears(fechaNacimiento, fechaActual)
        var socio = new Socio(
            this.state.apPaterno,
            this.state.apMaterno,
            this.state.nombre,
            edad,
            this.state.sexo,
            this.state.correo,
            this.state.clave
        );
        this.registrar(socio)
    }

    async registrar(socio: Socio) {
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
            this.props.navigation.navigate('Cuenta', {}) 
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
        return (
            <View
                style={{
                    height: "100%",
                }}
            >
                <View>
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 30,
                            fontWeight: 'bold',
                            margin: 20,
                        }}
                    >
                        {"Regístrate"}
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
                            keyboardType={'email-address'}
                            placeholder={'Confirma Correo'}
                            value={this.state.correoConfirmacion}
                            onChangeText={(text) => { this.setState({ correoConfirmacion: text }) }}
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

                        <Text
                            style={styles.label}
                        >
                            {"Sexo:"}
                        </Text>
                        <Picker
                            selectedValue={this.state.sexo}
                            style={{
                                height: 130,
                                width: 200,
                                justifyContent: 'center'
                            }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ sexo: itemValue })
                            }
                        >
                            <Picker.Item label="Hombre" value="M" />
                            <Picker.Item label="Mujer" value="F" />
                        </Picker>

                        <DatePicker
                            style={{ width: "100%" }}
                            date={this.state.fecha}
                            mode="date"
                            placeholder="Fecha de nacimiento"
                            format="DD-MM-YYYY"
                            minDate="01-01-1950 "
                            maxDate="30-12-2020"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(fecha) => { this.setState({ fecha: fecha }) }}
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
                        text={"Registrarme"}
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

export default RegistroScreen;