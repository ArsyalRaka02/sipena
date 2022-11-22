import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListBerita(props) {
    const navigation = useNavigation()
    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Berita</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <TextInputIcon
                        // containerStyle={{ marginBottom: 10 }}
                        wrapperStyle={{ backgroundColor: color.white, borderWidth: 0, paddingHorizontal: 10 }}
                        jenisIcons={"Ionicons"}
                        iconName={"search-outline"}
                        placeholder="Cari Berita"
                    />
                    <View style={{ height: 10 }} />
                    <List />
                </View>
            </SafeAreaView>
        </>
    )
}

function List() {
    const navigation = useNavigation()
    const data = [
        {
            judul: "judul berita",
            img: require("../assets/images/no-image.png"),
            tanggal: "2020/12/12",
        }
    ]
    return (
        <>
            <ScrollView style={{ paddingVertical: 10 }}>
                {
                    data.map((item, iData) => {
                        return (
                            <View style={styles.containerList}>
                                <View style={styles.childImage}>
                                    <Image source={item.img} style={{ height: "100%", width: "100%" }} />
                                </View>
                                <View style={styles.childContent}>
                                    <Text style={styles.txtGlobalBold}>{item.judul}</Text>
                                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Ionicons name="time-outline" size={18} color={color.black} />
                                            <Text style={[styles.txtGlobal, { fontSize: 12, marginLeft: 4 }]}>{moment(item.tanggal).format("dddd, DD MMM YYYY")}</Text>
                                        </View>
                                        <View style={{ width: 10 }} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <Ionicons name="eye-outline" size={18} color={color.black} />
                                            <Text style={[styles.txtGlobal, { fontSize: 12, marginLeft: 4 }]}>200</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </>
    )
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    txtHeader: {
        fontSize: 18,
        color: color.white,
        fontFamily: fonts.interBold,
    },
    txtGlobal: { fontSize: 12, fontFamily: fonts.inter },
    txtGlobalBold: { fontSize: 15, fontFamily: fonts.interBold },
    containerList: { backgroundColor: color.white, flexDirection: 'row', padding: 10, borderRadius: 12, alignItems: 'center' },
    childImage: { width: SCREEN_WIDTH / 5, height: SCREEN_HEIGHT / 10, borderRadius: 12, overflow: "hidden" },
    childContent: { flexDirection: 'column', flex: 1, marginLeft: 12 }
}
