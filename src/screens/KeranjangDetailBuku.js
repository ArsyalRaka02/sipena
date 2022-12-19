import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { useDispatch, useSelector } from 'react-redux'
import Toast from '../components/Toast'
import { setSimpanBuku } from '../store/actions'
import NoData from '@febfeb/react-native-dropdown/src/NoData'
import Button from '../components/Button'
import { HttpRequest } from '../utils/http'
import responseStatus from '../utils/responseStatus'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function KeranjangDetailBuku(props) {
    const navigation = useNavigation()
    const list = useSelector(state => state.setSimpanBuku);
    const user = useSelector(state => state.user);
    const [listData, setListData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const isFocused = useIsFocused()
    const dispatch = useDispatch();


    const btnSave = useCallback(() => {
        if (list.length == 0) {
            return Toast.showError("List buku kosong, harap pilih kembali")
        }
        let loop = list.map((item) => {
            return item.id
        })
        let data = {
            user_id: user.id,
            tanggal_peminjaman: moment(new Date).format("YYYY-MM-DD"),
            perpus_katalog_id: loop
        }
        setIsLoading(true)
        HttpRequest.pinjamBuku(data).then((res) => {
            let status = res.data
            if (status.status == responseStatus.INSERT_SUKSES) {
                setTimeout(() => {
                    navigation.goBack()
                }, 300);
                Toast.showSuccess("Berhasil meminjam, mohon kembalikan tepat waktu")
            }
            if (status.status == responseStatus.INSERT_GAGAL) {
                return Toast.showError(`${status.message}`)
            }
            setIsLoading(false)
        }).catch((err) => {
            setIsLoading(false)
            Toast.showError("Server Error")
        })
    }, [list])

    useEffect(() => {

    }, [list])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Pinjam Buku</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <Text style={[styles.txtGlobalBold, { marginVertical: 14 }]}>Daftar Buku</Text>
                    <ScrollView>
                        {
                            list.length == 0 && (
                                <NoData>Tidak ada Keranjang</NoData>
                            )
                        }
                        {
                            list.length > 0 && (
                                list.map((item, index) => {
                                    return (
                                        <>
                                            <View style={{ flexDirection: 'row', backgroundColor: color.white, borderRadius: 12, padding: 22, alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                                    <Text numberOfLines={2} style={[styles.txtGlobalBold, { color: color.black, width: "70%", }]}>{item.judul}</Text>
                                                    <Text style={[styles.txtGlobal, { color: color.black }]}>{item.author}</Text>
                                                </View>
                                                {/* <View style={{ flex: 1 }} /> */}
                                                {/* <TouchableOpacity activeOpacity={1} onPress={() => {
                                                    Toast.showSuccess("Berhasil membatalkan")
                                                    dispatch(setSimpanBuku([]))
                                                }} style={[styles.txtGlobalBold, { color: color.danger }]}>
                                                    <Text style={[styles.txtGlobalBold, { color: color.danger }]}>Batal</Text>
                                                </TouchableOpacity> */}
                                            </View>
                                        </>
                                    )
                                })
                            )
                        }
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Nama</Text>
                        <TextInputIcon
                            value={user.data.nama_lengkap}
                            wrapperStyle={{ backgroundColor: color.themeGray, borderColor: color.themeGray }}
                        />
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button activeOpacity={1} isLoading={isLoading} onPress={() => {
                        btnSave()
                    }}>
                        Pinjam Sekarang
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
