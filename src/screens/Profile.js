import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ImageBackground, Image, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import color from '../utils/color';
import { fonts } from '../utils/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons'
import BottomTab from '../components/ButtomTab';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../store/actions"
import moment from 'moment';
import app from '../config/app';
import Rupiah from '../utils/Rupiah'
import Toast from '../components/Toast'
import { HttpRequest } from '../utils/http';
import responseStatus from '../utils/responseStatus';
import RoleResponse from '../utils/RoleResponse';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Profile(props) {
    const user = useSelector(state => state.user);
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [detail, setDetail] = useState({})

    useEffect(() => {
        if (user) {
            loadProfile()
        }
        console.log("user", user)
    }, [user])

    const loadProfile = useCallback(() => {
        let id = user.id
        HttpRequest.getProfile(id).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setDetail(res.data.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Error: " + `${res.data.message}`)
                setDetail({})
            }
            // console.log("user s ", result)
        }).catch((err) => {
            Toast.showError("Server Error: ")
            console.log("err", err, err.response)
        })
    }, [detail])

    const btnCetak = useCallback(() => {
        HttpRequest.getKartuDigitalById(detail.id).then((res) => {
            let result = res.data
            // let status = res.status
            // if (status == responseStatus.INSERT_SUKSES) {
            // }
            // if (status == responseStatus.INSERT_GAGAL) {
            //     Toast.showError("gagal status == 2")
            // }
            Linking.openURL(result.linkGenerate)
            // console.log("re", res)
        }).catch((err) => {
            Toast.showError("Error Server: ")
            console.log("err", err, err.response)
        })
    }, [detail])

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
                        <View style={[styles.containerProfile, { overflow: 'hidden' }]}>
                            {
                                user.role_id == RoleResponse.siswa && (
                                    <Image source={{ uri: app.BASE_URL_PICTURE + detail?.foto_profil }} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                                )
                            }
                            {
                                user.role_id == RoleResponse.guru && (
                                    <Image source={{ uri: app.BASE_URL_PICTURE + detail?.profil_picture }} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                                )
                            }
                            {
                                user.role_id == RoleResponse.walimurid && (
                                    <Image source={{ uri: app.BASE_URL_PICTURE + detail?.foto_profil }} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                                )
                            }
                            {
                                user.role_id == RoleResponse.pegawai && (
                                    <Image source={{ uri: app.BASE_URL_PICTURE + detail?.profil_picture }} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                                )
                            }
                            {/* <Ionicons name="person-outline" size={40} color={color.black} /> */}
                        </View>
                    </View>
                    <View style={{ position: 'absolute', alignSelf: 'center', top: 120 }}>
                        <Text style={[styles.txtGlobalWhite, { alignSelf: 'center', fontSize: 12 }]}>Saldo Dompent</Text>
                        <Text style={[styles.txtGlobalWhite, { alignSelf: 'center', fontFamily: fonts.interBold, fontSize: 18 }]}>{Rupiah.format(user.saldo)}</Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => {
                            navigation.navigate("IsiSaldo")
                        }} style={{ backgroundColor: color.white, alignItems: 'center', marginHorizontal: 20, borderRadius: 8, marginTop: 8 }}>
                            <Text style={[styles.txtIsi, { color: color.primary, paddingVertical: 8, paddingHorizontal: 10 }]}>Isi Saldo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* content */}
                    <View style={{ zIndex: 1 }}>
                        <View style={styles.containerBoxWhite}>
                            <View style={{ flex: 1, paddingHorizontal: 20 }}>
                                {
                                    user.role_id == RoleResponse.siswa && (
                                        <>
                                            <Text style={[styles.txtBio, { marginTop: 4, marginBottom: 18 }]}>Biodata</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>NIS</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.nisn == "" ? "-" : user.nisn}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Email</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.email == "" ? "-" : detail?.email}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Nama</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.nama_lengkap == "" ? "-" : detail?.nama_lengkap}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            {
                                                detail?.is_osis == "Y" && (
                                                    <>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={styles.txtTitle}>Osis</Text>
                                                            <View style={{ flex: 1 }} />
                                                            <Text style={styles.txtIsi}>Anggota Osis</Text>
                                                        </View>
                                                        <View style={styles.underline} />
                                                    </>
                                                )
                                            }

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Tanggal Lahir</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{moment(detail?.tanggal_lahir).format("DD/MM/YYYY")}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
                                                <Text style={styles.txtTitle}>Tempat lahir</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.tempat_lahir == "" ? "-" : detail?.tempat_lahir}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Jenis kelamin</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.jenis_kelamin == "L" ? "Laki - laki" : "Perempuan" ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Agama</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.agama == "" ? "-" : detail?.agama}</Text>
                                            </View>
                                            <View style={styles.underline} />
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Nama Ibu</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.nama_ibu == "" ? "-" : detail?.nama_ibu}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Nama Ayah</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.nama_ayah == "" ? "-" : detail?.nama_ayah}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ marginBottom: 8 }}>
                                                <Text style={styles.txtBio}>Kartu Pelajar</Text>
                                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                                    btnCetak()
                                                }} style={styles.boxKartuPelajar}>
                                                    <Text style={[styles.txtGlobalWhite, { fontSize: 14 }]}>Cetak Kartu Pelajar</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    )
                                }
                                {
                                    user.role_id == RoleResponse.guru && (
                                        <>
                                            <Text style={[styles.txtBio, { marginTop: 4, marginBottom: 18 }]}>Biodata</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>NIP</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.nip ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            {
                                                detail?.is_walikelas == "Y" && (
                                                    <>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={styles.txtTitle}>Walikelas</Text>
                                                            <View style={{ flex: 1 }} />
                                                            <Text style={styles.txtIsi}>{user.kelas.nama}</Text>
                                                        </View>
                                                        <View style={styles.underline} />

                                                    </>
                                                )
                                            }

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Email</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{user.email ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Nama</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.nama_lengkap ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Tanggal Lahir</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{moment(detail?.tanggal_lahir).format("DD/MM/YYYY")}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
                                                <Text style={styles.txtTitle}>Tempat lahir</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.tempat_lahir ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Jenis kelamin</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.jk == "L" ? "Laki - laki" : "Perempuan" ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Agama</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.agama ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} />
                                        </>
                                    )
                                }
                                {
                                    user.role_id == RoleResponse.walimurid && (
                                        <>
                                            <Text style={[styles.txtBio, { marginTop: 4, marginBottom: 18 }]}>Biodata</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Nama</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.nama_lengkap ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Nomor HP</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{user.phone ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Tanggal Lahir</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{moment(detail?.tanggal_lahir).format("DD/MM/YYYY")}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
                                                <Text style={styles.txtTitle}>Tempat lahir</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.tempat_lahir ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Jenis kelamin</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.jenis_kelamin == "L" ? "Laki - laki" : "Perempuan" ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Agama</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.agama ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} />
                                            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Orang Tua Dari</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.user_id ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} /> */}
                                        </>
                                    )
                                }
                                {
                                    user.role_id == RoleResponse.pegawai && (
                                        <>
                                            <Text style={[styles.txtBio, { marginTop: 4, marginBottom: 18 }]}>Biodata</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Nama</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.nama_lengkap ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Nomor HP</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{user.phone ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} /> */}

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Tanggal Lahir</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{moment(detail?.tanggal_lahir).format("DD/MM/YYYY")}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
                                                <Text style={styles.txtTitle}>Tempat lahir</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.tempat_lahir ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} /> */}

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Jenis kelamin</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.gender == "L" ? "Laki - laki" : "Perempuan" ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} />

                                            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Agama</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail?.agama ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} /> */}
                                            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.txtTitle}>Orang Tua Dari</Text>
                                                <View style={{ flex: 1 }} />
                                                <Text style={styles.txtIsi}>{detail.user_id ?? "-"}</Text>
                                            </View>
                                            <View style={styles.underline} /> */}
                                        </>
                                    )
                                }
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 12 }}>
                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                        navigation.navigate("EditUser")
                                    }} style={{ backgroundColor: color.primary, flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 6, alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                                        <Ionicons name="pencil-outline" size={24} color={color.white} />
                                        <Text style={[styles.txtGlobalWhite, { marginLeft: 8 }]}>Edit Username/Password</Text>
                                    </TouchableOpacity>
                                    <View style={{ flex: 1 }} />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 12 }}>
                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                        dispatch(setUser(null));
                                        navigation.popToTop()
                                        navigation.navigate("Auth")
                                    }} style={{ backgroundColor: color.danger, flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 6, alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                                        <Ionicons name="log-out-outline" size={24} color={color.white} />
                                        <Text style={[styles.txtGlobalWhite, { marginLeft: 8 }]}>Keluar</Text>
                                    </TouchableOpacity>
                                    <View style={{ flex: 1 }} />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <BottomTab selected={1} onClick={(event) => {
                    navigation.navigate(event)
                }} />
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.white,
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
        fontFamily: fonts.interBold, fontSize: 16, color: color.black
    },
    txtTitle: {
        fontFamily: fonts.interBold, fontSize: 12, color: color.black
    },
    txtIsi: {
        fontFamily: fonts.inter, fontSize: 13, color: color.black
    },
    underline: {
        borderBottomWidth: 0.8, borderBottomColor: color.gray, marginVertical: 12
    },
    boxKartuPelajar: {
        backgroundColor: color.primary, padding: 12, alignItems: 'center', borderRadius: 8, width: "50%", marginVertical: 12, marginBottom: 24
    },
    txtGlobalWhite: {
        fontSize: 14, color: color.white, fontFamily: fonts.inter
    }
}