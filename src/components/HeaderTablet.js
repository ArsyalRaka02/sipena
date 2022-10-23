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

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function HeaderTablet(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const [isLoading, setIsLoading] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showPinInputModal, setShowPinInputModal] = useState(false);
    const [value, setValue] = useState("");
    const [codeProps, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
        // console.log("User", user);
    }, [user]);

    const gantiShift = useCallback(() => {
        setIsLoading(true);
        HttpRequest.changeShift({ pin: value }).then((res) => {
            setIsLoading(false);

            dispatch(setUser(res.data));
            Toast.showSuccess("Anda berhasil login");

            setShowLogoutModal(false);
            setShowPinInputModal(false);
        }).catch((err) => {
            console.log(err);
            Toast.showError(err.response.data.message);
            setIsLoading(false);
        });
    }, [value]);

    return (
        <>
            <SafeAreaView style={{ backgroundColor: color.primary }} />
            <View style={{ backgroundColor: color.primary, height: SCREEN_HEIGHT / 4 }}>
                <View style={styles.container}>
                    <TouchableOpacity activeOpacity={1} onPress={props.iconProfile} style={styles.containerProfile}>
                        {/* <Image /> */}
                    </TouchableOpacity>
                    <View style={styles.containerText}>
                        <Text {...props} numberOfLines={1} style={props.textProfile}>Afsyus Raka Arsyal Desga Riansyah</Text>
                        <Text {...props} style={props.textAlamat}>Jl.Kandangan Gunung No.18</Text>
                    </View>
                    <TouchableOpacity style={styles.menuRight} onPress={props.iconRight} activeOpacity={0.8}>
                        <Ionicons name="notifications" size={24} color={color.white} />
                    </TouchableOpacity>
                </View>
                <Image source={require("../assets/sipena/backgroundDashboard.png")} style={{ height: "100%", width: "100%", position: 'absolute', }} resizeMode="cover" />
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
        backgroundColor: color.gray,
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