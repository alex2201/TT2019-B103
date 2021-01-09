import * as React from 'react';
import { Alert, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

class BarCodeScanner extends React.Component {

    state = {
        debeMostrarCamara: true
    }

    handleCodigoEncontrado(codigo: string) {
        this.setState({
            debeMostrarCamara: false
        })
        Alert.alert("Código encontrado", codigo);
    }

    render() {
        return (
            <View
                style={{
                    height: "100%",
                }}
            >
                {
                    this.state.debeMostrarCamara
                    &&
                    <RNCamera
                        onBarCodeRead={(e) => { this.handleCodigoEncontrado(e.data); }}
                        captureAudio={false}
                        autoFocus={'on'}
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                    >

                    </RNCamera>
                }

            </View>
        );
    }
}

export default BarCodeScanner;