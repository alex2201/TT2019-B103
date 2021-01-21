import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BaseUrl from '../BaseUrl';
import Globals from '../Globals';
import Compra from './Model/Compra';

class HistorialScreen extends Component<any, {
    compras: Compra[]
}> {

    constructor(props: any) {
        super(props)
        this.state = {
            compras: [new Compra('12341234', 103.56), new Compra('12341224', 103.56)]//new Array<Compra>()
        }
    }

    componentDidMount() {
        this.obtenerTickets()
    }

    async obtenerTickets() {
        let idSocio = Globals.socio!.idSocio
        console.log("Obteniendo tickets", idSocio)
        let request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idSocio: idSocio })
        };
        const rawResponse = await fetch(`${BaseUrl}/api/v1/receipts/`, request);
        const content = await rawResponse.json();
        let compras = content.Tickets.map((val: any) => new Compra(val[0], val[1]))
        this.setState({ compras: compras })
        console.log('Tickets obtenidos con éxito...')
    }

    renderItem(compra: Compra) {
        return (
            <View
                style={{
                    height: 80,
                    width: '100%',
                }}
            >

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('HTML', {compra: compra})}
                >
                    <View
                        style={{
                            height: '100%',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                margin: 8,
                            }}
                        >
                            {`Fecha: ${compra.fecha}`}
                        </Text>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                margin: 8
                            }}
                        >
                            {`Monto: $${compra.monto.toFixed(2)} MXN`}
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }

    ItemSeparator = () => {
        return (<View style={{
            height: 2,
            backgroundColor: "rgba(0,0,0,0.5)",
            marginTop: 5,
            marginBottom: 5,
        }}
        />);
    }

    render() {
        return (
            <View
                style={{
                    height: '100%',
                    width: '100%',
                }}
            >

                <FlatList
                    style={{
                        width: '100%'
                    }}
                    data={this.state.compras}
                    renderItem={item => this.renderItem(item.item)}
                    keyExtractor={item => item.fecha}
                    ItemSeparatorComponent={this.ItemSeparator}
                />

            </View>
        );
    }
}

export default HistorialScreen;