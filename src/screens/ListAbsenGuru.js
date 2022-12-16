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
import UploadCamera from '../components/UploadCamera'
import Button from '../components/Button'
import { HttpRequest } from '../utils/http'
import responseStatus from '../utils/responseStatus'
import Toast from '../components/Toast'
import Combobox from '../components/Combobox'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const list = [
    {
        id: "MASUK",
        label: "Masuk"
    },
    {
        id: "SAKIT",
        label: "Sakit"
    },
    {
        id: 'IZIN',
        label: "Izin"
    },
]

export default function ListAbsenGuru(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const [selected, setSelected] = useState(null)
    const [pasFoto, setPasFoto] = useState("")
    const [isLoading, setIsloading] = useState(false)
    const [keterangan, setKeterangan] = useState("")
    const [alasan, setAlasan] = useState("")

    const btnSave = useCallback(() => {
        let formData = new FormData();
        let isValue = "N"
        let isKeterangan = ""
        if (pasFoto == "") {
            return Toast.showError("Maaf foto harus ada")
        }

        if (selected == null) {
            return Toast.showError("Maaf pilih harus ada")
        }
        if (selected != "MASUK") {
            isValue = "Y"
            isKeterangan = keterangan
            if (keterangan == "") {
                return Toast.showError("Maaf keterangan harus ada")
            }
        }

        formData.append('guru_id', user.data.id);
        formData.append('is_izin', isValue);
        formData.append("alasan_izin", selected)
        formData.append("keterangan_izin", isKeterangan)
        formData.append('foto', {
            name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
            type: 'image/jpeg',
            uri: pasFoto,
        });
        setIsloading(true)
        HttpRequest.insertAbsenGuru(formData).then((res) => {
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
            setIsloading(false)
        }).catch((err) => {
            setIsloading(false)
            console.log("err", err, err.response)
        })
    }, [user, pasFoto, alasan, keterangan, selected])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Detail Absen</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ backgroundColor: color.white, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ height: 79, width: 79, marginRight: 16 }}>
                            <Image source={require("../assets/images/warning.png")} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.black, fontSize: 14, marginBottom: 6 }]}>Absen</Text>
                            <Text style={[styles.txtGlobal, { fontSize: 13 }]}>Masukan keterangan jika anda berhalangan hadir</Text>
                        </View>
                    </View>
                    <View style={{ height: 20 }} />

                    <ScrollView>
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Pilih Kondisi</Text>
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
                            data={list}
                            onChange={(val) => {
                                setSelected(val);
                            }}
                        />
                        {/* {
                            selected == "Y" && (
                                <>
                                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Alasan</Text>
                                    <TextInputIcon
                                        value={alasan}
                                        onChangeText={setAlasan}
                                    />
                                </>
                            )
                        } */}
                        {
                            selected != "MASUK" && (
                                <>
                                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Keterangan</Text>
                                    <TextInputIcon
                                        value={keterangan}
                                        onChangeText={setKeterangan}
                                    />
                                </>
                            )
                        }
                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Foto</Text>
                        {/* <UploadImageView
                        useCamera={true}
                        type="image"
                        onSelectImage={(e) => {
                            setPasFoto(e)
                        }}
                    /> */}
                        <UploadCamera
                            useCamera={true}
                            type="image"
                            onSelectImage={(e) => {
                                console.log("get nih", e)
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
                        Absen
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
