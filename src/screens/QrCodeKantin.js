import React, { Component, useCallback, useState, useEffect, useRef } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import Toast from '../components/Toast';

export default function QrCodeKantin(props) {
    const navigation = useNavigation()

    const onSuccess = useCallback((e) => {
        if (e.type == "QR_CODE") {
            pindahPage(e.data)
        } else {
            Toast.showError("Maaf ini bukan qrcode")
        }
    }, [])

    const pindahPage = useCallback((value) => {
        navigation.navigate("DetailKantin", { params: value })
    }, [])

    return (
        <QRCodeScanner
            reactivate={true}
            showMarker={true}
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.torch}
            topContent={
                <Text style={styles.centerText}>
                    <Text style={styles.textBold}>Silahkan Scan barcode kantin</Text>
                </Text>
            }
        // bottomContent={
        //     <TouchableOpacity style={styles.buttonTouchable}>
        //         <Text style={styles.buttonText}>OK. Got it!</Text>
        //     </TouchableOpacity>
        // }
        />
    );
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});