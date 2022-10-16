import React, { Component, useMemo, useState, useCallback } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, ActivityIndicator, View, Text, Dimensions } from 'react-native';
import color from "../utils/color";
import TextInputIcon from "./TextInputIcon";
import { fonts } from "../utils/fonts";
import Button from "./Button";
import { HttpRequest } from "../utils/http";
import Toast from "./Toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/actions";


export default function PettyCashModal(props) {
    const dispatch = useDispatch();
    const [pettyCash, setPettyCash] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(state => state.user);

    const save = useCallback(() => {
        setIsLoading(true);
        HttpRequest.newPettyCash({ amount: Number(pettyCash) }).then((res) => {
            setIsLoading(false);

            dispatch(setUser({ ...user }));
        }).catch((err) => {
            console.log(err);
            Toast.showError(err.response.data.message);
            setIsLoading(false);
        });
    }, [pettyCash]);

    return (
        <View style={styles.root}>
            <View style={styles.content}>
                <Text style={styles.title}>Masukkan Petty Cash</Text>

                <TextInputIcon
                    jenisIcons="Ionicons"
                    iconName="cash"
                    placeholder="Nominal"
                    keyboardType="numeric"
                    value={pettyCash}
                    onChangeText={(val) => {
                        setPettyCash(val);
                    }}
                />

                <Button
                    style={{ marginTop: 10 }}
                    loading={isLoading}
                    onPress={() => { save(); }}>Simpan</Button>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: color.white,
        width: 400,
        borderRadius: 8,
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.montserratBold,
        marginBottom: 10,
    },
}