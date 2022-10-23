import React, { useCallback, useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from "@react-navigation/native"
import { setSplashScreen } from '../store/actions';
import color from '../utils/color';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SplashScreen(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(setSplashScreen(false));
        }, 2000);
    }, []);

    return (
        <SafeAreaView style={styles.screen}>
            <Text style={styles.center}>
                Smart School
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.white,
    },
    top: {
        flex: 1,
        justifyContent: 'center',
    },
    bottom: {
        height: 200,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logo: {
        width: 400,
        height: 200,
    },
    text: {
        width: 300,
        height: 65,
    },
    center: {
        fontSize: 18,
        color: color.black,
        textAlign: 'center',
    },
});