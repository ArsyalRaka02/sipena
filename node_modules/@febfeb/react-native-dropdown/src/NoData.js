import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export default function NoData(props) {
    return (
        <View style={styles.wrapper}>
            <MaterialCommunityIcons name='information-outline' size={30} color={'#000'} />
            <Text style={styles.text}>{props.children}</Text>
        </View>
    );
}
const styles = {
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        flex: 1,
        minHeight: 200
    },
    text: {
        fontSize: 14,
        color: '#000'
    }
}