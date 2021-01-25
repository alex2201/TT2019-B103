import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GlobalStyles from './GlobalStyles';

const PrimaryButton = (props: any) => {
    return (<TouchableOpacity
        style={[GlobalStyles.primaryBtnContainer, props.style]}
        onPress={props.onPress}
    >
        <Text
            style={GlobalStyles.primaryBtnText}
        >
            {props.text}
        </Text>
    </TouchableOpacity>);
};

export default PrimaryButton;