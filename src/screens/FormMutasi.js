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
import DocumentPicker, { types } from 'react-native-document-picker';
import { useSelector } from 'react-redux'

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
    const [isLoading, setIsloading] = useState(false)
    const [selectedOpsi, setSelectedOpsi] = useState([])
    const [file, setFile] = useState("")
    const [buktiMutasiDinas, setBuktiMutasiDinas] = useState([])
    const [keteranganKeluar, setKeteranganKeluar] = useState([])
    const [raportAsli, setRaportAsli] = useState([])
    const [fotoCopyRaport, setFotoCopyRaport] = useState([])
    const [fotoCopySertifikat, setFotoCopySertifikat] = useState([])
    const [suratRekomendasiSekolah, setSuratRekomendasiSekolah] = useState([])
    const [suratRekomendasiJendral, setSuratRekomendasiJendral] = useState([])
    const user = useSelector(state => state.user);
    // const [fileResponse, setFileResponse] = useState([]);


    const btnSave = useCallback(() => {
        let formData = new FormData();
        if (buktiMutasiDinas.length == 0) {
            return Toast.showError("Bukti Mutasi Dinas Pendidikan Provinsi Asal Tidak Boleh Kosong")
        }
        if (keteranganKeluar.length == 0) {
            return Toast.showError("Keterangan Keluar/Pindah Sekolah Asal Tidak Boleh Kosong")
        }
        if (raportAsli.length == 0) {
            return Toast.showError("Raport Asal Boleh Kosong")
        }
        if (fotoCopyRaport.length == 0) {
            return Toast.showError("Fotocopy Raport Tidak Boleh Kosong")
        }
        if (fotoCopySertifikat.length == 0) {
            return Toast.showError("Fotocopy Sertifikat Tidak Boleh Kosong")
        }
        if (suratRekomendasiSekolah.length == 0) {
            return Toast.showError("Surat Rekomendasi Sekolah Tidak Boleh Kosong")
        }
        if (suratRekomendasiJendral.length == 0) {
            return Toast.showError("Surat Rekomendasi Jendral Dikdasmen Tidak Boleh Kosong")
        }

        formData.append('image', {
            name: 'pdf-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.pdf',
            type: buktiMutasiDinas[0].type,
            uri: buktiMutasiDinas[0].uri,
        });
        formData.append('image1', {
            name: 'pdf-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.pdf',
            type: keteranganKeluar[0].type,
            uri: keteranganKeluar[0].uri,
        });
        formData.append('image2', {
            name: 'pdf-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.pdf',
            type: raportAsli[0].type,
            uri: raportAsli[0].uri,
        });
        formData.append('image3', {
            name: 'pdf-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.pdf',
            type: fotoCopyRaport[0].type,
            uri: fotoCopyRaport[0].uri,
        });
        formData.append('image4', {
            name: 'pdf-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.pdf',
            type: fotoCopySertifikat[0].type,
            uri: fotoCopySertifikat[0].uri,
        });
        formData.append('image5', {
            name: 'pdf-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.pdf',
            type: suratRekomendasiSekolah[0].type,
            uri: suratRekomendasiSekolah[0].uri,
        });
        formData.append('image6', {
            name: 'pdf-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.pdf',
            type: suratRekomendasiJendral[0].type,
            uri: suratRekomendasiJendral[0].uri,
        });
        // formData.append('image1', {
        //     name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
        //     type: 'image/jpeg',
        //     uri: keteranganKeluar,
        // });
        // formData.append('image2', {
        //     name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
        //     type: 'image/jpeg',
        //     uri: raportAsli,
        // });
        // formData.append('image3', {
        //     name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
        //     type: 'image/jpeg',
        //     uri: fotoCopyRaport,
        // });
        // formData.append('image4', {
        //     name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
        //     type: 'image/jpeg',
        //     uri: fotoCopySertifikat,
        // });
        // formData.append('image5', {
        //     name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
        //     type: 'image/jpeg',
        //     uri: suratRekomendasiSekolah,
        // });
        // formData.append('image6', {
        //     name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
        //     type: 'image/jpeg',
        //     uri: buktiMutasiDinas,
        // });
        formData.append('siswa_id', user.id);
        setIsloading(true)
        HttpRequest.mutasiSiswaPost(formData).then((res) => {
            let data = res.data
            if (data.status == responseStatus.STATUS_ISTIMEWA) {
                Toast.showError(`${data.message}`)
            }
            if (data.status == responseStatus.INSERT_SUKSES) {
                Toast.showSuccess("Berhasil")
            }
            if (data.status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Gagal")
            }
            setIsloading(false)
            console.log("ini hasil res", data)
        }).catch((err) => {
            setIsloading(false)
            Toast.showError("Server error: ")
            console.log("err", err, err.response)
        })
    }, [buktiMutasiDinas, keteranganKeluar, raportAsli, fotoCopyRaport, fotoCopySertifikat, suratRekomendasiSekolah, suratRekomendasiJendral, isLoading, user])

    const getFormData = (object) => {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }

    useEffect(() => {
        // loadData()
    }, [user]);

    // const loadData = useCallback(() => {
    //     HttpRequest.listMutasiSiswa().then((res) => {
    //         console.log("ini adalah res", res)
    //     }).catch((err) => {
    //         console.log("err", err, err.response)
    //     })
    // }, [])

    const uploadFile = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'pageSheet',
                type: [DocumentPicker.types.pdf],
            });
            if (response[0].type != "application/pdf") {
                Toast.showError("Maaf Harus .Pdf")
            } else {
                setBuktiMutasiDinas(response);
            }
            console.log("ini adlaah ", response)
        } catch (err) {
            Toast.showError("gagal mendapatkan file")
            console.log(err);
        }
    }, [buktiMutasiDinas])

    const uploadFile1 = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'pageSheet',
                type: [DocumentPicker.types.pdf],
            });
            if (response[0].type != "application/pdf") {
                Toast.showError("Maaf Harus .Pdf")
            } else {
                setKeteranganKeluar(response);
            }
        } catch (err) {
            Toast.showError("gagal mendapatkan file")
            console.log(err);
        }
    }, [keteranganKeluar])

    const uploadFile2 = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'pageSheet',
                type: [DocumentPicker.types.pdf],
            });
            if (response[0].type != "application/pdf") {
                Toast.showError("Maaf Harus .Pdf")
            } else {
                setRaportAsli(response);
            }
        } catch (err) {
            Toast.showError("gagal mendapatkan file")
            console.log(err);
        }
    }, [raportAsli])

    const uploadFile3 = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'pageSheet',
                type: [DocumentPicker.types.pdf],
            });
            if (response[0].type != "application/pdf") {
                Toast.showError("Maaf Harus .Pdf")
            } else {
                setFotoCopyRaport(response);
            }
        } catch (err) {
            Toast.showError("gagal mendapatkan file")
            console.log(err);
        }
    }, [fotoCopyRaport])

    const uploadFile4 = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'pageSheet',
                type: [DocumentPicker.types.pdf],
            });
            if (response[0].type != "application/pdf") {
                Toast.showError("Maaf Harus .Pdf")
            } else {
                setFotoCopySertifikat(response);
            }
        } catch (err) {
            Toast.showError("gagal mendapatkan file")
            console.log(err);
        }
    }, [fotoCopySertifikat])

    const uploadFile5 = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'pageSheet',
                type: [DocumentPicker.types.pdf],
            });
            if (response[0].type != "application/pdf") {
                Toast.showError("Maaf Harus .Pdf")
            } else {
                setSuratRekomendasiSekolah(response);
            }
        } catch (err) {
            Toast.showError("gagal mendapatkan file")
            console.log(err);
        }
    }, [suratRekomendasiSekolah])

    const uploadFile6 = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'pageSheet',
                type: [DocumentPicker.types.pdf],
            });
            if (response[0].type != "application/pdf") {
                Toast.showError("Maaf Harus .Pdf")
            } else {
                setSuratRekomendasiJendral(response);
            }
        } catch (err) {
            Toast.showError("gagal mendapatkan file")
            console.log(err);
        }
    }, [suratRekomendasiJendral])

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
                            value={user.nama}
                            wrapperStyle={{ backgroundColor: color.themeGray, borderColor: color.themeGray }}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>NIS</Text>
                        <TextInputIcon
                            editable={false}
                            value={user.nisn}
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
                        {/* <UploadImageView
                            useCamera={false}
                            type="image"
                            onSelectImage={(e) => {
                                setBuktiMutasiDinas(e)
                            }}
                        /> */}
                        {/* <UploadImageView
                            useCamera={false}
                            type="image"
                            onSelectImage={(e) => {
                                setKeteranganKeluar(e)
                            }}
                        /> */}
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <TextInputIcon
                                    editable={false}
                                    value={buktiMutasiDinas[0]?.name}
                                    inputStyle={{ flex: 1 }}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                uploadFile()
                            }} style={[styles.inputContainer]}>
                                <Text style={[styles.txtGlobalBold, { color: color.primary, fontSize: 12 }]}>{buktiMutasiDinas[0]?.name == undefined ? "Upload" : "Edit "} File</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Keterangan Keluar/Pindah Sekolah Asal</Text>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <TextInputIcon
                                    editable={false}
                                    value={keteranganKeluar[0]?.name}
                                    inputStyle={{ flex: 1 }}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                uploadFile1()
                            }} style={[styles.inputContainer]}>
                                <Text style={[styles.txtGlobalBold, { color: color.primary, fontSize: 12 }]}>{keteranganKeluar[0]?.name == undefined ? "Upload" : "Edit "} File</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Raport Asal</Text>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <TextInputIcon
                                    editable={false}
                                    value={raportAsli[0]?.name}
                                    inputStyle={{ flex: 1 }}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                uploadFile2()
                            }} style={[styles.inputContainer]}>
                                <Text style={[styles.txtGlobalBold, { color: color.primary, fontSize: 12 }]}>{raportAsli[0]?.name == undefined ? "Upload" : "Edit "} File</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Fotocopy Raport</Text>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <TextInputIcon
                                    editable={false}
                                    value={fotoCopyRaport[0]?.name}
                                    inputStyle={{ flex: 1 }}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                uploadFile3()
                            }} style={[styles.inputContainer]}>
                                <Text style={[styles.txtGlobalBold, { color: color.primary, fontSize: 12 }]}>{fotoCopyRaport[0]?.name == undefined ? "Upload" : "Edit "} File</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Fotocopy Sertifikat</Text>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <TextInputIcon
                                    editable={false}
                                    value={fotoCopySertifikat[0]?.name}
                                    inputStyle={{ flex: 1 }}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                uploadFile4()
                            }} style={[styles.inputContainer]}>
                                <Text style={[styles.txtGlobalBold, { color: color.primary, fontSize: 12 }]}>{fotoCopySertifikat[0]?.name == undefined ? "Upload" : "Edit "} File</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Surat Rekomendasi Sekolah</Text>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <TextInputIcon
                                    editable={false}
                                    value={suratRekomendasiSekolah[0]?.name}
                                    inputStyle={{ flex: 1 }}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                uploadFile5()
                            }} style={[styles.inputContainer]}>
                                <Text style={[styles.txtGlobalBold, { color: color.primary, fontSize: 12 }]}>{suratRekomendasiSekolah[0]?.name == undefined ? "Upload" : "Edit "} File</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Surat Rekomendasi Jendral Dikdasmen</Text>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <TextInputIcon
                                    editable={false}
                                    value={suratRekomendasiJendral[0]?.name}
                                    inputStyle={{ flex: 1 }}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                uploadFile6()
                            }} style={[styles.inputContainer]}>
                                <Text style={[styles.txtGlobalBold, { color: color.primary, fontSize: 12 }]}>{suratRekomendasiJendral[0]?.name == undefined ? "Upload" : "Edit "} File</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>
                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button
                        loading={isLoading} activeOpacity={1} onPress={() => {
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
    txtGlobal: {
        fontSize: 13, fontFamily: fonts.inter
    },
    txtGlobalBold: {
        fontSize: 15, fontFamily: fonts.interBold
    },
    inputContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: color.primary,
        width: 100,
        marginLeft: 12,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        borderStyle: 'dashed',
        position: 'relative',
    },
}