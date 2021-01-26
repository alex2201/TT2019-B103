import React, { Component } from 'react';
import { Text, View } from 'react-native';
import BaseUrl from './BaseUrl';
import Globals from './Globals';
import { WebView } from 'react-native-webview';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GlobalStyles from './GlobalStyles';


class TerminosScreen extends Component<any, any> {

    render() {
        return (
            <View
                style={{
                    height: '100%',

                }}
            >
                <WebView
                    source={{ uri: "http://189.149.97.142:8080/api/terminos/terminos.pdf" }}
                >

                </WebView>

                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={GlobalStyles.primaryBtnContainer}
                >
                    <Text
                    style={GlobalStyles.primaryBtnText}
                    >{"Volver"}</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default TerminosScreen;