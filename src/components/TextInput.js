import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput as Input, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import color from '../utils/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TextInput(props) {
    const [showPassword, setShowPassword] = useState(false);

    let isSecureTextEntry = props.secureTextEntry ?? false;

    const togglePassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    return (
        <View style={[styles.container, props.containerStyle]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.label}>{props.label}</Text>

                {props.sublabel != null && <Text style={styles.sublabel}>{props.sublabel}</Text>}
            </View>
            <View style={[styles.inputContainer, props.wrapperStyle]}>
                {isSecureTextEntry == false && (
                    <>
                        <Input {...props} style={styles.input} secureTextEntry={false} autoCapitalize='none' autoCorrect={false} placeholderTextColor={color.white + "99"} />
                    </>
                )}

                {isSecureTextEntry == true && (
                    <>
                        <Input {...props} style={[styles.input, props.inputStyle]} secureTextEntry={!showPassword} autoCapitalize='none' autoCorrect={false} placeholderTextColor={color.white + "99"} />
                        <TouchableOpacity style={styles.eyeButton} onPress={togglePassword}>
                            {showPassword && <MaterialCommunityIcons name='eye-off-outline' size={20} color={color.white} />}
                            {!showPassword && <MaterialCommunityIcons name='eye-outline' size={20} color={color.white} />}
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    label: {
        fontSize: 14,
        color: color.white,
        marginBottom: 5,
    },
    sublabel: {
        marginLeft: 5,
        fontSize: 10,
        fontStyle: 'italic',
        color: color.primary,
        marginBottom: 5,
    },
    inputContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: color.primary, //"#A5A4A4",
        height: 55,
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
        color: color.white,
    },
    eyeButton: {
        paddingLeft: 15,
        paddingVertical: 10,
    },
});