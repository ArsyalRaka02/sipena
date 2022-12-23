import React, { useCallback, useEffect, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    Dimensions
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
import responseStatus from "../utils/responseStatus";
import RoleResponse from "../utils/RoleResponse";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Login({ navigation }) {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const [username, setUsername] = useState(__DEV__ ? app.EXAMPLE_EMAIL : "");
    const [password, setPassword] = useState(__DEV__ ? app.EXAMPLE_PASSWORD : "");

    const login = useCallback(() => {
        setLoading(true);
        let data = { username, password };
        HttpRequest.login(data).then((res) => {
            let result = res.data
            if (result.data.role_id == RoleResponse.admin) {
                Toast.showError("Admin tidak boleh akses disini!!")
                setLoading(false);
            } else if (result.data.role_id == RoleResponse.pegawai) {
                if (result.data.data.is_koperasi == "Y") {
                    Toast.showError("Koperasi tidak bisa akses disini!!")
                } else {
                    if (result.status == responseStatus.INSERT_SUKSES) {
                        Toast.showSuccess("Berhasil Login")
                        dispatch(setUser(res.data.data));
                    }
                    if (result.status == responseStatus.INSERT_GAGAL) {
                        Toast.showError("Email/Password Salah")
                    }
                    setLoading(false);
                }
                setLoading(false);
            } else {
                if (result.status == responseStatus.INSERT_SUKSES) {
                    Toast.showSuccess("Berhasil Login")
                    dispatch(setUser(res.data.data));
                }
                if (result.status == responseStatus.INSERT_GAGAL) {
                    Toast.showError("Email/Password Salah")
                }
                setLoading(false);
            }

            console.log("ini adalah result", result)
            // setLoading(false);
        }).catch((err) => {
            setLoading(false);
            Toast.showError("Email/Password Salah")
            console.log(err, err.response);
        });
    }, [username, password]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={color.primary} barStyle='light-content' />

            <View style={{ flexDirection: 'column', position: 'relative', zIndex: -100 }}>
                <View style={styles.containerHeaderBox}>
                    <Image source={require("../assets/sipena/triangle.png")} style={{ height: "100%", width: "100%", position: 'absolute', tintColor: color.white }} resizeMode="cover" />
                </View>
                <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT / 5, backgroundColor: color.primary, position: 'relative', top: -150, zIndex: 100 }}>
                    <Image source={require("../assets/sipena/segitiga.png")} style={{ height: "100%", width: "100%", position: 'absolute', tintColor: color.white }} resizeMode="cover" />
                </View>
                <View style={{ position: 'absolute', top: 200, left: 0, right: 0, bottom: 0, alignItems: 'center', zIndex: 100 }}>
                    <Text style={[styles.label, { fontSize: 28, color: color.primary }]}>Masuk</Text>
                </View>
                <View style={{ position: 'absolute', top: 50, left: 0, right: 0, bottom: 0, alignItems: 'center' }}>
                    <Text style={[styles.label, { fontSize: 28, color: color.white }]}>SIPENA</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.label}>Username</Text>
                <TextInputIcon
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    wrapperStyle={{ borderWidth: 1, borderColor: color.gray }}
                    containerStyle={styles.input} />

                <Text style={styles.label}>Kata Sandi</Text>

                <TextInputIcon
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    wrapperStyle={{ borderWidth: 1, borderColor: color.gray }}
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
        marginTop: -100,
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
        fontSize: 18,
        fontFamily: fonts.interBold,
        marginBottom: 5,
        color: color.primary
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
    box: {
        backgroundColor: color.white,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 2,
        borderRadius: 30
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
    },
    containerHeaderBox: {
        height: SCREEN_HEIGHT / 3,
        backgroundColor: color.primary,
        position: 'relative',
    },
});