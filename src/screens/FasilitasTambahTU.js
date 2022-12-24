import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { HttpRequest } from '../utils/http'
import Toast from '../components/Toast'
import Button from '../components/Button'
import responseStatus from '../utils/responseStatus'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function FasilitasTambahTU(props) {
    const navigation = useNavigation()

    const [fasilitas, setFasilitas] = useState("")
    const [isLoading, setIsloading] = useState(false)

    const btnSave = useCallback(() => {
        let data = {
            nama: fasilitas
        }
        setIsloading(true)
        HttpRequest.insertListFasilitas(data).then((res) => {
            let result = res.data
            if (result.status == responseStatus.INSERT_SUKSES) {
                // Toast.showSuccess("Berhasil tambah")
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
            }
            if (result.status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${res.data.message}`)
            }
            setIsloading(false)
            console.log("ini adalah result", result)
        }).catch((err) => {
            setIsloading(false)
            Alert.alert("Informasi", "Server Err:")
            console.log("err", err, err.response)
        })
    }, [fasilitas])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Tambah Fasilitas</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        <Text style={styles.label}>Fasilitas</Text>
                        <TextInputIcon
                            placeholder="Username"
                            value={fasilitas}
                            onChangeText={setFasilitas}
                            containerStyle={styles.input} />
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button isLoading={isLoading} activeOpacity={1} onPress={() => {
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
    label: {
        fontSize: 18,
        fontFamily: fonts.interBold,
        marginBottom: 5,
        color: color.primary
    },
}
