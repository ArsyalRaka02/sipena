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
import { useSelector } from 'react-redux'
import Toast from '../components/Toast'
import Button from '../components/Button';
import RoleResponse from '../utils/RoleResponse'
import responseStatus from '../utils/responseStatus'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function EditUser(props) {
    const navigation = useNavigation()

    const user = useSelector(state => state.user);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const btnSave = useCallback(() => {
        let data = {
            id: user.id,
            username: username,
            password: password
        }
        setIsLoading(true)
        // console.log("user", data)
        HttpRequest.updateProfile(data).then((res) => {
            setIsLoading(false)
            let data = res.data
            if (data.status == responseStatus.INSERT_SUKSES) {
                // setTimeout(() => {
                //     Toast.showSuccess("Berhasil menyimpan perubahan")
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
            if (data.status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${data.message}`)
            }
            console.log("res update", res.data)
        }).catch((err) => {
            setIsLoading(false)
            Alert.alert("Informasi", "Server err dari api")
            console.log("Err", err, err.response)
        })
    }, [user, username, password])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Edit</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Username</Text>
                        <TextInputIcon
                            value={username}
                            onChangeText={setUsername}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Password</Text>
                        <TextInputIcon
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </ScrollView>
                </View>

                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button activeOpacity={1} isLoading={isLoading} onPress={() => {
                        btnSave()
                    }} >
                        Simpan Perubahan
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