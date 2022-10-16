import * as types from "./constants.js"

const initialState = {
    user: null,
};

export function user(state = null, action) {
    if (action.type == types.SET_USER) {
        //console.log("reducer", action);
        return action.payload;
    }

    return state;
}

export function splash(state = true, action) {
    if (action.type == types.SET_SPLASH_SCREEN) {
        return action.payload;
    }

    return state;
}

export function cart(state = [], action) {
    if (action.type == types.SET_CART) {
        return action.payload;
    }

    return state;
}

export function customerData(state = null, action) {
    if (action.type == types.SET_CUSTOMER_DATA) {
        return action.payload;
    }

    return state;
}

export function printerId(state = null, action) {
    if (action.type == types.SET_PRINTER_ID) {
        return action.payload;
    }

    return state;
}

export function orderStatusRules(state = {}, action) {
    if (action.type == types.SET_ORDER_STATUS_RULES) {
        return action.payload;
    }

    return state;
}

export function isScreenLocked(state = false, action) {
    if (action.type == types.SET_LOCK_SCREEN) {
        return action.payload;
    }

    return state;
}