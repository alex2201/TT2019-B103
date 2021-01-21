import * as React from 'react';
import { Alert, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BaseUrl from '../BaseUrl';
import Globals from '../Globals';
import Producto from './Model/Producto';

class BarCodeScanner extends React.Component<any, { debeMostrarCamara: boolean }> {

    state = {
        debeMostrarCamara: true
    }

    handleCodigoEncontrado(codigo: string) {
        this.setState({
            debeMostrarCamara: false
        })
        Alert.alert(
            "Código encontrado",
            codigo,
            [
                {
                    text: 'Volver a escanear',
                    onPress: () => {
                        this.setState({ debeMostrarCamara: true })
                    }
                },
                {
                    text: 'Continuar',
                    onPress: () => {
                        this.obtenerInformacionProducto(codigo)
                    },
                    style: 'cancel'
                },
            ]
        );
    }

    async obtenerInformacionProducto(codigo: string) {
        console.log("Obteniendo información del producto...", codigo)
        let request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idProducto: codigo, idSocio: Globals.socio!.idSocio })
        };
        const rawResponse = await fetch(`${BaseUrl}/get_product_info`, request);
        const content = await rawResponse.json();
        if (content.ok === true) {
            let item = content as Producto
            console.log(item)
            if (Globals.actualizarCarrito !== null) {
                Globals.actualizarCarrito(item)
                this.props.navigation.goBack()
            }
        } else {
            Alert.alert("Aviso", "No se encontró el código de producto. Intente de nuevo o pida asistencia a un empleado.")
            this.setState({ debeMostrarCamara: true })
        }
    }

    render() {
        return (
            <View
                style={{
                    height: "100%",
                    width: '100%',
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: 10,
                    }}
                >
                    {"Intrucciones"}
                </Text>
                <Text
                    style={{
                        fontSize: 15,
                        marginLeft: 10,
                        marginRight: 10,
                        marginBottom: 10,
                    }}
                >
                    {"Para escanear tu producto coloca el código de barras dentro del cuadro.\n\nNo es necesario que escanees más de una vez el mismo producto, desde el carrito puedes ajustar la cantidad."}
                </Text>

                {
                    this.state.debeMostrarCamara
                    &&
                    <RNCamera
                        onBarCodeRead={(e) => { this.handleCodigoEncontrado(e.data); }}
                        captureAudio={false}
                        autoFocus={'on'}
                        style={{
                            height: '50%',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20
                        }}
                    >
                        <View
                            style={{
                                width: 300,
                                height: 200,
                                borderWidth: 10,
                                borderColor: 'rgba(255, 255, 255, 0.6)',
                            }}
                        >

                        </View>
                    </RNCamera>
                }

            </View>
        );
    }
}

export default BarCodeScanner;