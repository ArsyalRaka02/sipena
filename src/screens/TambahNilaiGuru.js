import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { useSelector } from 'react-redux'
import { HttpRequest } from '../utils/http'
import responseStatus from '../utils/responseStatus'
import Combobox from '../components/Combobox'
import Button from '../components/Button'
import Toast from '../components/Toast'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const semester = [
    {
        id: "Ganjil",
        label: "Ganjil"
    },
    {
        id: "Genap",
        label: "Genap"
    },
]

export default function TambahNilaiGuru(props) {
    const navigation = useNavigation()

    const user = useSelector(state => state.user);
    const [listSiswa, setListSiswa] = useState([])
    const [listKelas, setListKelas] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedKelas, setSelectedKelas] = useState(null)
    const [selectedSiswa, setSelectedSiswa] = useState(null)
    const [selectedSemester, setSelectedSemester] = useState(null)

    const [nilaiHarian, setNilaiHarian] = useState(0)
    const [nilaiTugas, setNilaiTugas] = useState(0)
    const [nilaiUas, setNilaiUas] = useState(0)
    const [nilaiUts, setNilaiUts] = useState(0)

    useEffect(() => {
        loadKelas()
        loadSiswa()
    }, [selectedKelas])


    const loadKelas = useCallback(() => {
        HttpRequest.listMapel().then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                let result = res.data.data.map((item) => {
                    return {
                        id: item.id,
                        label: item.nama
                    }
                })
                setListKelas(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError(`${res.data.message}`)
            }
            // console.log("res kelas", res.data)
        }).catch((err) => {
            console.log("err", err, err.response)
        })
    }, [listKelas])

    const loadSiswa = useCallback(() => {
        let kelas = selectedKelas
        HttpRequest.listSiswaByKelas(kelas).then((res) => {
            let result = res.data.map((item) => {
                return {
                    id: item.id,
                    label: item.nama_lengkap
                }
            })
            setListSiswa(result)
        }).catch((err) => {
            console.log("err", err, err.response)
        })
    }, [listSiswa, selectedKelas])


    const btnSave = useCallback(() => {
        if (selectedKelas == null) {
            return Toast.showError("tidak boleh kosong kelas")
        }
        if (selectedSiswa == null) {
            return Toast.showError("tidak boleh kosong siswa")
        }
        if (selectedSemester == null) {
            return Toast.showError("tidak boleh kosong semester")
        }
        if (nilaiHarian == 0) {
            return Toast.showError("Nilasi harian tidak boleh kosong")
        }
        if (nilaiHarian == 0) {
            return Toast.showError("Nilasi harian tidak boleh kosong")
        }
        if (nilaiTugas == 0) {
            return Toast.showError("Nilasi tugas tidak boleh kosong")
        }
        if (nilaiUts == 0) {
            return Toast.showError("Nilasi uts tidak boleh kosong")
        }
        if (nilaiUas == 0) {
            return Toast.showError("Nilasi uas tidak boleh kosong")
        }

        let data = {
            kelas_id: selectedKelas,
            mapel_id: user.maper.id,
            siswa_id: selectedSiswa,
            semester: selectedSemester,
            ulangan_harian: nilaiHarian,
            nilai_tugas: nilaiTugas,
            nilai_uts: nilaiUts,
            nilai_uas: nilaiUas,
        }
        setIsLoading(true)
        HttpRequest.tambahNilai(data).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                Toast.showSuccess("Berhasil tambah nilai" + `${selectedSemester}`)
                setTimeout(() => {
                    navigation.goBack()
                }, 300);
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError(`${res.data.message}`)
            }
            if (status == responseStatus.STATUS_ISTIMEWA) {
                Toast.showError(`${res.data.message}`)
            }
            setIsLoading(false)
        }).catch((err) => {
            setIsLoading(false)
            Toast.showError("Server Err:")
        })
    }, [selectedKelas, selectedSiswa, selectedSemester, nilaiHarian, nilaiTugas, nilaiUts, nilaiUas])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Tambah Nilai</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ backgroundColor: color.primaryRGBA, padding: 20, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                        <Text style={[styles.txtGlobalBold, { color: color.primary, fontSize: 16, alignSelf: 'center' }]}>{user.maper.nama}</Text>
                    </View>
                    <View style={{ height: 20 }} />

                    <ScrollView>
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Pilih Kelas</Text>
                        <Combobox
                            value={selectedKelas}
                            placeholder="Silahkan Pilih Kelas"
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
                            data={listKelas}
                            onChange={(val) => {
                                setSelectedKelas(val);
                                loadSiswa()
                            }}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Pilih Siswa</Text>
                        <Combobox
                            value={selectedSiswa}
                            placeholder="Silahkan Pilih Siswa"
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
                                setSelectedSiswa(val);
                            }}
                        />
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Pilih Semester</Text>
                        <Combobox
                            value={selectedSemester}
                            placeholder="Silahkan Pilih Semester"
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
                            data={semester}
                            onChange={(val) => {
                                setSelectedSemester(val);
                            }}
                        />

                        <Text style={styles.label}>Nilai Ulangan Harian</Text>
                        <TextInputIcon
                            placeholder="Ulangan Harian"
                            keyboardType="numeric"
                            value={nilaiHarian}
                            onChangeText={setNilaiHarian} />
                        <Text style={styles.label}>Nilai Tugas</Text>
                        <TextInputIcon
                            placeholder="Ulangan Tugas"
                            keyboardType="numeric"
                            value={nilaiTugas}
                            onChangeText={setNilaiTugas} />
                        <Text style={styles.label}>Nilai Uts</Text>
                        <TextInputIcon
                            placeholder="Ulangan Uts"
                            keyboardType="numeric"
                            value={nilaiUts}
                            onChangeText={setNilaiUts} />
                        <Text style={styles.label}>Nilai Uas</Text>
                        <TextInputIcon
                            placeholder="Ulangan Uas"
                            keyboardType="numeric"
                            value={nilaiUas}
                            onChangeText={setNilaiUas} />
                    </ScrollView>
                </View>
                <View style={{ flexDirection: 'column', paddingHorizontal: 20, backgroundColor: color.white }}>
                    <Button
                        loading={isLoading}
                        onPress={() => {
                            btnSave()
                        }}
                    >
                        Tambahkan Nilai
                    </Button>
                    <View style={{ height: 20 }} />
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
    label: {
        fontSize: 14,
        fontFamily: fonts.interBold,
        marginBottom: 5,
        color: color.black,
        marginVertical: 10
    },
}
