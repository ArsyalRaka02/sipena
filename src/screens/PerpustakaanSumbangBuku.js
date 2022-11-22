import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Combobox from '../components/Combobox'
import Button from '../components/Button'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const listBukuHilang = [
    {
        id: "Unforgettable",
        label: "Unforgettable"
    },
    {
        id: "Unforgettable",
        label: "Unforgettable"
    },
]

export default function PerpustakaanSumbangBuku(props) {
    const navigation = useNavigation()
    const [selectedBuku, setSelectedBuku] = useState(null)
    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Sumbang Buku</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Nama Buku</Text>
                        <TextInputIcon
                            value={"nama buku"}
                        />
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Nama Penulis</Text>
                        <TextInputIcon
                            value={"nama Penulis"}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Kategori Buku</Text>
                        <Combobox
                            value={selectedBuku}
                            placeholder="Silahkan Pilih Buku"
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
                            data={listBukuHilang}
                            onChange={(val) => {
                                setSelectedBuku(val);
                            }}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Jumlah Halaman</Text>
                        <TextInputIcon
                            value={"jumlah halaman"}
                        />
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Bahasa</Text>
                        <TextInputIcon
                            value={"bahasa"}
                        />
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button>
                        Sumbang Sekarang
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
