import React, { Component, useState } from "react";
import { StatusBar, Image, TouchableOpacity, ActivityIndicator, View, Text } from 'react-native';
import color from "../utils/color";

export default function LoadingIndicator(props) {
    return (
        <>
            <View style={styles.wrapper}>
                <ActivityIndicator size={'large'} color={color.primary} />
                <Text style={styles.text}>Loading...</Text>
            </View>
        </>
    );
}

const styles = {
    wrapper: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: color.primary,
        fontSize: 16,
        marginTop: 5,
    }
};