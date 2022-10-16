import React from 'react';
import { View, StyleSheet } from 'react-native';
import { showMessage } from 'react-native-flash-message';

//@ts-ignore
import Icon from 'react-native-vector-icons/Entypo';
import { store } from '../store';

export default {
    showError: (message, duration = 3000, isGlobal = true) => {
        let obj = {
            icon: 'danger',
            message: message,
            type: 'danger',
            duration: duration,
            titleStyle: {
                color: '#fff',
                paddingTop: 30,
                paddingLeft: 10,
            },
            renderFlashMessageIcon: () => (
                <View style={styles.closeButton}>
                    <Icon name="cross" size={10} color={'#e74c3c'} />
                </View>
            ),
        };

        if (isGlobal) {
            showMessage(obj);
        } else {
            let home = store.getState().homeMessage;
            home.showMessage(obj);
        }
    },
    showSuccess: (message, duration = 3000, isGlobal = true) => {
        let obj = {
            icon: 'success',
            message: message,
            type: 'success',
            duration: duration,
            titleStyle: {
                color: '#fff',
                paddingTop: 30,
                paddingLeft: 10,
            },
            renderFlashMessageIcon: () => (
                <View style={styles.checkButton}>
                    <Icon name="check" size={10} color={'#2ecc71'} />
                </View>
            ),
        };

        if (isGlobal) {
            showMessage(obj);
        } else {
            let home = store.getState().homeMessage;
            home.showMessage(obj);
        }
    },
};

const styles = StyleSheet.create({
    closeButton: {
        width: 20,
        height: 16,
        borderRadius: 4,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginLeft: 5,
    },

    checkButton: {
        width: 20,
        height: 16,
        borderRadius: 4,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginLeft: 5,
    },
});
