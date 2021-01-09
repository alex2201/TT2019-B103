import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PrimaryButton from '../PrimaryButton';

class InicioSesionScreen extends Component {

    state = {
        correo: "",
        clave: ""
    };

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
                        keyboardType={'default'}
                        placeholder={'Correo'}
                        value={this.state.correo}
                        onChangeText={(text) => {this.setState({correo: text})}}
                    />
                    <TextInput
                        style={styles.textField}
                        keyboardType={'default'}
                        placeholder={'Clave'}
                        value={this.state.clave}
                        onChangeText={(text) => {this.setState({clave: text})}}
                    />
                </View>

                <PrimaryButton
                    style={{
                        marginLeft: 40,
                        marginRight: 40,
                    }}
                    text={"Entrar"}
                    onPress={() => { }}
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