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


export default function BadgeStatus(props) {

    let statusBg = "#C5ECD5";
    let statusText = "Pending";
    let textColor = "#000";

    //pending, approved, rejected, finished, paymentcompleted
    if (props.status == "pending") {
        statusBg = "#FFECB0";
        statusText = "Pending";
        textColor = "#C39300";
    } else if (props.status == "approved") {
        statusBg = "#FFECB0";
        statusText = "Active";
        textColor = "#C39300";
    } else if (props.status == "rejected") {
        statusBg = color.danger;
        statusText = "Rejected";
        textColor = "#FFF";
    } else if (props.status == "finished") {
        statusBg = "#C5ECD5";
        statusText = "Finished";
        textColor = "#219653";
    } else if (props.status == "paymentcompleted") {
        statusBg = "#C5ECD5";
        statusText = "Payment Completed";
        textColor = "#219653";
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={[styles.status, { backgroundColor: statusBg }]}>
                <Text style={[styles.statusText, { color: textColor }]}>{statusText}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    status: {
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: color.primary,
    },
    statusText: {
        fontSize: 14,
        color: color.white,
    }
});