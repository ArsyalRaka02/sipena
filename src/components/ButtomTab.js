import React, { Component, useEffect, useCallback, useState } from "react";
import { Dimensions } from "react-native";
import { TouchableOpacity, ActivityIndicator, View, Text, Image } from 'react-native';
import color from "../utils/color";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from "../utils/fonts";


const SCREEN_HEIGHT = Dimensions.get("window").height;

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function BottomTab(props) {
    const [menus, setMenu] = useState([
        { type: 'reguler', label: "Beranda", image: require("../assets/sipena/home-2.png"), icon: 'home-outline', iconSelected: 'home', target: "Dashboard" },
        { type: 'reguler', label: "Profil", image: require("../assets/sipena/user-8.png"), icon: 'person-outline', iconSelected: 'person', target: "Profile" },
    ])

    return (
        <View>
            <View style={[styles.wrapper, { borderTopWidth: 1, borderTopColor: "#f5f5f5" }]}>
                {menus.map((menu, key) => {
                    if (menu.type == 'reguler') {
                        if (key == props.selected) {
                            return (
                                <TouchableOpacity disabled={props.disabled} style={styles.button} key={key} onPress={() => {
                                    props.onClick(menu.target);
                                }}>
                                    {/* <Ionicons name={menu.icon} style={{ marginBottom: 6 }} size={22} color={color.primary} /> */}
                                    <Image source={menu.image} style={styles.iconActive} />
                                    <Text style={styles.textActive}>{menu.label}</Text>
                                </TouchableOpacity>
                            );
                        } else {
                            return (
                                <TouchableOpacity disabled={props.disabled} style={styles.button} key={key} onPress={() => {
                                    props.onClick(menu.target);
                                }}>
                                    {/* <Ionicons name={menu.icon} style={{ marginBottom: 6 }} size={22} color={color.black} /> */}
                                    <Image source={menu.image} style={styles.icon} />
                                    <Text style={styles.text}>{menu.label}</Text>
                                </TouchableOpacity>
                            );
                        }
                    } else {
                        return (
                            <View style={{
                                width: 90,
                                height: 40
                            }} key={key} />
                        );
                    }
                })}
                {/* <TouchableOpacity style={styles.buttonBig} onPress={() => {
                        this.props.onClick("Streaming");
                        this.setState({ selected: 2 });
                    }}>
                        <Image source={require('../assets/icons/playing_cards.png')} style={{width: 42, height: 42}} />
                        <Text>Matches</Text>
                    </TouchableOpacity> */}
            </View>
        </View>
    )
}

const styles = {
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: color.white,
    },
    button: {
        flex: 1,
        paddingTop: 13,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 11
        // backgroundColor: 'red',
    },
    buttonBig: {
        position: 'absolute',
        left: (SCREEN_WIDTH / 2) - 50,
        bottom: 0,
        width: 100,
        borderRadius: 57,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        tintColor: color.themeGray
    },
    iconActive: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        tintColor: color.primary,
        marginBottom: 5,
    },
    text: {
        fontFamily: fonts.poppinsReguler,
        fontSize: 11,
        textAlign: 'center',
    },
    textActive: {
        fontFamily: fonts.poppinsBold,
        fontSize: 11,
        textAlign: 'center',
        color: color.primary,
    },
    bigIcon: {
        width: 100,
        height: 100,
    }
};