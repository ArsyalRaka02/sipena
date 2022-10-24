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

export default function HeaderBack(props) {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.button} activeOpacity={0.8}
                    onPress={() => {
                        props.onBack != null && props.onBack();
                    }}>
                    <FontAwesome name='angle-left' size={24} color={color.white} />
                </TouchableOpacity>

                <View style={{ flex: 1 }}>
                    {props.children}
                </View>
            </View>

            {props.title != null && (
                <View style={styles.content}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: color.primary
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        marginTop: 20,
    },
    button: {
        borderRadius: 10,
        width: 40,
        height: 40,
        borderColor: color.white,
        // borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    title: {
        color: color.white,
        fontWeight: 'bold',
        fontSize: 20,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 12,
    }
});