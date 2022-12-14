import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Button from '../components/Button'
import responseStatus from '../utils/responseStatus'
import { HttpRequest } from '../utils/http'
import { useSelector } from 'react-redux'
import Toast from '../components/Toast'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function PerpustakaanKembaliBuku(props) {
    const navigation = useNavigation()

    const user = useSelector(state => state.user);
    const [listBuku, setListBuku] = useState([])

    useEffect(() => {
        if (user) {
            loadBuku()
        }
    }, [user])

    const loadBuku = useCallback(async () => {
        try {
            let data = await HttpRequest.kembalikanBuku(user.id)
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListBuku(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("gagal status = 2")
                setListBuku([])
            }
            console.log("res buku", result)
        } catch (error) {
            Toast.showError("Server Error: ")
            console.log("ini adalah list beita", error)
        }
    }, [listBuku, user])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Kembalikan Buku</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ backgroundColor: color.white, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ height: 79, width: 79, marginRight: 16 }}>
                            <Image source={require("../assets/images/warning.png")} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.black, fontSize: 14, marginBottom: 6 }]}>Durasi Peminjaman Buku 1 Minggu</Text>
                            <Text style={[styles.txtGlobal, { fontSize: 13 }]}>Jika lebih dari itu denda seribu perhari</Text>
                        </View>
                    </View>

                    {/* //list buku */}
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            <ListKatalog />
                            <Text style={[styles.txtGlobalBold, { fontSize: 18, marginVertical: 20, color: color.black }]}>Total Denda</Text>
                            <TextInputIcon
                                editable={false}
                                value={"Denda"}
                                wrapperStyle={{ backgroundColor: color.themeGray, borderColor: color.themeGray }}
                            />
                        </ScrollView>
                    </View>
                </View>
                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button
                        onPress={() => {

                        }}
                    >
                        Kembalikan Buku
                    </Button>
                </View>
            </SafeAreaView>
        </>
    )
}

function ListKatalog() {
    let data = [
        {
            judul: "Unforgettable",
            creator: "By ArsyalDev",
            day: "8 day"
        },
        {
            judul: "Unforgettable",
            creator: "By ArsyalDev",
            day: "8 day"
        },
        {
            judul: "Unforgettable",
            creator: "By ArsyalDev",
            day: "8 day"
        },

    ]
    return (
        <>
            <Text style={[styles.txtGlobalBold, { fontSize: 18, color: color.black, marginVertical: 20 }]}>Daftar Buku</Text>
            {
                data.map((item, iList) => {
                    return (
                        <>
                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10 }}>
                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>{item.judul}</Text>
                                    <Text style={[styles.txtGlobal, { fontSize: 13, color: color.black }]}>{item.creator}</Text>
                                </View>
                                <Text>{item.day}</Text>
                            </View>
                        </>
                    )
                })
            }
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

    txtGlobal: { fontSize: 13, fontFamily: fonts.inter },
    txtGlobalBold: { fontSize: 15, fontFamily: fonts.interBold },
}
