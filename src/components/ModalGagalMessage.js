import React, { useCallback, useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native';
import SimpleModal from './SimpleModal';
import Button from './Button';
import color from '../utils/color';
import { fonts } from '../utils/fonts';

export default function ModalGagalMessage(props) {
    let isShowModal = props.isShowModal ?? false
    let isLoading = props.isLoading ?? false
    let message = props.message ?? "Pesan Gagal"

    return (
        <SimpleModal
            visible={isShowModal}
            onRequestClose={() => {
                props.reqClose()
            }}
            modal={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            contentStyle={{ borderRadius: 18, paddingHorizontal: 20 }}
        >
            <View style={styles.cardModalContainer}>
                <View style={{ width: 80, height: 80, marginVertical: 8, borderRadius: 50, borderWidth: 5, borderColor: color.danger, overflow: 'hidden', padding: 20 }}>
                    <Image source={require("../assets/forModal/deleteFrame.png")} style={[styles.img, { tintColor: color.danger }]} />
                </View>
                <View style={styles.cardChildModal}>
                    <Text style={[styles.textBoldFont, { fontSize: 20, color: color.black, textAlign: 'center', marginVertical: 8 }]}>Informasi</Text>
                    <Text style={[styles.textFont, { fontSize: 12, textAlign: 'center', marginBottom: 12 }]}>{message}</Text>
                </View>
            </View>
            <Button
                loading={isLoading}
                onPress={() => {
                    props.onPress()
                }}
            >
                Oke
            </Button>
        </SimpleModal>
    )
}


const styles = {
    container: {
        width: '100%',
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    logo: {
        width: 400,
        height: 200,
    },

    textMediumFont: {
        fontFamily: fonts.poppinsMedium
    },
    textSemiMediumFont: {
        fontFamily: fonts.poppinsSemiBold
    },
    textFont: {
        fontFamily: fonts.poppinsReguler
    },
    textBoldFont: {
        fontFamily: fonts.poppinsSemiBold
    },
    cardModalContainer: {
        flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 12
    },
    cardChildModal: {
        width: 264, alignItems: 'center'
    },
    img: {
        width: "100%",
        height: "100%"
    },
}