import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Linking, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { HttpRequest } from '../utils/http'
import app from '../config/app'
import Toast from "../components/Toast"

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListMutasiSiswaDetailTU(props) {
    const navigation = useNavigation()
    const { params } = props.route.params

    const [detail, setDetail] = useState({})
    const [isLoading, setIsloading] = useState(false)

    useEffect(() => {
        loadData()
    })

    const loadData = useCallback(() => {
        HttpRequest.mutasiSiswaById(params).then((res) => {
            setDetail(res.data)
            console.log("ini adalah detail", res.data)
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err", err, err.response)
        })
    }, [detail])



    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Detail Mutasi</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Nama Siswa</Text>
                        <TextInputIcon
                            editable={false}
                            value={detail.nama_lengkap}
                            wrapperStyle={{ backgroundColor: color.themeGray, borderColor: color.themeGray }}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>NIS</Text>
                        <TextInputIcon
                            editable={false}
                            value={detail.nisn}
                            wrapperStyle={{ backgroundColor: color.themeGray, borderColor: color.themeGray }}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Opsi Mutasi</Text>
                        <TextInputIcon
                            editable={false}
                            value={detail.status}
                            wrapperStyle={{ backgroundColor: color.themeGray, borderColor: color.themeGray }}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Bukti Mutasi Dinas Pendidikan Provinsi Asal</Text>
                        <TouchableOpacity onPress={() => {
                            if (detail.tanda_bukti_mutasi_dispen_provinsi != "" && detail.tanda_bukti_mutasi_dispen_provinsi != null) {
                                Linking.openURL(app.BASE_URL_PICTURE + detail.tanda_bukti_mutasi_dispen_provinsi)
                            } else {
                                Alert.alert("Informasi", "Link tidak tersedia")
                            }
                        }} style={{ backgroundColor: color.primary, width: "30%", alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.white, padding: 6 }]}>Cetak</Text>
                        </TouchableOpacity>

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Keterangan Keluar/Pindah Sekolah Asal</Text>
                        <TouchableOpacity onPress={() => {
                            if (detail.surat_keterangan_pindah_sekolah_asal != "" && detail.surat_keterangan_pindah_sekolah_asal != null) {
                                Linking.openURL(app.BASE_URL_PICTURE + detail.surat_keterangan_pindah_sekolah_asal)
                            } else {
                                Alert.alert("Informasi", "Link tidak tersedia")
                            }
                        }} style={{ backgroundColor: color.primary, width: "30%", alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.white, padding: 6 }]}>Cetak</Text>
                        </TouchableOpacity>

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Raport Asal</Text>
                        <TouchableOpacity onPress={() => {
                            if (detail.raport_asal != "" && detail.raport_asal != null) {
                                Linking.openURL(app.BASE_URL_PICTURE + detail.raport_asal)
                            } else {
                                Alert.alert("Informasi", "Link tidak tersedia")
                            }
                        }} style={{ backgroundColor: color.primary, width: "30%", alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.white, padding: 6 }]}>Cetak</Text>
                        </TouchableOpacity>

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Fotocopy Raport</Text>
                        <TouchableOpacity onPress={() => {
                            if (detail.fotocoy_raport != "" && detail.fotocoy_raport != null) {
                                Linking.openURL(app.BASE_URL_PICTURE + detail.fotocoy_raport)
                            } else {
                                Alert.alert("Informasi", "Link tidak tersedia")
                            }
                        }} style={{ backgroundColor: color.primary, width: "30%", alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.white, padding: 6 }]}>Cetak</Text>
                        </TouchableOpacity>

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Fotocopy Sertifikat</Text>
                        <TouchableOpacity onPress={() => {
                            if (detail.fotocopy_sertifikat != "" && detail.fotocopy_sertifikat != null) {
                                Linking.openURL(app.BASE_URL_PICTURE + detail.fotocopy_sertifikat)
                            } else {
                                Alert.alert("Informasi", "Link tidak tersedia")
                            }
                        }} style={{ backgroundColor: color.primary, width: "30%", alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.white, padding: 6 }]}>Cetak</Text>
                        </TouchableOpacity>

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Surat Rekomendasi Sekolah</Text>
                        <TouchableOpacity onPress={() => {
                            if (detail.surat_rekomendasi_penerimaan != "" && detail.surat_rekomendasi_penerimaan != null) {
                                Linking.openURL(app.BASE_URL_PICTURE + detail.surat_rekomendasi_penerimaan)
                            } else {
                                Alert.alert("Informasi", "Link tidak tersedia")
                            }
                        }} style={{ backgroundColor: color.primary, width: "30%", alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.white, padding: 6 }]}>Cetak</Text>
                        </TouchableOpacity>

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Surat Rekomendasi Jendral Dikdasmen</Text>
                        <TouchableOpacity onPress={() => {
                            if (detail.tanda_bukti_mutasi_dispen_provinsi != "" && detail.tanda_bukti_mutasi_dispen_provinsi != null) {
                                Linking.openURL(app.BASE_URL_PICTURE + detail.tanda_bukti_mutasi_dispen_provinsi)
                            } else {
                                Alert.alert("Informasi", "Link tidak tersedia")
                            }
                        }} style={{ backgroundColor: color.primary, width: "30%", alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.white, padding: 6 }]}>Cetak</Text>
                        </TouchableOpacity>
                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Pas Foto</Text>
                        <TouchableOpacity onPress={() => {
                            if (detail.pas_foto != "" && detail.pas_foto != null) {
                                Linking.openURL(app.BASE_URL_PICTURE + detail.pas_foto)
                            } else {
                                Alert.alert("Informasi", "Link tidak tersedia")
                            }
                        }} style={{ backgroundColor: color.primary, width: "30%", alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.white, padding: 6 }]}>Cetak</Text>
                        </TouchableOpacity>

                    </ScrollView>
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

