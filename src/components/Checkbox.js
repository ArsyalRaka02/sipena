import React, { Component, useMemo, useState, useCallback } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, ActivityIndicator, View, Text } from 'react-native';
import color from "../utils/color";


function Checkbox(props) {
    let isChecked = props.value ?? false
    return (
        <>
            <TouchableOpacity onPress={props.onPress} style={[styles.boxCheck, props.styleBox]}>
                {
                    isChecked == true && <MaterialCommunityIcons name='check' size={14} color={color.primary} />
                }
            </TouchableOpacity>
        </>
    )
}

function RadioCheckBox(props) {
    console.log("ini adalah Radio Check run")
}

const styles = {
    box: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    boxCheck: {
        borderWidth: 1,
        borderColor: "#ccc",
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        borderRadius: 8
    }
}

export { Checkbox, RadioCheckBox };