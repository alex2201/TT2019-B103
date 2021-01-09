import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GlobalStyles from './GlobalStyles';

const SecondaryButton = (props) => {
    return (<TouchableOpacity
        style={[GlobalStyles.secondaryBtnContainer, props.style]}
        onPress={props.onPress}
    >
        <Text
            style={GlobalStyles.secondaryBtnText}
        >
            {props.text}
        </Text>
    </TouchableOpacity>);
};

export default SecondaryButton;