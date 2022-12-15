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
import UploadImageView from '../components/UploadImageView'
import Toast from '../components/Toast'
import responseStatus from '../utils/responseStatus'
import { HttpRequest } from '../utils/http'
import Button from '../components/Button'
import Combobox from '../components/Combobox'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function IsiSaldoUniversal(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const [nominal, setNominal] = useState(0)
    const [keterangan, setKeterangam] = useState("")
    const [uploadBukti, setUploadBukti] = useState("")
    const [isLoading, setIsloading] = useState(false)
    const [kategori, selectedKategori] = useState("")
    const [listKategori, setListKategori] = useState([])


    const btnSave = useCallback(() => {
        let formData = new FormData();
        if (kategori == "") {
            return Toast.showError("Kategori tidak boleh kosong")
        }
        if (keterangan == "") {
            return Toast.showError("Keterangan tidak boleh kosong")
        }
        if (nominal == 0) {
            return Toast.showError("Nominal tidak boleh kosong")
        }
        if (uploadBukti == "") {
            return Toast.showError("foto bukti tidak boleh kosong")
        }
        formData.append('siswa_id', user.data.id);
        formData.append('keuangan_kategori_id', kategori);
        formData.append('keterangan', keterangan);
        formData.append('nominal', nominal);
        formData.append('image', {
            name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
            type: 'image/jpeg',
            uri: uploadBukti,
        });
        setIsloading(true)
        HttpRequest.simpanUniversal(formData).then((res) => {
            let data = res.data
            if (data.status == responseStatus.STATUS_ISTIMEWA) {
                Toast.showError(`${data.message}`)
            }
            if (data.status == responseStatus.INSERT_SUKSES) {
                Toast.showSuccess("Berhasil")
                setTimeout(() => {
                    navigation.goBack()
                }, 300);
            }
            if (data.status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Gagal")
            }
            console.log("sadsa", res)
            setIsloading(false)
        }).catch((err) => {
            setIsloading(false)
            Toast.showError("Server Error: ")
            console.log("err", err, err.response)
        })
    }, [nominal, uploadBukti, keterangan, kategori])

    useEffect(() => {
        getListKategori()
    }, [user])

    const getListKategori = useCallback(() => {
        HttpRequest.kategoriUniversal().then((res) => {
            let data = res.data.map((item) => {
                return {
                    id: item.id,
                    label: item.nama
                }
            })
            setListKategori(data)
            console.log("data", data)
        }).catch((err) => {
            setListKategori([])
            console.log("err", err, err.response)
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
                    <Text style={styles.txtHeader}>Isi Saldo</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Kategori</Text>
                        <Combobox
                            value={selectedKategori}
                            placeholder="Silahkan pilih kategori"
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
                                selectedKategori(val);
                            }}
                        />
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Nominal</Text>
                        <TextInputIcon
                            keyboardType='numeric'
                            value={nominal}
                            onChangeText={setNominal}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Keterangan</Text>
                        <TextInputIcon
                            value={keterangan}
                            onChangeText={setKeterangam}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Upload Bukti Transfer</Text>
                        <UploadImageView
                            useCamera={false}
                            type="image"
                            onSelectImage={(e) => {
                                setUploadBukti(e)
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

    txtGlobal: { fontSize: 13, fontFamily: fonts.inter },
    txtGlobalBold: { fontSize: 15, fontFamily: fonts.interBold },
}

