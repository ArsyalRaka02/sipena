import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput as Input, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import color from '../utils/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts';

export default function TextInputIcon(props) {
    const [showPassword, setShowPassword] = useState(false);

    let isSecureTextEntry = props.secureTextEntry ?? false;
    let jenisIcons = props.jenisIcons ?? "MaterialCommunityIcons";
    let jenisIconsRight = props.jenisIconsRight ?? "MaterialCommunityIcons";
    let iconColor = props.iconColor ?? color.Neutral10

    const togglePassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    return (
        <View style={[styles.container, props.containerStyle]}>
            <View style={[styles.inputContainer, props.wrapperStyle]}>
                {isSecureTextEntry == false && (
                    <>
                        {
                            jenisIcons == "MaterialCommunityIcons" && (
                                <MaterialCommunityIcons name={props.iconName} size={20} color={iconColor} style={styles.iconLeft} />
                            )
                        }
                        {
                            jenisIcons == "FontAwesome5" && (
                                <FontAwesome5 name={props.iconName} size={20} color={iconColor} style={styles.iconLeft} />
                            )
                        }
                        {
                            jenisIcons == "FontAwesome" && (
                                <FontAwesome name={props.iconName} size={20} color={iconColor} style={styles.iconLeft} />
                            )
                        }
                        {
                            jenisIcons == "Ionicons" && (
                                <Ionicons name={props.iconName} size={20} color={iconColor} style={styles.iconLeft} />
                            )
                        }

                        <Input {...props} style={[styles.input, props.inputStyle]} secureTextEntry={false} autoCapitalize='none' autoCorrect={false} placeholderTextColor={color.black + "99"} />

                        {
                            jenisIconsRight == "MaterialCommunityIcons" && (
                                <MaterialCommunityIcons name={props.iconNameRight} size={20} color={iconColor} style={styles.iconRight} />
                            )
                        }
                        {
                            jenisIconsRight == "FontAwesome5" && (
                                <FontAwesome5 name={props.iconNameRight} size={20} color={iconColor} style={styles.iconRight} />
                            )
                        }
                        {
                            jenisIconsRight == "Ionicons" && (
                                <Ionicons name={props.iconNameRight} size={20} color={iconColor} style={styles.iconRight} />
                            )
                        }
                    </>
                )}

                {isSecureTextEntry == true && (
                    <View style={{ paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' }}>
                        {/* <FontAwesome5 name="key" size={20} color={color.Neutral10} style={styles.iconLeft} /> */}
                        <Input {...props} style={[styles.input, props.inputStyle]} secureTextEntry={!showPassword} autoCapitalize='none' autoCorrect={false} placeholderTextColor={color.black + "99"} />
                        <TouchableOpacity style={styles.eyeButton} onPress={togglePassword}>
                            {showPassword && <MaterialCommunityIcons name='eye-off-outline' size={20} color={color.Neutral10} />}
                            {!showPassword && <MaterialCommunityIcons name='eye-outline' size={20} color={color.Neutral10} />}
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    iconLeft: {
        paddingRight: 14
    },
    inputContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: color.white,
        height: 48,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: color.white,
        paddingHorizontal: 0,
    },
    input: {
        flex: 1,
        color: color.black,
        fontFamily: fonts.montserratReguler,
    },
    eyeButton: {
        paddingLeft: 15,
        paddingVertical: 10,
    },
});