import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, BackHandler, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { useDispatch, useSelector } from 'react-redux'
import Toast from '../components/Toast'
import { setSimpanBuku, setObjBuku } from '../store/actions'
import NoData from '@febfeb/react-native-dropdown/src/NoData'
import Button from '../components/Button'
import { HttpRequest } from '../utils/http'
import responseStatus from '../utils/responseStatus'
import _, { drop } from 'lodash';
import ModalWarningMessage from '../components/ModalWarningMessage'
import ModalBerhasilMessage from '../components/ModalBerhasilMessage'

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
    const [isModal, setModal] = useState(false)
    const [isModalSukses, setModalSukses] = useState(false)
    const [message, setMessage] = useState("")

    const toogleOpen = useCallback(() => {
        setModal(!isModal)
    }, [isModal])

    const toogleClose = useCallback(() => {
        setModal(!isModal)
    }, [isModal])

    const toggleSuksesOpen = useCallback(() => {
        setModalSukses(!isModalSukses)
    }, [isModalSukses])

    const toggleSuksesClose = useCallback(() => {
        setModalSukses(!isModalSukses)
    }, [isModalSukses])


    const btnSave = useCallback(() => {
        if (listData.length == 0) {
            toogleOpen()
            setMessage("List buku kosong, harap pilih kembali")
            return
        }
        if (listData.length > 3) {
            toogleOpen()
            setMessage("list buku tidak boleh lebih dari 3, harap pilih kembali")
            return
        }
        let loop = listData.map((item) => {
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
                // setTimeout(() => {
                //     navigation.goBack()
                // }, 300);
                toggleSuksesOpen()
                setMessage("Berhasil meminjam, mohon kembalikan tepat waktu")
            }
            if (status.status == responseStatus.INSERT_GAGAL) {
                toogleOpen()
                setMessage(`${res.data.message}`)
                return
            }
            setIsLoading(false)
        }).catch((err) => {
            setIsLoading(false)
            Toast.showError("Server Error")
        })
    }, [message])

    useEffect(() => {
        setListData(list)
        const backAction = () => {
            dispatch(setSimpanBuku(listData))
            dispatch(setObjBuku([]));
            navigation.navigate("Perpustakaan")
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [listData])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        dispatch(setSimpanBuku(listData))
                        dispatch(setObjBuku([]));
                        navigation.navigate("Perpustakaan")
                    }}
                >
                    <Text style={styles.txtHeader}>Pinjam Buku</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <Text style={[styles.txtGlobalBold, { marginVertical: 14 }]}>Daftar Buku</Text>
                    <ScrollView>
                        {
                            listData.length == 0 && (
                                <NoData>Tidak ada Keranjang</NoData>
                            )
                        }
                        {
                            listData.length > 0 && (
                                listData.map((item, index) => {
                                    return (
                                        <>
                                            <View style={{ flexDirection: 'row', backgroundColor: color.white, borderRadius: 12, padding: 22, alignItems: 'center' }}>
                                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                                    <Text numberOfLines={2} style={[styles.txtGlobalBold, { color: color.black, width: "70%", }]}>{item.judul}</Text>
                                                    <Text style={[styles.txtGlobal, { color: color.black }]}>{item.author}</Text>
                                                </View>
                                                {/* <View style={{ flex: 1 }} /> */}
                                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                                    Alert.alert("Informasi", "Apakah yakin hapus dari keranjang?", [
                                                        {
                                                            text: "Ya", onPress: () => {
                                                                Toast.showSuccess("Berhasil membatalkan")
                                                                let data = list.splice(index, 1)
                                                                dispatch(setSimpanBuku(data))
                                                            }
                                                        },
                                                        {
                                                            text: "Tidak", onPress: () => {
                                                                return nulls
                                                            }
                                                        }
                                                    ])
                                                }} style={[styles.txtGlobalBold, { color: color.danger }]}>
                                                    <Text style={[styles.txtGlobalBold, { color: color.danger }]}>Batal</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ height: 20 }} />
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
                <ModalWarningMessage
                    isShowModal={isModal}
                    // isLoading={loading}
                    reqClose={() => {
                        toogleClose()
                    }}
                    message={message}
                    onPress={() => {
                        toogleClose()
                    }}
                />
                <ModalBerhasilMessage
                    isShowModal={isModalSukses}
                    // isLoading={loading}
                    reqClose={() => {
                        toggleSuksesClose()
                    }}
                    message={message}
                    onPress={() => {
                        navigation.goBack()
                        toggleSuksesClose()
                    }}
                />
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
