import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    ScrollView
} from "react-native";
import color from "../utils/color";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/actions";
import ImageUtils from "../utils/ImageUtils";
import MaterialCommunityIcons from "react-native-vector-icons/dist/MaterialCommunityIcons";
import { fonts } from "../utils/fonts";

const userMenus = [
    {
        label: "Valas",
        target: "Dashboard",
        icon: 'cash-multiple',
    },
    {
        label: "Emas & Perak",
        target: "Emas",
        icon: 'gold',
    },
    {
        label: "Batu & Perhiasan",
        target: "Batu",
        icon: 'star-four-points',
    },
];

export default function SideMenu(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const logout = useCallback(() => {
        dispatch(setUser(null));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {userMenus.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.menu}
                            activeOpacity={0.9}
                            onPress={() => {
                                props.navigation.closeDrawer();
                                props.navigation.navigate(item.target);
                            }}>
                            <MaterialCommunityIcons name={item.icon} size={25} color={color.black} />
                            <Text style={styles.menuLabel}>{item.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <TouchableOpacity
                style={[styles.menu, { justifyContent: 'center' }]}
                activeOpacity={0.9}
                onPress={() => {
                    props.navigation.closeDrawer();
                    Alert.alert(
                        'Information',
                        'Are you sure want to logout?',
                        [
                            { text: 'No', onPress: () => { }, style: 'cancel' },
                            {
                                text: 'Yes', onPress: () => {
                                    logout();
                                }
                            },
                        ],
                        { cancelable: false }
                    );
                }}>
                <Feather name="log-out" color={color.primary} size={20} />
                <Text style={styles.logoutButton}>Log Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    menuIcon: {
        width: 30,
        height: 30,
        tintColor: color.white,
    },
    menuIconTransparent: {
        width: 24,
        height: 24,
    },
    photoWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    photo: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    editProfileButton: {
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 7,
        backgroundColor: color.primary,
        marginLeft: 10,
    },
    editProfileText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: color.white,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.white,
        marginBottom: 3,
    },
    type: {
        fontSize: 14,
        color: color.white,
        marginBottom: 20,
    },
    line: {
        height: 1,
        backgroundColor: "#DFE2E6",
        marginBottom: 20,
    },


    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 20,
        // backgroundColor: 'red',
        paddingVertical: 20,
    },
    menuLabel: {
        fontFamily: fonts.montserratBold,
        fontSize: 16,
        color: color.black,
        flex: 1,
        marginLeft: 10,
    },
    logoutButton: {
        fontSize: 16,
        color: color.primary,
        marginLeft: 10,
    }
});