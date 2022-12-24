import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { user, splash, cart, customerData, printerId, orderStatusRules, isScreenLocked, setSimpanBuku, objBuku } from './reducers';

const config = {
    key: 'primary',
    storage: AsyncStorage,
    whitelist: ['user', 'cart', 'customerData', 'printerId', 'orderStatusRules', 'isScreenLocked', 'setSimpanBuku', 'objBuku'],
};

const store = createStore(
    persistCombineReducers(config, { user, splash, cart, customerData, printerId, orderStatusRules, isScreenLocked, setSimpanBuku, objBuku }),
    undefined,
    compose(applyMiddleware(thunk)),
);

export { store };