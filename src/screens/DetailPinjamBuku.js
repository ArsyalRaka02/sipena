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
import { HttpRequest } from '../utils/http'
import Toast from '../components/Toast'
import responseStatus from '../utils/responseStatus'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function DetailPinjamBuku(props) {
    const navigation = useNavigation()
    const { params } = props.route.params
    // console.log("params", params)

    const user = useSelector(state => state.user);
    const [isLoading, setIsLoading] = useState(false)

    const btnSave = useCallback(() => {
        if (params.buku_pinjam.length == 0) {
            return Toast.showError("Daftar buku tidak ada, tidak bisa Acc pinjaman")
        } else {
            let id = params.id
            let pegawai_id = user.data.id
            HttpRequest.accPinjambuku(id, pegawai_id).then((res) => {
                let data = res.data
                if (data.status == responseStatus.INSERT_SUKSES) {
                    setTimeout(() => {
                        Toast.showSuccess("Berhasil acc pinjam bukus")
                        navigation.goBack()
                    }, 300);
                }
                if (data.status == responseStatus.INSERT_GAGAL) {
                    Toast.showError(`${data.message}`)
                }
                // console.log("ini adalah ", res.data)
            }).catch((err) => {
                Toast.showError("Server Err: ")
                console.log("ini adalah err acc pinjam buku", err, err.response)
            })
        }
    }, [user, params])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Detail Pinjaman</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ flexDirection: 'column', backgroundColor: color.white, padding: 12, borderRadius: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.txtGlobalBold, { fontSize: 15, flex: 1 }]}>{params.user_nama}</Text>
                            <Text style={[styles.txtGlobalBold, { fontSize: 15 }]}>{params.nama_role}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={[styles.txtGlobal, { fontSize: 13 }]}>Tanggal Peminjaman</Text>
                            <Text style={[styles.txtGlobalBold, { fontSize: 13 }]}>{moment(params.tanggal_peminjaman).format("DD MMMM YYYY")}</Text>
                        </View>
                    </View>
                    <View style={{ height: 20 }} />
                    <ScrollView>
                        <Text style={[styles.txtGlobalBold, { fontSize: 18, color: color.black, marginVertical: 20 }]}>Daftar Buku</Text>
                        {
                            params.buku_pinjam.length == 0 && (
                                <NoData>Tidak ada daftar buku</NoData>
                            )
                        }
                        {
                            params.buku_pinjam.map((itemBuku, ibuku) => {
                                return (
                                    <>
                                        {
                                            itemBuku.map((lol, iLol) => {
                                                let dateA = moment(params.tanggal_peminjaman).format("DD/MM/YYYY")
                                                let dateB = moment(params.tanggal_pengembalian).format("DD/MM/YYYY")
                                                return (
                                                    <>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10 }}>
                                                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>{lol.judul}</Text>
                                                                <Text style={[styles.txtGlobal, { fontSize: 13, color: color.black }]}>{lol.author}</Text>
                                                            </View>
                                                            <Text>{dateB}</Text>
                                                        </View>
                                                    </>
                                                )
                                            })
                                        }
                                    </>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button activeOpacity={1} isLoading={isLoading} onPress={() => {
                        btnSave()
                    }} >
                        Pinjamkan Buku
                    </Button>
                </View>
            </SafeAreaView>
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
