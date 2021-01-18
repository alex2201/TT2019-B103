import * as React from 'react';
import { Alert, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BaseUrl from '../BaseUrl';

class BarCodeScanner extends React.Component<any, {debeMostrarCamara: boolean}> {

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
                      this.setState({debeMostrarCamara: true})
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
        let request = {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idProducto: codigo })
          };
          const rawResponse = await fetch(`${BaseUrl}/get_product_info`, request);
          console.log(rawResponse)
          const content = await rawResponse.json();
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