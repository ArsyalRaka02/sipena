import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Toast from '../components/Toast'
import { HttpRequest } from '../utils/http'
import responseStatus from '../utils/responseStatus'
import NoData from '../components/NoData'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const tab = [
    {
        name: "Sekolah"
    },
    {
        name: "Kelas"
    }
]

export default function ListJadwalMenu(props) {
    const navigation = useNavigation()
    const [listMapel, setListMapel] = useState([])
    const [selected, setSelected] = useState("Sekolah")

    useEffect(() => {
        loadMapel()
    }, [])

    const loadMapel = useCallback(async () => {
        try {
            let data = await HttpRequest.listMapel()
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListMapel(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Server Error: ")
                setListMapel([])
            }
            console.log("ini list jadwal", result)
        } catch (error) {
            setListMapel([])
            console.log("err", error, error.response)
            Toast.showError("Server Error: ")
        }
    }, [listMapel])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Jadwal</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                        {
                            tab.map((item) => {
                                return (
                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                        setSelected(item.name)
                                    }} style={{ padding: 12, borderRadius: 8, backgroundColor: color.white, alignItems: 'center', flex: 1, marginHorizontal: 10 }}>
                                        <Text style={[styles.txtGlobalBold, { color: selected == item.name ? color.primary : color.black }]}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <View style={{ height: 12 }} />
                    {
                        listMapel.length == 0 && (
                            <>
                                <NoData>Tidak ada Jadwal</NoData>
                            </>
                        )
                    }
                    {
                        listMapel.length > 0 && (
                            listMapel.map((item, iListM) => {
                                return (
                                    <>
                                        <View style={{ backgroundColor: color.primaryRGBA, alignItems: 'center', flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 20, borderRadius: 12 }}>
                                            <Ionicons name={"calendar-outline"} size={24} color={color.primary} />
                                            <Text style={[styles.txtGlobalBold, { color: color.primary, marginLeft: 16 }]}>{item.nama}</Text>
                                        </View>
                                    </>
                                )
                            })
                        )
                    }
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            <ListPelajaran data={[]} />
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

function ListPelajaran({ data }) {
    return (
        <>
            {
                data.length == 0 && (
                    <NoData>Tidak ada jadwal harian</NoData>
                )
            }
            {
                data.length > 0 && (
                    data.map((item, iList) => {
                        <>
                            <View style={{ marginVertical: 12 }}>
                                <Text style={[styles.txtGlobalBold]}>Senin</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 }}>
                                <Text>Matematika</Text>
                                <View style={{ flex: 1 }} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 12 }} />
                                    <Text style={[styles.txtGlobal]}>07.00-09.00</Text>
                                </View>
                            </View>
                        </>
                    })

                )
            }
            {/* <View style={{ marginVertical: 12 }}>
                <Text style={[styles.txtGlobalBold]}>Senin</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 }}>
                <Text>Matematika</Text>
                <View style={{ flex: 1 }} />
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 12 }} />
                    <Text style={[styles.txtGlobal]}>07.00-09.00</Text>
                </View>
            </View> */}
            {/* <View style={{ marginVertical: 12 }}>
                <Text style={[styles.txtGlobalBold]}>Selasa</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 }}>
                <Text>Matematika</Text>
                <View style={{ flex: 1 }} />
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 12 }} />
                    <Text style={[styles.txtGlobal]}>07.00-09.00</Text>
                </View>
            </View>
            <View style={{ marginVertical: 12 }}>
                <Text style={[styles.txtGlobalBold]}>Rabu</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 }}>
                <Text>Matematika</Text>
                <View style={{ flex: 1 }} />
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 12 }} />
                    <Text style={[styles.txtGlobal]}>07.00-09.00</Text>
                </View>
            </View> */}
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
