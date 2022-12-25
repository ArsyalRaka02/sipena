import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Button from '../components/Button'
import Toast from '../components/Toast'
import { HttpRequest } from '../utils/http'
import { useSelector } from 'react-redux'
import Combobox from '../components/Combobox'
import responseStatus from '../utils/responseStatus'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function EditPenjualan(props) {
    const navigation = useNavigation()
    const { params } = props.route.params
    const user = useSelector(state => state.user);
    const [keterangan, setKeterangan] = useState("")
    const [nominal, setNominal] = useState(params.jumlah_pembelian)
    const [isLoading, setIsloading] = useState(false)
    const [selected, setSelected] = useState(null)
    const [listKantin, setListKantin] = useState([])
    console.log("params", params)

    useEffect(() => {
        loadKoperasi()
    }, [])

    const loadKoperasi = useCallback(() => {
        HttpRequest.getListKoperasi().then((res) => {
            // console.log("ini adalah res Koperasi", res.data)
            let data = res.data
            if (data.status == responseStatus.INSERT_SUKSES) {
                let loop = res.data.data.map((item) => {
                    return {
                        id: item.id,
                        label: item.nama
                    }
                })
                // let filter = res.data.data.filter((item) => item.id == params.koperasi_list_id).map((item) => {
                //     return {
                //         id: item.id,
                //         label: item.nama
                //     }
                // })
                setListKantin(loop)
                // console.log('loop', loop)
            }
            if (data.status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", "Error: " + `${res.data.message}`)
                setListKantin([])
            }
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err kantin", err, err.response)
        })
    }, [listKantin])

    const btnSave = useCallback(() => {
        if (selected == null) {
            return Alert.alert("Informasi", "Nama tidak boleh kosong")
        }
        if (nominal == "") {
            return Alert.alert("Informasi", "Jumlah tidak boleh kosong")
        }
        setIsloading(true)
        // let data = {
        //     id: params.id,
        //     koperasi_list_id: selected,
        //     jumlah_pembelian: nominal
        // }
        let formData = new FormData();
        formData.append('id', params.id);
        formData.append('koperasi_list_id', selected);
        formData.append('jumlah_pembelian', nominal);
        console.log("a", formData)
        HttpRequest.insertPenjualanList(formData).then((res) => {
            // Toast.showSuccess("Berhasil tambah pembelian")
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
            setIsloading(false)
            console.log("ini adalah", res)
        }).catch((err) => {
            setIsloading(false)
            Alert.alert("Informasi", "Server err dari api")
            console.log("err edit kantin", err, err.response)
        })
    }, [selected, nominal])



    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Edit List</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Nama</Text>
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
                            data={listKantin}
                            onChange={(val) => {
                                setSelected(val);
                            }}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Jumlah Pembelian</Text>
                        <TextInputIcon
                            keyboardType="numeric"
                            value={nominal}
                            onChangeText={setNominal}
                        />
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button activeOpacity={1} isLoading={isLoading} onPress={() => {
                        btnSave()
                    }} >
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
