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
        id: "MASUK",
        label: "masuk"
    },
    {
        id: "KELUAR",
        label: "keluar"
    },
]

export default function FormMutasi(props) {
    const navigation = useNavigation()
    const [isLoading, setIsloading] = useState(false)
    const [selectedOpsi, setSelectedOpsi] = useState(null)
    const [detail, setDetail] = useState({})
    const [buktiMutasiDinas, setBuktiMutasiDinas] = useState([])
    const [keteranganKeluar, setKeteranganKeluar] = useState([])
    const [raportAsli, setRaportAsli] = useState([])
    const [fotoCopyRaport, setFotoCopyRaport] = useState([])
    const [fotoCopySertifikat, setFotoCopySertifikat] = useState([])
    const [suratRekomendasiSekolah, setSuratRekomendasiSekolah] = useState([])
    const [suratRekomendasiJendral, setSuratRekomendasiJendral] = useState([])
    const [pasFoto, setPasFoto] = useState("")
    const user = useSelector(state => state.user);
    const [selected, setSelected] = useState(null)
    const [listSiswa, setListSiswa] = useState([])
    const [listLengkap, setListLengkap] = useState([])
    const [isNis, setNis] = useState("Pilih Nama Siswa")

    console.log("pas", pasFoto)


    const btnSave = useCallback(() => {
        let formData = new FormData();
        if (selectedOpsi == null) {
            return Alert.alert("Informasi", "Opsi harap di pilih")
        }
        if (selected == null) {
            return Alert.alert("Informasi", "Nama Siswa harap di pilih")
        }
        if (pasFoto == "") {
            return Alert.alert("Informasi", "foto pas kosong harap di pilih")
        }
        if (buktiMutasiDinas.length == 0) {
            return Alert.alert("Informasi", "Bukti Mutasi Dinas Pendidikan Provinsi Asal Tidak Boleh Kosong")
        }
        if (keteranganKeluar.length == 0) {
            return Alert.alert("Informasi", "Keterangan Keluar/Pindah Sekolah Asal Tidak Boleh Kosong")
        }
        if (raportAsli.length == 0) {
            return Alert.alert("Informasi", "Raport Asal Boleh Kosong")
        }
        if (fotoCopyRaport.length == 0) {
            return Alert.alert("Informasi", "Fotocopy Raport Tidak Boleh Kosong")
        }
        if (fotoCopySertifikat.length == 0) {
            return Alert.alert("Informasi", "Fotocopy Sertifikat Tidak Boleh Kosong")
        }
        if (suratRekomendasiSekolah.length == 0) {
            return Alert.alert("Informasi", "Surat Rekomendasi Sekolah Tidak Boleh Kosong")
        }
        if (suratRekomendasiJendral.length == 0) {
            return Alert.alert("Informasi", "Surat Rekomendasi Jendral Dikdasmen Tidak Boleh Kosong")
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
        formData.append('image7', {
            name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
            type: 'image/jpeg',
            uri: pasFoto,
        });
        formData.append('siswa_id', selected);
        formData.append('status', selectedOpsi);
        setIsloading(true)
        HttpRequest.mutasiSiswaPost(formData).then((res) => {
            let data = res.data
            if (data.status == responseStatus.STATUS_ISTIMEWA) {
                Alert.alert("Informasi", `${data.message}`)
            }
            if (data.status == responseStatus.INSERT_SUKSES) {
                // Toast.showSuccess("Berhasil")
                // setTimeout(() => {
                //     navigation.goBack()
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
            if (data.status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", "Gagal")
            }
            setIsloading(false)
            console.log("ini hasil res", data)
        }).catch((err) => {
            setIsloading(false)
            Alert.alert("Informasi", "Server err dari api")
            console.log("err", err, err.response)
        })
    }, [
        buktiMutasiDinas, keteranganKeluar, raportAsli,
        fotoCopyRaport, fotoCopySertifikat, suratRekomendasiSekolah,
        suratRekomendasiJendral, isLoading, user, pasFoto, selectedOpsi,
        selected
    ])

    const getFormData = (object) => {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }

    useEffect(() => {
        loadProfile()
        loadData()
    }, [user]);

    const loadProfile = useCallback(() => {
        let id = user.id
        HttpRequest.getProfile(id).then((res) => {
            let result = res.data.data.data
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setDetail(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${res.data.message}`)
                setDetail([])
            }
            console.log("user s ", result)
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err", err, err.response)
        })
    }, [detail])

    const loadData = useCallback(() => {
        HttpRequest.listSiswaByWali(user.data.id).then((res) => {
            let loop = res.data.map((item) => {
                return {
                    id: item.id,
                    label: item.nama_lengkap
                }
            })
            setListSiswa(loop)
            setListLengkap(res.data)
        }).catch((err) => {
            console.log("err", err, err.response)
        })
    }, [listSiswa, listLengkap])

    const uploadFile = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'pageSheet',
                type: [DocumentPicker.types.pdf],
            });
            if (response[0].type != "application/pdf") {
                Alert.alert("Informasi", "Maaf Harus .Pdf")
            } else {
                setBuktiMutasiDinas(response);
            }
            console.log("ini adlaah ", response)
        } catch (err) {
            Alert.alert("Informasi", "gagal mendapatkan file")
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
                Alert.alert("Informasi", "Maaf Harus .Pdf")
            } else {
                setKeteranganKeluar(response);
            }
        } catch (err) {
            Alert.alert("Informasi", "gagal mendapatkan file")
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
                Alert.alert("Informasi", "Maaf Harus .Pdf")
            } else {
                setRaportAsli(response);
            }
        } catch (err) {
            Alert.alert("Informasi", "gagal mendapatkan file")
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
                Alert.alert("Informasi", "Maaf Harus .Pdf")
            } else {
                setFotoCopyRaport(response);
            }
        } catch (err) {
            Alert.alert("Informasi", "gagal mendapatkan file")
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
                Alert.alert("Informasi", "Maaf Harus .Pdf")
            } else {
                setFotoCopySertifikat(response);
            }
        } catch (err) {
            Alert.alert("Informasi", "gagal mendapatkan file")
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
                Alert.alert("Informasi", "Maaf Harus .Pdf")
            } else {
                setSuratRekomendasiSekolah(response);
            }
        } catch (err) {
            Alert.alert("Informasi", "gagal mendapatkan file")
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
                Alert.alert("Informasi", "Maaf Harus .Pdf")
            } else {
                setSuratRekomendasiJendral(response);
            }
        } catch (err) {
            Alert.alert("Informasi", "gagal mendapatkan file")
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
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Nama Siswa</Text>
                        <Combobox
                            value={selected}
                            placeholder="Silahkan Pilih"
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
                            data={listSiswa}
                            onChange={(val) => {
                                setSelected(val);
                                let data = listLengkap.filter((item) => item.id == val).map((item) => {
                                    return item.nisn
                                })
                                setNis(data[0])
                            }}
                        />
                        {/* <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Nama Siswa</Text>
                        <TextInputIcon
                            editable={false}
                            value={user.siswa.nama_lengkap}
                            wrapperStyle={{ backgroundColor: color.themeGray, borderColor: color.themeGray }}
                        /> */}

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>NISN</Text>
                        <TextInputIcon
                            editable={false}
                            value={isNis}
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
                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Pas Foto</Text>
                        <UploadImageView
                            useCamera={false}
                            type="image"
                            onSelectImage={(e) => {
                                setPasFoto(e)
                            }}
                        />

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