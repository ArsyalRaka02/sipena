import React, { useState } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from "react-native";
import color from "../utils/color";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Header(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}
                onPress={() => {
                    props.onBack != null && props.onBack();
                }}>
                <FontAwesome name='angle-left' size={20} color={color.white} />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title}>{props.title}</Text>
                {props.subtitle != null && <Text style={styles.subtitle}>{props.subtitle}</Text>}
            </View>
            <View style={{ width: 40 }}>
                {props.rightMenu}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    content: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        borderRadius: 10,
        width: 40,
        height: 40,
        borderColor: color.white,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: color.white,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 12,
    }
});