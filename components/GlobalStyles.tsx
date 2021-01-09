import { StyleSheet } from "react-native";

let GlobalStyles = StyleSheet.create({
    primaryBtnContainer: {
        borderRadius: 5,
        backgroundColor: 'black',
        padding: 10,
    },
    primaryBtnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    secondaryBtnContainer: {
        borderRadius: 5,
        padding: 10,
    },
    secondaryBtnText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default GlobalStyles;