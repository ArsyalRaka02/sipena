import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Button from '../components/Button'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListMutasi(props) {
    const navigation = useNavigation()
    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Mutasi</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        <View style={{ backgroundColor: color.white, padding: 14, borderRadius: 12 }}>
                            <Text style={[styles.txtGlobalBold, { fontSize: 15, color: color.black, marginBottom: 16, marginTop: 6 }]}>Prosedur dan syarat mutasi siswa</Text>
                            <Text style={[styles.txtGlobal, { fontSize: 12, color: color.black, marginBottom: 2 }]}>1. Surat Keterangan Keluar/Pindah dari seklah asal yang di tandatangani kepala sekolah</Text>
                            <Text style={[styles.txtGlobal, { fontSize: 12, color: color.black, marginBottom: 2 }]}>2. Tanda Bukti Mutasi Siswa dari Dinas Pendidikan Provinsi
                                Asal (jika berasal dari luar provinsi)</Text>
                            <Text style={[styles.txtGlobal, { fontSize: 12, color: color.black, marginBottom: 2 }]}>3. Surat Rekomendasi Penyaluran dari Deriktorat Jendral
                                Dikdasmen (jika berasal dari sekolah luar negeri) </Text>
                            <Text style={[styles.txtGlobal, { fontSize: 12, color: color.black, marginBottom: 2 }]}>4. Raport Asli</Text>
                            <Text style={[styles.txtGlobal, { fontSize: 12, color: color.black, marginBottom: 2 }]}>5. Fotocopy Raport (bagian biodata siswa, Nilai semester Terakhir)</Text>
                            <Text style={[styles.txtGlobal, { fontSize: 12, color: color.black, marginBottom: 2 }]}>6. Fotocopy sertifikat Akreditasi Sekolah asal</Text>
                            <Text style={[styles.txtGlobal, { fontSize: 12, color: color.black, marginBottom: 2 }]}>7. Surat Rekomendasi Penerimaan dari Sekolah yang dituju</Text>
                        </View>
                    </ScrollView>
                </View>

                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button activeOpacity={1} onPress={() => {
                        navigation.navigate("FormMutasi")
                    }}>
                        Ajukan Mutasi
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
    txtGlobalBold: { fontSize: 15, fontFamily: fonts.interBold }
}