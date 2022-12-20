import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
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

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function TambahBukuPerpus(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const [selectedBuku, setSelectedBuku] = useState(null)
    const [listKategori, setListKategori] = useState([])
    const [getImage, setImage] = useState("")
    const [halaman, setHalaman] = useState(0)
    const [bahasa, setBahasa] = useState("")
    const [author, setAuthor] = useState("")
    const [judul, setJudul] = useState("")
    const [stok, setStok] = useState(0)
    const [isLoading, setIsloading] = useState(false)

    useEffect(() => {
        loadKatalogKategori()
    }, [])

    const btnSave = useCallback(() => {
        let formData = new FormData();
        if (judul == "") {
            return Toast.showError("Judul Tidak boleh kosong")
        }
        if (author == "") {
            return Toast.showError("Nama Penulis tidak boleh kosong")
        }
        if (halaman == 0) {
            return Toast.showError("Halaman tidak boleh kosong")
        }
        if (stok == 0) {
            return Toast.showError("Stok tidak boleh kosong")
        }
        if (bahasa == "") {
            return Toast.showError("Bahasa tidak boleh kosong")
        }
        if (selectedBuku == null) {
            return Toast.showError("Kategori Buku tidak boleh kosong")
        }
        if (getImage == "") {
            return Toast.showError("Gambar tidak boleh kosong")
        }
        formData.append('image', {
            name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
            type: 'image/jpeg',
            uri: getImage,
        });
        formData.append('pegawai_id', user.data.id);
        formData.append('perpus_kategori_id', selectedBuku);
        formData.append('judul', judul);
        formData.append('stok_buku', stok);
        formData.append('author', author);
        formData.append('bahasa', bahasa);
        formData.append('total_halaman', halaman);

        setIsloading(true)
        // console.log("data", formData)
        HttpRequest.insertKatalogBuku(formData).then((res) => {
            if (res.data.status == responseStatus.INSERT_SUKSES) {
                setTimeout(() => {
                    navigation.goBack()
                    Toast.showSuccess("Berhasil tambah buku")
                }, 300);
            }
            if (res.data.status == responseStatus.INSERT_GAGAL) {
                Toast.showError(`${res.data.message}`)
            }
            setIsloading(false)
        }).catch((err) => {
            setIsloading(false)
            console.log("err", err, err.response)
        })
    }, [user, selectedBuku, judul, author, bahasa, halaman, stok, getImage])

    const loadKatalogKategori = useCallback(() => {
        HttpRequest.kategoriBuku().then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                let loop = res.data.data.map((item) => {
                    return {
                        id: item.id,
                        label: item.nama
                    }
                })
                setListKategori(loop)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("gagal status = 2")
                setListKategori([])
            }
        }).catch((err) => {
            Toast.showError("Server Error: ")
            console.log("ini adalah list beita", error)
        })
    }, [listKategori])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Tambah Buku</Text>
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
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Stok</Text>
                        <TextInputIcon
                            keyboardType='numeric'
                            value={stok}
                            onChangeText={setStok}
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
                        Tambah
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
