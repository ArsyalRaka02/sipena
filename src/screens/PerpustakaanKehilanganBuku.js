import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Dropdown from '@febfeb/react-native-dropdown'
import Combobox from '../components/Combobox'
import Button from '../components/Button'
import { HttpRequest } from "../utils/http"
import Toast from '../components/Toast'
import responseStatus from '../utils/responseStatus'
import { useSelector } from 'react-redux'
import Koma from '../utils/Koma'
import ModalWarningMessage from '../components/ModalWarningMessage'
import ModalBerhasilMessage from '../components/ModalBerhasilMessage'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function PerpustakaanKehilanganBuku(props) {
    const user = useSelector(state => state.user);
    const navigation = useNavigation()

    const [selectedBuku, setSelectedBuku] = useState(null)
    const [listBuku, setListBuku] = useState([])
    const [detail, setDetail] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isModal, setModal] = useState(false)
    const [isModalSukses, setModalSukses] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        getData()
        if (user) {
            getProfile()
        }
    }, [user])

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

    const getData = useCallback(() => {
        HttpRequest.kehilanganBuku().then((res) => {
            let data = res.data
            if (data.status == responseStatus.INSERT_SUKSES) {
                let loop = data.data.map((item) => {
                    return {
                        id: item.perpus_katalog_id,
                        label: item.judul + " " + "-" + " " + item.author
                    }
                })
                setListBuku(loop)
            }
            if (data.status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", "Error Status == 2")
            }
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err", err, err.response)
        })
    }, [listBuku])

    const getProfile = useCallback(() => {
        let id = user.id
        HttpRequest.getProfile(id).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setDetail(res.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${res.data.message}`)
                setDetail({})
            }
            console.log("ini adalha", res.data)
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err", err, err.response)
        })
    }, [user])

    const btnSave = useCallback(() => {
        if (selectedBuku == null) {
            return Alert.alert("Informasi", "harap pilih buku hilang terlebih dahulu")
        }
        if (detail.saldo < 50000) {
            return Alert.alert("Informasi", "Maaf Saldo kurang dari Rp. 50.000,-")
        }
        let data = {
            user_id: user.data.id,
            perpus_katalog_id: selectedBuku,
            nominal: 50000
        }
        setIsLoading(true)
        // console.log("deta", detail.saldo)
        HttpRequest.insertKehilanganBuku(data).then((res) => {
            let data = res.data
            if (data.status == responseStatus.INSERT_GAGAL) {
                // toogleOpen()
                // setMessage(`${res.data.message}`)
                Alert.alert("Informasi", `${res.data.message}`)
            }
            if (data.status == responseStatus.INSERT_SUKSES) {
                Alert.alert("Informasi", "Berhasil", [
                    {
                        text: "Oke", onPress: () => {
                            setTimeout(() => {
                                navigation.popToTop()
                            }, 300);
                        }
                    }
                ])
                // toggleSuksesOpen()
                // setMessage("Berhasil")
            }
            console.log("ini ", res.data)
            setIsLoading(false)
        }).catch((err) => {
            setIsLoading(false)
            Alert.alert("Informasi", "Server Err:")
            console.log("err", err, err.response)
        })
    }, [detail, user, selectedBuku, message])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Kehilangan Buku</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Buku Hilang</Text>
                        <Combobox
                            value={selectedBuku}
                            placeholder="Silahkan Pilih Buku"
                            theme={{
                                boxStyle: {
                                    backgroundColor: color.white,
                                    borderColor: color.Neutral20,
                                },
                                leftIconStyle: {
                                    color: color.Neutral10,
                                    marginRight: 14
                                },
                                rightIconStyle: {
                                    color: color.Neutral10,
                                },
                            }}
                            jenisIconsRight="Ionicons"
                            iconNameRight="caret-down-outline"
                            showLeftIcons={false}
                            data={listBuku}
                            onChange={(val) => {
                                setSelectedBuku(val);
                            }}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Saldo Anda</Text>
                        <TextInputIcon
                            editable={false}
                            value={Koma.format(detail.saldo)}
                            wrapperStyle={{ backgroundColor: color.themeGray, borderColor: color.themeGray }}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Nominal Pembayaran</Text>
                        <TextInputIcon
                            editable={false}
                            value={"50.000"}
                            wrapperStyle={{ backgroundColor: color.themeGray, borderColor: color.themeGray }}
                        />
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button activeOpacity={1} isLoading={isLoading} onPress={() => {
                        btnSave()
                    }} >
                        Bayar Sekarang
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
