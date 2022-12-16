import * as types from "./constants"

export const setUser = (payload) => (dispatch) => {
    dispatch({
        type: types.SET_USER,
        payload,
    });
};

export const setSplashScreen = (payload) => (dispatch) => {
    dispatch({
        type: types.SET_SPLASH_SCREEN,
        payload,
    });
};

export const setCart = (payload) => (dispatch) => {
    dispatch({
        type: types.SET_CART,
        payload,
    });
};

export const setCustomerData = (payload) => (dispatch) => {
    dispatch({
        type: types.SET_CUSTOMER_DATA,
        payload,
    });
};

export const setPrinterId = (payload) => (dispatch) => {
    dispatch({
        type: types.SET_PRINTER_ID,
        payload,
    });
};

export const setOrderStatusRules = (payload) => (dispatch) => {
    dispatch({
        type: types.SET_ORDER_STATUS_RULES,
        payload,
    });
};

export const setLockScreen = (payload) => (dispatch) => {
    dispatch({
        type: types.SET_LOCK_SCREEN,
        payload,
    });
};

export const setSimpanBuku = (payload) => (dispatch) => {
    dispatch({
        type: types.SET_SIMPAN_BUKU,
        payload
    })
}