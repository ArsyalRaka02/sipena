import React from "react";
import { useSelector } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SideMenu from "./SideMenu";
import SplashScreen from "../screens/SplashScreen";
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";
import UpdateHarga from "../screens/UpdateHarga";
import Profile from "../screens/Profile";
import ListBerita from "../screens/ListBerita";
import ListJadwal from "../screens/ListJadwal";
import ListAbsen from "../screens/ListAbsen";
import ListKeuangan from "../screens/ListKeuangan";
import ListRaport from "../screens/ListRaport";
import ListPinjamFasilitas from "../screens/ListPinjamFasilitas";
import ListPerpustakaan from "../screens/ListPerpustakaan";
import ListKoperasi from "../screens/ListKoperasi";
import IsiSaldo from "../screens/IsiSaldo";
import ListSpp from "../screens/ListSpp";
import ListTabungan from "../screens/ListTabungan";
import ListPembayaranBuku from "../screens/LIstPembayaranBuku";
import SppPembayaran from "../screens/SppPembayaran";
import PembayaranBuku from "../screens/PembayaranBuku";
import PembayaranTabungan from "../screens/PembayaranTabungan";
import Perpustakaan from "../screens/Perpustakaan";
import PerpustakaanKehilanganBuku from "../screens/PerpustakaanKehilanganBuku";
import PerpustakaanKembaliBuku from "../screens/PerpustakaanKembaliBuku";
import PerpustakaanSumbangBuku from "../screens/PerpustakaanSumbangBuku";
import DetailPerpustakaan from "../screens/DetailPerpustakaan";
import KeranjangDetailBuku from "../screens/KeranjangDetailBuku";
import DashboardSemuaList from "../screens/DashboardSemuaList";
import ListOsis from "../screens/ListOsis";
import AnggotaOsis from "../screens/AnggotaOsis";
import DaftarOsis from "../screens/DaftarOsis";
import KegiatanOsis from "../screens/KegiatanOsis";
import ListMutasi from "../screens/ListMutasi";
import ListEkstrakulikuler from "../screens/ListEkstrakulikuler";
import FormMutasi from "../screens/FormMutasi";
import ListJadwalMenu from "../screens/ListJadwalMenu";
import ListSemuaPeminjamFasilitas from "../screens/ListSemuaPeminjamFasilitas";
import ListTataUsaha from "../screens/ListTataUsaha";
import ListFasilitasTU from "../screens/ListFasilitasTU";
import ListMutasiSiswaTU from "../screens/ListMutasiSiswaTU";
import ListMutasiSiswaDetailTU from "../screens/ListMutasiSiswaDetailTU";
import ListPPDB from "../screens/ListPPDB";
import ListPenilaianKepalaSekolah from "../screens/ListPenilaianKepalaSekolah";
import ListMutasiSiswaEditTU from "../screens/ListMutasiSiswaEditTU";
import ListAbsenKepalaSekolah from "../screens/ListAbsenKepalaSekolah";
import ListTransaksiKantin from "../screens/ListTransaksiKantin";
import KantinMenu from "../screens/KantinMenu";
import WithDrawKantin from "../screens/WithDrawKantin";
import TransaksiTambahKantin from "../screens/TransaksiTambahKantin";
import TransaksiEditKantin from "../screens/TransaksiEditKantin";
import QrCodeKantin from "../screens/QrCodeKantin";
import ListPermintaanFasilitasTU from "../screens/ListPermintaanFasilitasTU";
import FasilitasTambahTU from "../screens/FasilitasTambahTU";
import KeuanganSPPTU from "../screens/KeuanganSPPTU";
import DetailSPPTU from "../screens/DetailSPPTU";
import DetailBukuTU from "../screens/DetailBukuTU";
import ListKartuPelajarTU from "../screens/ListKartuPelajarTU";
import EditKartuPelajarTU from "../screens/EditKartuPelajarTU";
import ScreenScanQRCode from "../screens/ScreenScanQRcode";
import ListPembelian from "../screens/ListPembelian";
import DetailBerita from "../screens/DetailBerita";
import DetailKantin from "../screens/DetailKantin";
import QrCodeKoperasi from "../screens/QrCodeKoperasi";
import DetailKoperasi from "../screens/DetailKoperasi";
import ListAbsenPegawai from "../screens/ListAbsenPegawai";
import DetailAbsen from "../screens/DetailAbsen";
import ListTotalKehadiran from "../screens/ListTotalKehadiran";
import IsiSaldoUniversal from "../screens/IsiSaldoUniversal";
import EditKegiatanOsis from "../screens/EditKegiatanOsis";
import Notification from "../screens/Notification";
import ListAbsenGuru from "../screens/ListAbsenGuru";
import LaporanPenjualanKantin from "../screens/LaporanPenjualanKantin";
import ListMenuPerpustakaan from "../screens/ListMenuPerpustakaan";
import KembalikanBukuPerpus from "../screens/KembalikanBukuPerpus";
import ListKatalogBukuPerpus from "../screens/ListKatalogBukuPerpus";
import ListPinjamBukuPerpus from "../screens/ListPinjamBukuPerpus";
import SumbangBukuPerpus from "../screens/SumbangBukuPerpus";
import ListKehilanganBukuPerpus from "../screens/ListKehilanganBukuPerpus";
import EditBukuPerpus from "../screens/EditBukuPerpus";
import TambahBukuPerpus from "../screens/TambahBukuPerpus";
import EditUser from "../screens/EditUser";
import DetailPinjamBuku from "../screens/DetailPinjamBuku";
import DetailKembalikanBuku from "../screens/DetailKembalikanBuku";
import DetailKehilanganBuku from "../screens/DetailKehilanganBuku";
import ListAbsenMonitoring from "../screens/ListAbsenMonitoring";
import ListJadwalSiswa from "../screens/ListJadwalSiswa";
import ListJadwalMenuSiswa from "../screens/ListJadwalMenuSiswa";
import ListJadwalMenuGuru from "../screens/ListJadwalMenuGuru";
import ListJadwalGuru from "../screens/ListJadwalGuru";
import RaportWaliKelas from "../screens/RaportWaliKelas";
import RaportMurid from "../screens/RaportMurid";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthTabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="SplashScreen" tabBar={() => null}>
            <Tab.Screen name="Login" component={Login} options={() => ({ headerShown: false })} />
        </Tab.Navigator>
    );
}

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="AuthTabNavigator" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthTabNavigator" component={AuthTabNavigator} />
        </Stack.Navigator>
    );
}

const HomeNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Dashboard" drawerContent={(props) => {
            return <SideMenu {...props} />
        }}>
            <Drawer.Screen name="Dashboard" component={Dashboard}
                options={() => ({ headerShown: false, unmountOnBlur: true })} />
        </Drawer.Navigator>
    );
}

const DashboardStack = () => {
    return (
        <Stack.Navigator initialRouteName="HomeStack" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="DashboardSemuaList" component={DashboardSemuaList} />
            <Stack.Screen name="Profile" component={Profile} />

            <Stack.Screen name="ListBerita" component={ListBerita} />
            <Stack.Screen name="DetailBerita" component={DetailBerita} />

            <Stack.Screen name="ListAbsenMonitoring" component={ListAbsenMonitoring} />
            <Stack.Screen name="ListJadwalSiswa" component={ListJadwalSiswa} />
            <Stack.Screen name="ListJadwalMenuSiswa" component={ListJadwalMenuSiswa} />
            <Stack.Screen name="ListJadwalMenuGuru" component={ListJadwalMenuGuru} />
            <Stack.Screen name="ListJadwalGuru" component={ListJadwalGuru} />
            <Stack.Screen name="RaportWaliKelas" component={RaportWaliKelas} />
            <Stack.Screen name="RaportMurid" component={RaportMurid} />

            <Stack.Screen name="ListJadwal" component={ListJadwal} />
            <Stack.Screen name="ListJadwalMenu" component={ListJadwalMenu} />
            <Stack.Screen name="ScreenScanQRCode" component={ScreenScanQRCode} />
            <Stack.Screen name="ListPembelian" component={ListPembelian} />

            <Stack.Screen name="DetailAbsen" component={DetailAbsen} />
            <Stack.Screen name="ListTotalKehadiran" component={ListTotalKehadiran} />
            <Stack.Screen name="IsiSaldoUniversal" component={IsiSaldoUniversal} />

            {/* //koperasi */}
            <Stack.Screen name="QrCodeKoperasi" component={QrCodeKoperasi} />
            <Stack.Screen name="DetailKoperasi" component={DetailKoperasi} />

            {/* //tu */}
            <Stack.Screen name="ListSemuaPeminjamFasilitas" component={ListSemuaPeminjamFasilitas} />
            <Stack.Screen name="ListTataUsaha" component={ListTataUsaha} />
            <Stack.Screen name="ListFasilitasTU" component={ListFasilitasTU} />
            <Stack.Screen name="ListMutasiSiswaTU" component={ListMutasiSiswaTU} />
            <Stack.Screen name="ListMutasiSiswaDetailTU" component={ListMutasiSiswaDetailTU} />
            <Stack.Screen name="ListMutasiSiswaEditTU" component={ListMutasiSiswaEditTU} />
            <Stack.Screen name="ListPPDB" component={ListPPDB} />
            <Stack.Screen name="ListPermintaanFasilitasTU" component={ListPermintaanFasilitasTU} />
            <Stack.Screen name="FasilitasTambahTU" component={FasilitasTambahTU} />
            <Stack.Screen name="KeuanganSPPTU" component={KeuanganSPPTU} />
            <Stack.Screen name="DetaillSPPTU" component={DetailSPPTU} />
            <Stack.Screen name="DetailBukuTU" component={DetailBukuTU} />
            <Stack.Screen name="ListKartuPelajarTU" component={ListKartuPelajarTU} />
            <Stack.Screen name="EditKartuPelajarTU" component={EditKartuPelajarTU} />

            <Stack.Screen name="ListAbsenPegawai" component={ListAbsenPegawai} />
            <Stack.Screen name="ListAbsenGuru" component={ListAbsenGuru} />
            <Stack.Screen name="EditKegiatanOsis" component={EditKegiatanOsis} />


            {/* kepalasekolah */}
            <Stack.Screen name="ListPenilaianKepalaSekolah" component={ListPenilaianKepalaSekolah} />
            <Stack.Screen name="ListAbsenKepalaSekolah" component={ListAbsenKepalaSekolah} />

            {/* kantin */}
            <Stack.Screen name="ListTransaksiKantin" component={ListTransaksiKantin} />
            <Stack.Screen name="KantinMenu" component={KantinMenu} />
            <Stack.Screen name="LaporanPenjualanKantin" component={LaporanPenjualanKantin} />
            <Stack.Screen name="WithDrawKantin" component={WithDrawKantin} />
            <Stack.Screen name="TransaksiTambahKantin" component={TransaksiTambahKantin} />
            <Stack.Screen name="TransaksiEditKantin" component={TransaksiEditKantin} />
            <Stack.Screen name="QrCodeKantin" component={QrCodeKantin} />
            <Stack.Screen name="DetailKantin" component={DetailKantin} />

            {/* //Perpustakaan */}
            <Stack.Screen name="ListMenuPerpustakaan" component={ListMenuPerpustakaan} />
            <Stack.Screen name="KembalikanBukuPerpus" component={KembalikanBukuPerpus} />
            <Stack.Screen name="ListKatalogBukuPerpus" component={ListKatalogBukuPerpus} />
            <Stack.Screen name="ListPinjamBukuPerpus" component={ListPinjamBukuPerpus} />
            <Stack.Screen name="SumbangBukuPerpus" component={SumbangBukuPerpus} />
            <Stack.Screen name="ListKehilanganBukuPerpus" component={ListKehilanganBukuPerpus} />
            <Stack.Screen name="EditBukuPerpus" component={EditBukuPerpus} />
            <Stack.Screen name="TambahBukuPerpus" component={TambahBukuPerpus} />
            <Stack.Screen name="DetailPinjamBuku" component={DetailPinjamBuku} />
            <Stack.Screen name="DetailKembalikanBuku" component={DetailKembalikanBuku} />
            <Stack.Screen name="DetailKehilanganBuku" component={DetailKehilanganBuku} />

            {/* profile */}
            <Stack.Screen name="EditUser" component={EditUser} />


            <Stack.Screen name="ListAbsen" component={ListAbsen} />

            <Stack.Screen name="ListKeuangan" component={ListKeuangan} />
            <Stack.Screen name="ListSpp" component={ListSpp} />
            <Stack.Screen name="SppPembayaran" component={SppPembayaran} />
            <Stack.Screen name="ListTabungan" component={ListTabungan} />
            <Stack.Screen name="ListPembayaranBuku" component={ListPembayaranBuku} />
            <Stack.Screen name="PembayaranBuku" component={PembayaranBuku} />
            <Stack.Screen name="PembayaranTabungan" component={PembayaranTabungan} />


            <Stack.Screen name="ListRaport" component={ListRaport} />

            <Stack.Screen name="ListPinjamFasilitas" component={ListPinjamFasilitas} />

            <Stack.Screen name="ListPerpustakaan" component={ListPerpustakaan} />
            <Stack.Screen name="Perpustakaan" component={Perpustakaan} />
            <Stack.Screen name="DetailPerpustakaan" component={DetailPerpustakaan} />
            <Stack.Screen name="KeranjangDetailBuku" component={KeranjangDetailBuku} />
            <Stack.Screen name="PerpustakaanKehilanganBuku" component={PerpustakaanKehilanganBuku} />
            <Stack.Screen name="PerpustakaanKembaliBuku" component={PerpustakaanKembaliBuku} />
            <Stack.Screen name="PerpustakaanSumbangBuku" component={PerpustakaanSumbangBuku} />

            <Stack.Screen name="ListKoperasi" component={ListKoperasi} />

            <Stack.Screen name="IsiSaldo" component={IsiSaldo} />

            <Stack.Screen name="ListOsis" component={ListOsis} />
            <Stack.Screen name="AnggotaOsis" component={AnggotaOsis} />
            <Stack.Screen name="DaftarOsis" component={DaftarOsis} />
            <Stack.Screen name="KegiatanOsis" component={KegiatanOsis} />

            <Stack.Screen name="ListMutasi" component={ListMutasi} />
            <Stack.Screen name="FormMutasi" component={FormMutasi} />
            <Stack.Screen name="ListEkstrakulikuler" component={ListEkstrakulikuler} />

            <Stack.Screen name="Notification" component={Notification} />

            {/* <Stack.Screen name="UpdateHarga" component={UpdateHarga} /> */}
        </Stack.Navigator>
    );
}

const AppContainer = () => {
    const user = useSelector((state) => state.user);
    const splash = useSelector((state) => state.splash);

    if (splash == true) {
        return <SplashScreen />
    }

    if (user != null) {
        return (
            <>
                <NavigationContainer>
                    <Tab.Navigator tabBar={() => null}>
                        <Tab.Screen name="Dashboard" component={DashboardStack} options={() => ({ headerShown: false })} />
                    </Tab.Navigator>
                </NavigationContainer>
            </>
        )
    } else {
        return (
            <NavigationContainer>
                <Tab.Navigator tabBar={() => null}>
                    <Tab.Screen name="Auth" component={AuthNavigator} options={() => ({ headerShown: false })} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}

export default AppContainer;