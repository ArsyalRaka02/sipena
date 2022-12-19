import React, { component, useCallback, useEffect, useState } from "react"
import { Text, View, TouchableOpacity, Dimensions, SafeAreaView, Alert, Image } from "react-native"
import color from "../utils/color";
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { fonts } from "../utils/fonts";
import { useDispatch, useSelector } from "react-redux";
import SimpleModal from "./SimpleModal";
import { setLockScreen, setUser } from "../store/actions";
import Button from "./Button";
import StyleUtils from "../utils/StyleUtils";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { HttpRequest } from "../utils/http";
import Toast from "./Toast";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'
import responseStatus from "../utils/responseStatus";
import app from "../config/app";
import RoleResponse from "../utils/RoleResponse";

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function HeaderTablet(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [isCount, setCount] = useState(0)

    const [isLoading, setIsLoading] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showPinInputModal, setShowPinInputModal] = useState(false);
    const [value, setValue] = useState("");
    const [codeProps, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const [detail, setDetail] = useState({})

    useEffect(() => {
        if (user) {
            loadProfile()
            loadGetTotal()
        }
    }, [user]);

    const loadGetTotal = useCallback(() => {
        let id = user?.data?.id
        HttpRequest.notifikasiTotal(id).then((res) => {
            let data = res.data
            if (data.status == responseStatus.INSERT_SUKSES) {
                setCount(data.data)
            } else {
                Toast.showError("Err: " + `${data.message}`)
            }
            console.log("ini notifikasi", data)
        }).catch((err) => {
            console.log("err", err, err.response)
        })
    }, [isCount])


    const loadProfile = useCallback(() => {
        let id = user.id
        HttpRequest.getProfile(id).then((res) => {
            let result = res.data.data.data
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setDetail(result)
                // console.log("user cuy", result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Gagal mendapatkan list jadwal")
                setDetail([])
            }
        }).catch((err) => {
            Toast.showError("Server Error: ")
            console.log("err", err, err.response)
        })
    }, [detail])

    return (
        <>
            <SafeAreaView style={{ backgroundColor: color.primary }} />
            <View style={{ backgroundColor: color.primary, height: SCREEN_HEIGHT / 4 }}>
                <View style={styles.container}>
                    <TouchableOpacity activeOpacity={1} onPress={props.iconProfile} style={[styles.containerProfile, { overflow: 'hidden' }]}>
                        {/* <Image source={{ uri: app.BASE_URL_PICTURE + detail.foto_profil }} style={{ height: "100%", width: "100%" }} resizeMode="cover" /> */}
                        {
                            user.role_id == RoleResponse.siswa && (
                                <Image source={{ uri: app.BASE_URL_PICTURE + detail?.foto_profil }} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                            )
                        }
                        {
                            user.role_id == RoleResponse.guru && (
                                <Image source={{ uri: app.BASE_URL_PICTURE + detail?.profil_picture }} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                            )
                        }
                        {
                            user.role_id == RoleResponse.walimurid && (
                                <Image source={{ uri: app.BASE_URL_PICTURE + detail?.foto_profil }} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                            )
                        }
                        {
                            user.role_id == RoleResponse.pegawai && (
                                <Image source={{ uri: app.BASE_URL_PICTURE + detail?.profil_picture }} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                            )
                        }
                        {/* <Ionicons name="person-outline" size={24} color={color.black} /> */}
                    </TouchableOpacity>
                    <View style={styles.containerText}>
                        {
                            user.role_id == RoleResponse.admin && (
                                <>
                                    <Text {...props} numberOfLines={1} style={props.textProfile}>Admin</Text>
                                    <Text {...props} style={props.textAlamat}>role: admin</Text>
                                </>
                            )
                        }
                        {
                            user.role_id != RoleResponse.admin && (
                                <>
                                    <Text {...props} numberOfLines={1} style={props.textProfile}>{detail?.nama_lengkap}</Text>
                                    <Text {...props} style={props.textAlamat}>Role: {user.rolenama} </Text>
                                </>
                            )
                        }
                    </View>
                    <TouchableOpacity style={styles.menuRight} onPress={props.iconRight} activeOpacity={0.8}>
                        <Ionicons name="notifications" size={24} color={color.white} />
                        <View style={{ backgroundColor: isCount > 1 ? color.danger : color.primary, borderRadius: 20, width: 10, height: 10, position: 'absolute', top: 5, right: 6 }} />
                    </TouchableOpacity>
                </View>
                <Image source={require("../assets/sipena/p.png")} style={{ height: "100%", width: "100%", position: 'absolute', tintColor: color.whiteColorRgba }} resizeMode="cover" />
            </View>
        </>
    )
}

const styles = {
    container: {
        zIndex: 20,
        flexDirection: "row",
        alignItems: "center",
        width: SCREEN_WIDTH,
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    containerProfile: {
        borderWidth: 1,
        borderColor: color.gray,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.white,
        width: 50, height: 50,
        borderRadius: 50
    },

    containerText: {
        flex: 1,
        paddingHorizontal: 10
    },

    menuRight: {
        width: 50, height: 50,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
}