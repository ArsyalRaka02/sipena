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
import { useSelector } from 'react-redux'
import { HttpRequest } from '../utils/http'
import Toast from '../components/Toast'
import responseStatus from '../utils/responseStatus'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function DaftarOsis(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const [isLoading, setIsLoading] = useState([])

    const btnSave = useCallback(() => {
        HttpRequest.daftarOsis(user.data.id).then((res) => {
            if (res.status == responseStatus.INSERT_GAGAL) {
                Toast.showError("id user tidak di temukan")
            } else {
                Toast.showSuccess("Berhasil Daftar silahkan menunngu")
                setTimeout(() => {
                    navigation.goBack()
                }, 300);
            }
        }).catch((err) => {
            Toast.showError("err", err, err.response)
        })
    }, [user])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Daftar Osis</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>NIS</Text>
                        <TextInputIcon
                            value={user.data.nama_lengkap}
                            editable={false}
                            wrapperStyle={{ backgroundColor: color.themeGray, borderColor: color.themeGray }}
                        />
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Nama</Text>
                        <TextInputIcon
                            value={user.data.nisn}
                            editable={false}
                            wrapperStyle={{ backgroundColor: color.themeGray, borderColor: color.themeGray }}
                        />
                    </ScrollView>
                </View>

                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button isLoading={isLoading} activeOpacity={1} onPress={() => {
                        btnSave()
                    }}>
                        Daftar Sekarang
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