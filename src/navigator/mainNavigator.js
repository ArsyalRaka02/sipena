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

            <Stack.Screen name="ListJadwal" component={ListJadwal} />

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