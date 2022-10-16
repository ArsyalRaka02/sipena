import React, { Component, useMemo, useState, useCallback, useEffect } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, ActivityIndicator, View, Text, Dimensions, Alert } from 'react-native';
import color from "../utils/color";
import TextInputIcon from "./TextInputIcon";
import { fonts } from "../utils/fonts";
import Button from "./Button";
import { HttpRequest } from "../utils/http";
import Toast from "./Toast";
import { useDispatch, useSelector } from "react-redux";
import { setLockScreen, setUser } from "../store/actions";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import StyleUtils from "../utils/StyleUtils";

export default function ScreenLockModal(props) {
    const dispatch = useDispatch();
    const [pettyCash, setPettyCash] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(state => state.user);
    const [value, setValue] = useState("");
    const [codeProps, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
        console.log("User", user);
    }, [user]);

    const login = useCallback(() => {
        setIsLoading(true);
        HttpRequest.changeShift({ pin: value }).then((res) => {
            setIsLoading(false);

            dispatch(setUser(res.data));
            Toast.showSuccess("Anda berhasil login");
            dispatch(setLockScreen(false));

            setShowLogoutModal(false);
            setShowPinInputModal(false);
        }).catch((err) => {
            console.log(err);
            Toast.showError(err.response.data.message);
            setIsLoading(false);
        });
    }, [value]);

    return (
        <View style={styles.root}>
            <View style={styles.content}>
                <Text style={StyleUtils.titleStyle}>Masukkan PIN Anda</Text>

                <CodeField
                    {...codeProps}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={value}
                    onChangeText={setValue}
                    cellCount={6}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => {
                        let textChild = null;

                        if (symbol) {
                            textChild = '•';
                        } else if (isFocused) {
                            textChild = <Cursor />;
                        }

                        return (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {textChild}
                            </Text>
                        );
                    }}
                />

                <Button
                    style={{ marginBottom: 15 }}
                    onPress={() => {
                        login();
                    }}>
                    Login
                </Button>

                <Button
                    theme='danger'
                    onPress={() => {
                        Alert.alert(
                            'Informasi',
                            'Anda yakin ingin logout ?',
                            [
                                { text: 'No', onPress: () => { }, style: 'cancel' },
                                {
                                    text: 'Yes', onPress: () => {
                                        dispatch(setLockScreen(false));
                                        dispatch(setUser(null));
                                    }
                                },
                            ],
                            { cancelable: false }
                        );
                    }}>
                    Logout
                </Button>
            </View>
        </View>
    )
}

const styles = {
    root: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(0,0,0,0.5)',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: color.white,
        width: 400,
        borderRadius: 8,
        padding: 10,
        marginTop: 100,
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.montserratBold,
        marginBottom: 10,
    },

    codeFieldRoot: {
        marginVertical: 15,
    },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 1,
        borderColor: color.gray,
        borderRadius: 8,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
}