import React, { useCallback, useEffect, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
} from "react-native"
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context"
import Button from "../components/Button"
import color from "../utils/color"
import { HttpRequest } from "../utils/http"
import Toast from "../components/Toast"
import app from "../config/app"
import { setUser } from "../store/actions"
import TextInputIcon from "../components/TextInputIcon";
import { fonts } from "../utils/fonts"


export default function Login({ navigation }) {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [username, setUsername] = useState(__DEV__ ? app.EXAMPLE_EMAIL : "");
    const [password, setPassword] = useState(__DEV__ ? app.EXAMPLE_PASSWORD : "");

    const login = useCallback(() => {
        // setLoading(true);
        dispatch(setUser(""));
        // let data = { username, password };
        // HttpRequest.login(data).then((res) => {
        //     console.log("Res", res.data);
        //     Toast.showSuccess("Login Success");
        //     setLoading(false);

        //     dispatch(setUser(""));
        // }).catch((err) => {
        //     console.log(err, err.response);
        //     Toast.showError(err.response.data.message);
        //     setLoading(false);
        // });
        // }, [username, password]);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.titleName}>{app.NAME}</Text>

                <Text style={styles.label}>Username</Text>
                <TextInputIcon
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    containerStyle={styles.input} />

                <Text style={styles.label}>Password</Text>

                <TextInputIcon
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    containerStyle={styles.input} />

                <Button
                    loading={isLoading}
                    style={{ marginBottom: 10 }}
                    onPress={() => login()}>
                    Log In
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    content: {
        padding: 20,
    },
    titleName: {
        fontSize: 20,
        fontFamily: fonts.montserratBold,
        marginBottom: 20,
    },
    input: {
        marginBottom: 24,
    },
    label: {
        fontSize: 13,
        fontFamily: fonts.montserratReguler,
        marginBottom: 5,
    },

    bottomWrap: {
        flex: 4,
        paddingHorizontal: 20,
    },

    lineWrap: {
        paddingVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#333333',
    },
    textBetween: {
        color: color.white,
        marginHorizontal: 10,
        fontSize: 14,
    },

    buttonNoBg: {
        backgroundColor: color.black,
        // marginBottom: 30,
        marginHorizontal: 20,
        borderWidth: 0,
    },
    signInText: {
        fontWeight: 'bold',
        color: color.primary,
    },

    imageWallpaper: {
        width: "100%",
        height: "100%",
        position: 'absolute',
    },

    footerForm: {
        flexDirection: 'row',
        marginBottom: 26,
        alignItems: 'center'
    },
    checkBox: {
        width: 24, height: 24
    },
    txtForgotPassword: {
        fontSize: 16,
        textAlign: 'right',
        color: color.primary,
        fontFamily: fonts.montserratBold
    },
    txtRememberMe: {
        fontSize: 16,
        flex: 1,
        marginLeft: 8,
        color: color.Neutral80,
        fontFamily: fonts.montserratReguler
    }
});