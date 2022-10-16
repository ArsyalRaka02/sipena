import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import HeaderBackTablet from '../components/HeaderBackTablet';
import { fonts } from '../utils/fonts';
import color from '../utils/color';
import { useDispatch } from 'react-redux';

const SCREEN_HEIGHT = Dimensions.get("window").height;

const comboStyle = {
    boxStyle: {
        backgroundColor: color.white,
        borderColor: color.gray,
    },
    leftIconStyle: {
        color: color.Neutral10,
        // marginRight: 14
    },
    rightIconStyle: {
        color: color.Neutral10,
    },
    textContentStyle: {
        fontSize: 12,
        fontFamily: fonts.montserratReguler,
        color: color.black,
    },
};

export default function UpdateHarga(props) {
    const { id } = props.route.params;

    return (
        <>
            <HeaderBackTablet
                textHeader={'Update Harga'}
                textProfile={"Admin"}
                iconLeft={() => props.navigation.goBack()}
            />
            <Text>Ini halaman update, mengirimkan id : {id}</Text>
        </>
    );
}

const styles = {
    container: {
        backgroundColor: color.white,
        padding: 20,
        flex: 1,
    },
}