import React, { useState } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from "react-native";
import color from "../utils/color";
import AntDesign from 'react-native-vector-icons/AntDesign';

const stars = [1, 2, 3, 4, 5];

export default function StarView(props) {

    let value = props.value;

    return (
        <View style={styles.container}>
            {stars.map((star, index) => {
                if (star > value) {
                    return (
                        <AntDesign name='star' color='#E0E0E0' size={20} key={index} style={{ marginRight: 3 }} />
                    );
                } else {
                    return (
                        <AntDesign name='star' color='#F2C94C' size={20} key={index} style={{ marginRight: 3 }} />
                    );
                }
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});