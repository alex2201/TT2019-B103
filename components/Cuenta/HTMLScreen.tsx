import React, { Component } from 'react';
import { View } from 'react-native';
import BaseUrl from '../BaseUrl';
import Globals from '../Globals';
import Compra from './Model/Compra';
import { WebView } from 'react-native-webview';


class HTMLScreen extends Component<any, {
    ticketurl: string,
    compra: Compra
}> {

    constructor(props: any) {
        super(props)
        let compra = props.route.params.compra as Compra
        this.state = {
            compra: compra,
            ticketurl: ""
        }
    }

    componentDidMount() {
        this.obtenerHtml()
    }

    async obtenerHtml() {
        let idSocio = Globals.socio!.idSocio
        console.log("Obteniendo PDF", idSocio, this.state.compra)
        let request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idSocio: idSocio, fecha_hora: this.state.compra.fecha, idProducto: '' })
        };
        const rawResponse = await fetch(`${BaseUrl}/api/v1/receipt2/`, request);
        let content = await rawResponse.json()
        this.setState({ticketurl: content.Ticket})
        console.log('PDF obtenido con éxito...', content)
    }

    render() {
        let html = this.state.ticketurl
        return (
            <View
            style={{
                height: '100%',

            }}
            >
                    <WebView
                    source={{uri: this.state.ticketurl}}
                    >

                    </WebView>

            </View>
        );
    }
}

export default HTMLScreen;