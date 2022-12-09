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
import UploadImageView from '../components/UploadImageView'
import { HttpRequest } from '../utils/http'
import Button from '../components/Button'
import axios from 'axios'
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker"
import ImageResizer from 'react-native-image-resizer';
import Toast from '../components/Toast'
import responseStatus from '../utils/responseStatus'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const listOpsi = [
    {
        id: "-",
        label: "-"
    },
    {
        id: "-",
        label: "-"
    },
]

export default function FormMutasi(props) {
    const navigation = useNavigation()
    const [selectedOpsi, setSelectedOpsi] = useState([])
    const [file, setFile] = useState("")
    const [buktiMutasiDinas, setBuktiMutasiDinas] = useState("")
    const [keteranganKeluar, setKeteranganKeluar] = useState("")
    const [raportAsli, setRaportAsli] = useState("")
    const [fotoCopyRaport, setFotoCopyRaport] = useState("")
    const [fotoCopySertifikat, setFotoCopySertifikat] = useState("")
    const [suratRekomendasiSekolah, setSuratRekomendasiSekolah] = useState("")
    const [suratRekomendasiJendral, setSuratRekomendasiJendral] = useState("")


    const btnSave = useCallback(() => {
        let formData = new FormData();
        formData.append('image', {
            name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
            type: 'image/jpeg',
            uri: buktiMutasiDinas,
        });
        formData.append('image1', {
            name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
            type: 'image/jpeg',
            uri: keteranganKeluar,
        });
        formData.append('image2', {
            name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
            type: 'image/jpeg',
            uri: raportAsli,
        });
        formData.append('image3', {
            name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
            type: 'image/jpeg',
            uri: fotoCopyRaport,
        });
        formData.append('image4', {
            name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
            type: 'image/jpeg',
            uri: fotoCopySertifikat,
        });
        formData.append('image5', {
            name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
            type: 'image/jpeg',
            uri: suratRekomendasiSekolah,
        });
        formData.append('image6', {
            name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
            type: 'image/jpeg',
            uri: buktiMutasiDinas,
        });
        formData.append('siswa_id', 1);
        // console.log("1", type)
        console.log("cl", formData)
        // axios.post(`https://sipena.wapfive.com/api/simpanmutasisiswa`, formData, {
        //     headers: {}
        // }).then((res) => {
        //     console.log("res", res)
        // }).catch((err) => {
        //     console.log("c", err, err.response)
        // });

        // console.log("ini d", data)
        HttpRequest.mutasiSiswaPost(formData).then((res) => {
            let data = res.data
            if (data.status == responseStatus.STATUS_ISTIMEWA) {
                return Toast.showError(`${data.message}`)
            }
            if (data.status == responseStatus.INSERT_SUKSES) {
                return Toast.showSuccess("Berhasil")
            }
            if (data.status == responseStatus.INSERT_GAGAL) {
                return Toast.showError("Gagal")
            }
            console.log("ini hasil res", data)
        }).catch((err) => {
            Toast.showError("Server error: ")
            console.log("err", err, err.response)
        })
    }, [buktiMutasiDinas, keteranganKeluar, raportAsli, fotoCopyRaport, fotoCopySertifikat, suratRekomendasiSekolah, suratRekomendasiJendral])

    const getFormData = (object) => {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }

    // useEffect(() => {
    //     loadData()
    // }, []);

    const loadData = useCallback(() => {
        HttpRequest.listMutasiSiswa().then((res) => {
            console.log("ini adalah res", res)
        }).catch((err) => {
            console.log("err", err, err.response)
        })
    })

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Mutasi Siswa</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Nama Siswa</Text>
                        <TextInputIcon
                            editable={false}
                            value={"Nama Siswa"}
                            wrapperStyle={{ backgroundColor: color.themeGray, borderColor: color.themeGray }}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>NIS</Text>
                        <TextInputIcon
                            editable={false}
                            value={"Nama Siswa"}
                            wrapperStyle={{ backgroundColor: color.themeGray, borderColor: color.themeGray }}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Opsi Mutasi</Text>
                        <Combobox
                            value={selectedOpsi}
                            placeholder="Silahkan pilih opsi"
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
                            data={listOpsi}
                            onChange={(val) => {
                                setSelectedOpsi(val);
                            }}
                        />
                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Bukti Mutasi Dinas Pendidikan Provinsi Asal</Text>
                        <UploadImageView
                            useCamera={false}
                            type="image"
                            onSelectImage={(e) => {
                                setBuktiMutasiDinas(e)
                            }}
                        />
                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Keterangan Keluar/Pindah Sekolah Asal</Text>
                        <UploadImageView
                            useCamera={false}
                            type="image"
                            onSelectImage={(e) => {
                                setKeteranganKeluar(e)
                            }}
                        />
                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Raport Asal</Text>
                        <UploadImageView
                            useCamera={false}
                            type="image"
                            onSelectImage={(e) => {
                                setRaportAsli(e)
                            }}
                        />
                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Fotocopy Raport</Text>
                        <UploadImageView
                            useCamera={false}
                            type="image"
                            onSelectImage={(e) => {
                                setFotoCopyRaport(e)
                            }}
                        />
                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Fotocopy Sertifikat</Text>
                        <UploadImageView
                            useCamera={false}
                            type="image"
                            onSelectImage={(e) => {
                                setFotoCopySertifikat(e)
                            }}
                        />
                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Surat Rekomendasi Sekolah</Text>
                        <UploadImageView
                            useCamera={false}
                            type="image"
                            onSelectImage={(e) => {
                                setSuratRekomendasiSekolah(e)
                            }}
                        />
                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Surat Rekomendasi Jendral Dikdasmen</Text>
                        <UploadImageView
                            useCamera={false}
                            type="image"
                            onSelectImage={(e) => {
                                setSuratRekomendasiJendral(e)
                            }}
                        />

                    </ScrollView>
                </View>
                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button activeOpacity={1} onPress={() => {
                        btnSave()
                    }}>
                        Simpan
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