import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, ImageBackground, BackHandler, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Button from '../components/Button'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import app from '../config/app'
import { useDispatch, useSelector } from 'react-redux'
import { setSimpanBuku, setObjBuku } from '../store/actions'
import _, { drop } from 'lodash';
import Toast from '../components/Toast'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function DetailPerpustakaan(props) {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const [arr, setArr] = useState([])
    const list = useSelector(state => state.setSimpanBuku);
    const buku = useSelector(state => state.objBuku);
    const { params } = props.route.params
    const [detail, setDetail] = useState([])
    const [arrBuku, setArrBuku] = useState([])


    useEffect(() => {
        const backAction = () => {
            dispatch(setSimpanBuku(detail));
            navigation.goBack()
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [])

    const btnSave = useCallback(() => {
        // for (jml = 1; jml <= arr.length; jml++) {
        // setArr(list)
        // arr.push(buku)
        arrBuku.push(params)
        let isObj = _.clone(arrBuku)
        let valid = _.concat(isObj, list)
        setDetail(valid)
        // let data = arr
        dispatch(setSimpanBuku(valid));
        // }
        // navigation.navigate("KeranjangDetailBuku")
        console.log("ini data get jml", valid)
        Alert.alert("Informasi", "Berhasil simpan buku di keranjang", [
            {
                text: "oke", onPress: () => {
                    navigation.navigate("KeranjangDetailBuku")
                }
            }
        ])
        // Toast.showSuccess("Berhasil simpan buku di keranjang")
    }, [])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        dispatch(setObjBuku([]));
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Detail Buku</Text>
                </HeaderBack>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <ImageBackground
                            source={{ uri: app.BASE_URL_PICTURE + params.foto }}
                            style={{ height: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH, opacity: 0.2 }}
                        />
                        <View style={{ height: SCREEN_HEIGHT / 2, width: SCREEN_WIDTH, zIndex: 10, position: 'absolute', top: -20 }}>
                            <Image source={{ uri: app.BASE_URL_PICTURE + params.foto }} style={{ height: "100%", width: '100%', opacity: 1 }} resizeMode={"center"} />
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'center', position: 'absolute', zIndex: 20, top: 305, bottom: 0, left: 0, right: 0 }}>
                            <Text numberOfLines={1} style={[styles.txtGlobalBold, { fontSize: 18, color: color.black }]}>{params.nama}</Text>
                            <Text style={[styles.txtGlobal, { fontSize: 14, color: color.black }]}>{params.author}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, backgroundColor: color.white, borderRadius: 12, paddingHorizontal: 40, paddingVertical: 20, marginTop: -40 }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={[styles.txtGlobal, { fontSize: 13, color: color.primary }]}>Kategori</Text>
                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.primary }]}>{params.kategori_nama}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={[styles.txtGlobal, { fontSize: 13, color: color.primary }]}>Bahasa</Text>
                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.primary }]}>{params.bahasa}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <Text style={[styles.txtGlobal, { fontSize: 13, color: color.primary }]}>Halaman</Text>
                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.primary }]}>{params.total_halaman}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'column', padding: 20, borderRadius: 16, backgroundColor: color.white, marginHorizontal: 20, marginTop: 30 }}>
                            <Text style={[styles.txtGlobalBold, { fontSize: 15, color: color.black, marginBottom: 6 }]}>Peraturan Perpustakaan</Text>
                            <View>
                                <Text style={[styles.txtGlobal, { fontSize: 12 }]}>1. Pinjam maksimal 3 buku.</Text>
                                <Text style={[styles.txtGlobal, { fontSize: 12, marginVertical: 4 }]}>2. Durasi peminjaman 1 minggu, lebih dari 1 minggu denda per-hari seribu rupiah.</Text>
                                <Text style={[styles.txtGlobal, { fontSize: 12 }]}>3. Kehilangan buku denda 50rb per-buku.</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: color.white }}>
                        <TouchableOpacity activeOpacity={1} onPress={() => {
                            navigation.navigate("KeranjangDetailBuku")
                        }} style={{ backgroundColor: color.primaryRGBA, paddingHorizontal: 20, paddingVertical: 16, borderRadius: 12, marginRight: 12, alignItems: 'center', justifyContent: 'center' }}>
                            <SimpleLineIcons name="handbag" size={18} color={color.primary} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                        <Button
                            style={{ flex: 1 }}
                            onPress={() => {
                                if (params.stok_buku == 0) {
                                    Alert.alert("Informasi", "Buku sedang kosong/tidak tersedia!!")
                                } else {
                                    btnSave()
                                }
                            }}
                        >
                            Pinjam Buku
                        </Button>
                    </View>
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
