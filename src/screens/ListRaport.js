import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { useSelector } from 'react-redux'
import Button from '../components/Button'
import { HttpRequest } from '../utils/http'
import Toast from '../components/Toast'
import responseStatus from '../utils/responseStatus'
import NoData from '../components/NoData'
import Combobox from '../components/Combobox'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListRaport(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const [listRaport, setListRaport] = useState([])
    const [listKelas, setListKelas] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selected, setSelected] = useState(false)
    const [selectedI, setSelectedI] = useState(null)
    const [selectedKelas, setSelectedKelas] = useState(null)
    const isFocused = useIsFocused()
    // const { params, item } = props.route.params

    // console.log("ini ", item)


    useEffect(() => {
        if (isFocused) {
            loadKelas()
            loadData()
        }
    }, [isFocused])

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
                Alert.alert("Informasi", "Server err dari api")
                setListKelas([])
            }
            console.log("res kelas", res.data)
        }).catch((err) => {
            console.log("err", err, err.response)
        })
    }, [listKelas])

    const loadData = useCallback(() => {
        // let siswa_id = params
        let kelas_id = selectedKelas
        let mapel_id = user.maper.id
        setIsLoading(true)
        HttpRequest.nilaiPembelajaranGuruDefault(kelas_id, mapel_id).then((res) => {
            if (res.data.status == responseStatus.INSERT_SUKSES) {
                setListRaport(res.data.data)
            }
            if (res.data.status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${res.data.message}`)
            }
            console.log("ini res raport", res.data)
            setIsLoading(false)
        }).catch((err) => {
            setIsLoading(false)
            Alert.alert("Informasi", "Server Er:")
            console.log("ini err ganjil", err, err.response)
        })
    }, [listRaport, selectedKelas])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Raport Siswa</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ backgroundColor: color.primaryRGBA, padding: 20, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: "center" }}>
                        <Text style={[styles.txtGlobalBold, { color: color.primary, fontSize: 16, alignSelf: 'center' }]}>{user.maper.nama}</Text>
                    </View>
                    <View style={{ height: 20 }} />
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
                            // btnTrigger(val)
                        }}
                    />

                    <View style={{ height: 20 }} />
                    <Button loading={isLoading} onPress={() => {
                        loadData()
                    }}>
                        Cari
                    </Button>
                    <ScrollView>
                        <View style={{ height: 20 }} />
                        {
                            listRaport.length == 0 && (
                                <NoData>Tidak ada data raport</NoData>
                            )
                        }
                        {
                            listRaport.map((item, iRaport) => {
                                let status = ""
                                if (item.semester == "Ganjil") {
                                    status = "Ganjil"
                                }
                                if (item.semester == "Genap") {
                                    status = "Genap"
                                }
                                return (
                                    <>
                                        <Text style={[styles.txtGlobalBold, { color: color.black, marginBottom: 20 }]}>Semester {status}</Text>
                                        <TouchableOpacity activeOpacity={1} onPress={() => {
                                            setSelected(true)
                                            setSelectedI(iRaport)
                                        }}>
                                            <View style={{ backgroundColor: color.white, padding: 20, flexDirection: 'row', borderTopEndRadius: 12, borderTopStartRadius: 12, alignItems: 'center' }}>
                                                <Text style={[styles.txtGlobalBold, { fontSize: 12, flex: 1, color: color.black }]}>{item.nama_mapel}</Text>
                                                <Text style={[styles.txtGlobal, { fontSize: 12 }]}>Nilai: </Text>
                                                <Text style={[styles.txtGlobalBold, { fontSize: 12, color: color.black, marginRight: 10 }]}>{item.nilai_rata}</Text>
                                                <Ionicons name="chevron-down-outline" size={24} color={color.black} />
                                            </View>
                                            {
                                                selected == false && (
                                                    <View style={{ height: 20 }} />
                                                )
                                            }
                                            {
                                                selected == true && (
                                                    <>
                                                        {
                                                            selectedI == iRaport && (
                                                                <>
                                                                    <View style={{ flexDirection: 'column', backgroundColor: color.white }}>
                                                                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, alignContent: 'center', backgroundColor: color.white, borderBottomEndRadius: 12, borderBottomStartRadius: 12, borderTopWidth: 1, borderTopColor: color.black }}>
                                                                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                                                                <Text style={[styles.txtGlobal, { fontSize: 12 }]}>N-Harian</Text>
                                                                                <Text style={[styles.txtGlobalBold, { fontSize: 16 }]}>{item.ulangan_harian}</Text>
                                                                            </View>
                                                                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                                                                <Text style={[styles.txtGlobal, { fontSize: 12 }]}>N-Tugas</Text>
                                                                                <Text style={[styles.txtGlobalBold, { fontSize: 16 }]}>{item.nilai_tugas}</Text>
                                                                            </View>
                                                                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                                                                <Text style={[styles.txtGlobal, { fontSize: 12 }]}>N-UTS</Text>
                                                                                <Text style={[styles.txtGlobalBold, { fontSize: 16 }]}>{item.nilai_uts}</Text>
                                                                            </View>
                                                                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                                                                <Text style={[styles.txtGlobal, { fontSize: 12 }]}>N-UAS</Text>
                                                                                <Text style={[styles.txtGlobalBold, { fontSize: 16 }]}>{item.nilai_uas}</Text>
                                                                            </View>
                                                                        </View>
                                                                        <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                            navigation.navigate("EditNilai", { params: item })
                                                                        }} style={{ marginVertical: 12, paddingHorizontal: 20, backgroundColor: color.primary, width: SCREEN_WIDTH / 4, marginLeft: 20, paddingVertical: 10, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                                                                            <Text style={{ fontSize: 12, color: color.white, }}>Edit Nilai</Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </>
                                                            )
                                                        }
                                                        <View style={{ height: 20 }} />
                                                    </>
                                                )
                                            }
                                        </TouchableOpacity>
                                    </>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View style={{ flexDirection: 'column', paddingHorizontal: 20, backgroundColor: color.white }}>
                    <Button
                        onPress={() => {
                            navigation.navigate("TambahNilaiGuru")
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
}
