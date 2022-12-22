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
import DatePicker from '../components/DatePicker'
import Button from '../components/Button'
import { useSelector } from 'react-redux'
import Toast from '../components/Toast'
import { HttpRequest } from '../utils/http'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const day = [
    {
        id: 'Senin',
        label: "Senin"
    },
    {
        id: 'Selasa',
        label: "Selasa"
    },
    {
        id: 'Rabu',
        label: "Rabu"
    },
    {
        id: 'Kamis',
        label: "Kamis"
    },
    {
        id: 'Jumat',
        label: "Jumat"
    },
    {
        id: 'Sabtu',
        label: "Sabtu"
    },
    {
        id: 'Minggu',
        label: "Minggu"
    },
]

export default function EditEksul(props) {
    const navigation = useNavigation()
    const { params } = props.route.params
    const user = useSelector(state => state.user);
    const [judul, setJudul] = useState(params.nama)
    const [tanggalPinjaman, setTanggalPinjaman] = useState(new Date())
    const [jamAwal, setJamAwal] = useState(moment(new Date()).format("HH:mm"))
    const [jamAkhir, setJamAkhir] = useState(moment(new Date()).format("HH:mm"))
    const [selectedJam, setSelectedJam] = useState(null)
    const [isLoading, setIsloading] = useState(false)
    const [selectedHari, setSelectedHari] = useState(params.jadwal_hari)

    const btnSave = useCallback(() => {
        let data = {
            // id: params.id,
            id: params.id,
            guru_id: user.data.id,
            nama: judul,
            jam_mulai: jamAwal,
            jadwal_hari: selectedHari,
            pelaksana: user.data.nama_lengkap,
        }
        // console.log("da", data)
        HttpRequest.postEkstrakulikuler(data).then((res) => {
            Toast.showSuccess("Berhasil Edit")
            setTimeout(() => {
                navigation.goBack()
            }, 300);
        }).catch((err) => {
            Toast.showError("Server Error: ")
        })
    }, [judul, jamAkhir, jamAwal, tanggalPinjaman])

    const toggleSetWaktuAwal = useCallback((day) => {
        setJamAwal(day)
    }, [jamAwal])
    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Edit Ekstrakulikuler</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Judul</Text>
                        <TextInputIcon
                            value={judul}
                            onChangeText={setJudul}
                        />

                        <View style={{ height: 20 }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginBottom: 10 }]}>Jam Mulai</Text>
                                <DatePicker
                                    style={{ backgroundColor: color.white }}
                                    mode="time"
                                    format='HH:ss'
                                    displayFormat='HH:ss'
                                    nameLabel="jam mulai"
                                    value={jamAwal}
                                    onChange={(tanggal) => {
                                        toggleSetWaktuAwal(tanggal)
                                    }}
                                />
                            </View>
                            <View style={{ width: 20 }} />
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginBottom: 10 }]}>Pilih Hari</Text>
                                <Combobox
                                    value={selectedHari}
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
                                    data={day}
                                    onChange={(val) => {
                                        setSelectedHari(val);
                                    }}
                                />
                            </View>
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
    txtGlobal: { fontSize: 13, fontFamily: fonts.inter },
    txtGlobalBold: { fontSize: 15, fontFamily: fonts.interBold },
}