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

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function EditBukuPerpus(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const { params } = props.route.params
    const [selectedBuku, setSelectedBuku] = useState(null)
    const [listKategori, setListKategori] = useState([])
    const [getImage, setImage] = useState("")
    const [halaman, setHalaman] = useState(params.total_halaman)
    const [bahasa, setBahasa] = useState(params.bahasa)
    const [author, setAuthor] = useState(params.author)
    const [judul, setJudul] = useState(params.judul)
    const [stok, setStok] = useState(params.stok_buku)
    const [isLoading, setIsloading] = useState(false)
    console.log("params getImage", getImage)

    useEffect(() => {
        loadKatalogKategori()
    }, [])

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
        if (stok == 0) {
            return Alert.alert("Informasi", "Stok tidak boleh kosong")
        }
        if (bahasa == "") {
            return Alert.alert("Informasi", "Bahasa tidak boleh kosong")
        }
        if (selectedBuku == null) {
            return Alert.alert("Informasi", "Kategori Buku tidak boleh kosong")
        }
        if (getImage == "") {
            return Alert.alert("Informasi", "Gambar tidak boleh kosong")
        }
        formData.append('image', {
            name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
            type: 'image/jpeg',
            uri: getImage,
        });
        formData.append('id', params.id);
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
                // setTimeout(() => {
                //     navigation.goBack()
                //     Toast.showSuccess("Berhasil tambah buku")
                // }, 300);
                Alert.alert("Informasi", "Berhasil", [
                    {
                        text: "Oke", onPress: () => {
                            setTimeout(() => {
                                navigation.goBack()
                            }, 300);
                        }
                    }
                ])
            }
            if (res.data.status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${res.data.message}`)
            }
            setIsloading(false)
        }).catch((err) => {
            setIsloading(false)
            Alert.alert("Informasi", "Error dari server")
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
                Alert.alert("Informasi", `${res.data.message}`)
                setListKategori([])
            }
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
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
                    <Text style={styles.txtHeader}>Edit Buku</Text>
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
