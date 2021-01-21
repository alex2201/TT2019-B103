import React, { Component } from 'react';
import { View } from 'react-native';
import BaseUrl from '../BaseUrl';
import Globals from '../Globals';
import Compra from './Model/Compra';
import { WebView } from 'react-native-webview';

class HTMLScreen extends Component<any, {
    html: string,
    compra: Compra
}> {

    constructor(props: any) {
        super(props)
        let compra = props.route.params.compra as Compra
        this.state = {
            compra: compra,
            html: ""
        }
    }

    componentDidMount() {
        this.obtenerHtml()
    }

    async obtenerHtml() {
        let idSocio = Globals.socio!.idSocio
        console.log("Obteniendo html", idSocio)
        let request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idSocio: idSocio, fecha_hora: this.state.compra.fecha, idProducto: '' })
        };
        const rawResponse = await fetch(`${BaseUrl}/api/v1/receipt/`, request);
        let html = await rawResponse.text()
        this.setState({html: html})
        console.log('Html obtenido con éxito...')
    }

    render() {
        let html = this.state.html
        return (
            <View
            style={{
                height: '100%',
                
            }}
            >
                    <WebView
                    source={{html: html}}
                    >

                    </WebView>

            </View>
        );
    }
}

export default HTMLScreen;