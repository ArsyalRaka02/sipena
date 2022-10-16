import React, { useState } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import color from "../utils/color";
import { fonts } from "../utils/fonts";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


export default function Button(props) {
    let theme = props.theme;
    let backgroundStyle = {};
    let textStyle = {};
    let jenisIcons = props.jenisIcons ?? "MaterialCommunityIcons";

    if (theme == "primary" || theme == null) {
        backgroundStyle = {
            backgroundColor: color.primary,
        };
        textStyle = {
            color: color.white,
            fontFamily: fonts.montserratBold,
            fontSize: 16
        };
    } else if (theme == "secondary" || theme == "secondary-light") {
        backgroundStyle = {
            backgroundColor: color.white,
            borderColor: color.white,
            borderWidth: 1,
        };
        textStyle = {
            color: color.black,
            fontFamily: fonts.montserratBold,
            fontSize: 16
        };
    } else if (theme == "secondary-dark") {
        backgroundStyle = {
            backgroundColor: color.black,
            borderColor: color.primary,
            borderWidth: 1,
        };
        textStyle = {
            color: color.white,
        };
    } else if (theme == "danger") {
        backgroundStyle = {
            backgroundColor: color.danger,
            borderColor: color.danger,
            borderWidth: 1,
        };
        textStyle = {
            color: color.white,
        };
    } else if (theme == "light") {
        backgroundStyle = {
            backgroundColor: '#FFE5E3',
        };
        textStyle = {
            color: color.primary,
        };
    }

    let loading = props.loading ?? false;
    let isDisabled = props.disabled ?? false;

    if (isDisabled) {
        backgroundStyle = {
            backgroundColor: "#E0E0E0",
        };
        textStyle = {
            color: "#BDBDBD",
        };
    }

    return (
        <TouchableOpacity activeOpacity={1} style={[styles.backgroundStyle, backgroundStyle, props.style]}
            onPress={() => {
                if (!loading && !isDisabled) {
                    props.onPress != null && props.onPress();
                }
            }}>
            {!loading && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {
                        jenisIcons == "MaterialCommunityIcons" && (
                            <MaterialCommunityIcons name={props.iconName} size={24} color={color.white} style={[styles.iconLeft, props.iconStyles]} />
                        )
                    }
                    {
                        jenisIcons == "FontAwesome5" && (
                            <FontAwesome5 name={props.iconName} size={24} color={color.white} style={[styles.iconLeft, props.iconStyles]} />
                        )
                    }
                    {
                        jenisIcons == "Ionicons" && (
                            <Ionicons name={props.iconName} size={24} color={color.white} style={[styles.iconLeft, props.iconStyles]} />
                        )
                    }
                    <Text style={[styles.textStyle, textStyle, props.textStyle]}>{props.children}</Text>
                </View>
            )}

            {loading && <ActivityIndicator color={textStyle.color ?? color.white} />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: color.primary,
        borderRadius: 10,
        height: 55,
        justifyContent: "center",
        alignItems: "center",
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.white,
    }
});