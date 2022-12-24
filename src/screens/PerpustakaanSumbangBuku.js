import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Combobox from '../components/Combobox'
import Button from '../components/Button'
import UploadImageView from '../components/UploadImageView'
import { HttpRequest } from '../utils/http'
import Toast from '../components/Toast'
import { useSelector } from 'react-redux'
import responseStatus from '../utils/responseStatus'
import ModalWarningMessage from '../components/ModalWarningMessage'
import ModalBerhasilMessage from '../components/ModalBerhasilMessage'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const listBukuHilang = [
    {
        id: "Unforgettable",
        label: "Unforgettable"
    },
    {
        id: "Unforgettable",
        label: "Unforgettable"
    },
]

export default function PerpustakaanSumbangBuku(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const [selectedBuku, setSelectedBuku] = useState(null)
    const [listKategori, setListKategori] = useState([])
    const [getImage, setImage] = useState("")
    const [halaman, setHalaman] = useState(0)
    const [bahasa, setBahasa] = useState("")
    const [author, setAuthor] = useState("")
    const [judul, setJudul] = useState("")

    const [isModal, setModal] = useState(false)
    const [isModalSukses, setModalSukses] = useState(false)
    const [message, setMessage] = useState("")
    const [isLoading, setIsloading] = useState(false)

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

    useEffect(() => {
        loadKatalogKategori()
    }, [user])

    const loadKatalogKategori = useCallback(async () => {
        try {
            let data = await HttpRequest.kategoriBuku()
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                let loop = result.map((item) => {
                    return {
                        id: item.id,
                        label: item.nama
                    }
                })
                setListKategori(loop)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${data.data.message}`)
                setListKategori([])
            }
            console.log("res kategori", result)
        } catch (error) {
            Alert.alert("Informasi", "Server err dari api")
            console.log("ini adalah list beita", error)
        }
    }, [listKategori])

    const btnSave = useCallback(() => {
        let formData = new FormData();
        if (judul == "") {
            return Alert.alert("Informasi", "Judul Tidak boleh kosong")
        }
        if (author == "") {
            return Alert.alert("Informasi", "Nama Penulis tidak boleh kosong")
        }
        if (halaman == 0) {
            return Alert.alert("Informasi", "Halaman tidak boleh kosong")
        }
        if (bahasa == "") {
            return Alert.alert("Informasi", "Bahasa tidak boleh kosong")
        }
        if (selectedBuku == null) {
            return Alert.alert("Informasi", "Kategori Buku tidak boleh kosong")
        }
        if (getImage == "") {
            return Alert.alert("Informasi", "Gambar Buku tidak boleh kosong")
        }
        formData.append('image', {
            name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
            type: 'image/jpeg',
            uri: getImage,
        });
        formData.append('user_id', user.id);
        formData.append('perpus_kategori_id', selectedBuku);
        formData.append('judul', judul);
        formData.append('author', author);
        formData.append('bahasa', bahasa);
        formData.append('total_halaman', halaman);
        setIsloading(true)
        HttpRequest.insertSumbangBuku(formData).then((res) => {
            let data = res.data
            if (data.status == responseStatus.STATUS_ISTIMEWA) {
                Alert.alert("Informasi", `${res.data.message}`)
                // toogleOpen()
                // setMessage(`${res.data.message}`)
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
            if (data.status == responseStatus.INSERT_GAGAL) {
                // toogleOpen()
                Alert.alert("Informasi", `${res.data.message}`)
            }
            setIsloading(false)
            console.log("res", data)
        }).catch((err) => {
            setIsloading(false)
            Alert.alert("Informasi", "Server err dari api")
            console.log("ini adalah err", err, err.response)
        })
    }, [user, selectedBuku, judul, author, bahasa, halaman, getImage, message])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Sumbang Buku</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Nama Buku</Text>
                        <TextInputIcon
                            value={judul}
                            onChangeText={setJudul}
                        />
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Nama Penulis</Text>
                        <TextInputIcon
                            value={author}
                            onChangeText={setAuthor}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Kategori Buku</Text>
                        <Combobox
                            value={selectedBuku}
                            placeholder="Silahkan Pilih Kategori"
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
                            data={listKategori}
                            onChange={(val) => {
                                setSelectedBuku(val);
                            }}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Jumlah Halaman</Text>
                        <TextInputIcon
                            keyboardType='numeric'
                            value={halaman}
                            onChangeText={setHalaman}
                        />
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Bahasa</Text>
                        <TextInputIcon
                            value={bahasa}
                            onChangeText={setBahasa}
                        />
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Upload Gambar</Text>
                        <UploadImageView
                            useCamera={false}
                            type="image"
                            onSelectImage={(e) => {
                                setImage(e)
                            }}
                        />
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button loading={isLoading} onPress={() => {
                        btnSave()
                    }}>
                        Sumbang Sekarang
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
