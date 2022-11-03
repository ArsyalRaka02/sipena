import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import color from '../utils/color';
import { fonts } from '../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons'

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Profile(props) {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <ScrollView>
                    {/* background */}
                    <View style={styles.containerHeaderBox}>
                        <Image source={require("../assets/sipena/backgroundDashboard.png")} style={{ height: "100%", width: "100%", position: 'absolute', tintColor: color.white }} resizeMode="cover" />
                    </View>


                    {/* foto profile */}
                    <View style={styles.containerHeaderBoxProfile}>
                        <View style={styles.containerProfile}>
                            {/* <Image /> */}
                        </View>
                    </View>
                    <View style={{ backgroundColor: color.black, position: 'absolute', alignSelf: 'center', top: 120 }}>
                        <Text style={[styles.txtGlobalWhite, { alignSelf: 'center' }]}>Saldo Dompent</Text>
                        <Text style={[styles.txtGlobalWhite, { alignSelf: 'center' }]}>RP 200.000</Text>
                        <View style={{ backgroundColor: color.white, alignItems: 'center', marginHorizontal: 20, borderRadius: 8, marginTop: 8 }}>
                            <Text style={[styles.txtIsi, { color: color.primary, paddingVertical: 8, paddingHorizontal: 10 }]}>Isi Saldo</Text>
                        </View>
                    </View>

                    {/* content */}
                    <View style={{ zIndex: 1 }}>
                        <View style={styles.containerBoxWhite}>
                            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                                <Text style={[styles.txtBio, { marginTop: 8, marginBottom: 18 }]}>Biodata</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txtTitle}>NIS</Text>
                                    <View style={{ flex: 1 }} />
                                    <Text style={styles.txtIsi}>ini adalah nis</Text>
                                </View>
                                <View style={styles.underline} />

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txtTitle}>Email</Text>
                                    <View style={{ flex: 1 }} />
                                    <Text style={styles.txtIsi}>ini adalah Email</Text>
                                </View>
                                <View style={styles.underline} />

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txtTitle}>Nama</Text>
                                    <View style={{ flex: 1 }} />
                                    <Text style={styles.txtIsi}>ini adalah Nama</Text>
                                </View>
                                <View style={styles.underline} />

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txtTitle}>Tanggal Lahir</Text>
                                    <View style={{ flex: 1 }} />
                                    <Text style={styles.txtIsi}>ini adalah Tanggal lahir</Text>
                                </View>
                                <View style={styles.underline} />

                                <View style={{ flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
                                    <Text style={styles.txtTitle}>Tempat Tanggal lahir</Text>
                                    <View style={{ flex: 1 }} />
                                    <Text style={styles.txtIsi}>ini adalah tempat tanggal lahir</Text>
                                </View>
                                <View style={styles.underline} />

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txtTitle}>Jenis kelamin</Text>
                                    <View style={{ flex: 1 }} />
                                    <Text style={styles.txtIsi}>ini adalah jenis kelamin</Text>
                                </View>
                                <View style={styles.underline} />

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txtTitle}>Agama</Text>
                                    <View style={{ flex: 1 }} />
                                    <Text style={styles.txtIsi}>ini adalah agama</Text>
                                </View>
                                <View style={styles.underline} />
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txtTitle}>Nama Ibu</Text>
                                    <View style={{ flex: 1 }} />
                                    <Text style={styles.txtIsi}>ini adalah nama ibu</Text>
                                </View>
                                <View style={styles.underline} />

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.txtTitle}>Nama Ayah</Text>
                                    <View style={{ flex: 1 }} />
                                    <Text style={styles.txtIsi}>ini adalah nama ayah</Text>
                                </View>
                                <View style={styles.underline} />

                                <View style={{ marginBottom: 8 }}>
                                    <Text style={styles.txtBio}>Kartu Pelajar</Text>
                                    <View style={styles.boxKartuPelajar}>

                                    </View>
                                </View>

                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 12 }}>
                                    <View style={{ backgroundColor: color.danger, flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 6, alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                                        <Ionicons name="log-out-outline" size={24} color={color.white} />
                                        <Text style={[styles.txtGlobalWhite, { marginLeft: 8 }]}>Keluar</Text>
                                    </View>
                                    <View style={{ flex: 1 }} />
                                </View>

                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View >
    );
}

const styles = {
    container: {
        backgroundColor: "transparent",
        flex: 1,
    },
    containerProfile: {
        backgroundColor: color.gray,
        width: 90,
        height: 90,
        borderRadius: 50,
    },
    containerHeaderBox: {
        height: SCREEN_HEIGHT / 3,
        backgroundColor: color.primary,
    },
    containerHeaderBoxProfile: {
        position: 'absolute', top: 20, alignSelf: 'center', zIndex: 10
    },
    containerBoxWhite: {
        position: 'relative', top: -50, marginHorizontal: 20, zIndex: 100, backgroundColor: color.white, borderRadius: 12, paddingVertical: 18
    },
    txtBio: {
        fontFamily: fonts.interBold, fontSize: 18, color: color.black
    },
    txtTitle: {
        fontFamily: fonts.interBold, fontSize: 14, color: color.black
    },
    txtIsi: {
        fontFamily: fonts.inter, fontSize: 14, color: color.black
    },
    underline: {
        borderBottomWidth: 0.8, borderBottomColor: color.gray, marginVertical: 12
    },
    boxKartuPelajar: {
        backgroundColor: color.gray, width: "100%", height: SCREEN_HEIGHT / 6, borderRadius: 12, marginVertical: 12
    },
    txtGlobalWhite: {
        fontSize: 14, color: color.white, fontFamily: fonts.inter
    }
}