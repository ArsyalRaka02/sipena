import React, { component } from "react"
import { Text, View, TouchableOpacity, Dimensions, SafeAreaView } from "react-native"
import color from "../utils/color";
import Feather from 'react-native-vector-icons/Feather';
import { fonts } from "../utils/fonts";

const SCREEN_WIDTH = Dimensions.get("window").width

export default function HeaderBackTablet(props) {
    return (
        <>
            <SafeAreaView style={{ backgroundColor: color.black }} />
            <View style={Styles.container}>
                <TouchableOpacity onPress={props.iconLeft} activeOpacity={0.8}>
                    <Feather name="arrow-left" size={24} color={color.white} />
                </TouchableOpacity>
                <View style={{ marginLeft: 16 }}>
                    <Text style={Styles.txtHeader}>{props.textHeader}</Text>
                </View>
                <View style={{ flex: 1 }} />
            </View>
        </>
    )
}

const Styles = {
    container: {
        flexDirection: "row",
        alignItems: "center",
        width: SCREEN_WIDTH,
        backgroundColor: color.primary,
        height: 60,
        paddingHorizontal: 20,
    },
    txtHeader: {
        fontSize: 16,
        fontFamily: fonts.montserratReguler,
        color: color.white,
    },
    txtProfile: {
        marginRight: 11,
        fontSize: 16
    }
}