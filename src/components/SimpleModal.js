import React, { Component } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

export default function SimpleModal(props) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => {
                props.onRequestClose();
            }} >
            <TouchableOpacity activeOpacity={0.9} onPress={() => {
                props.onRequestClose();
            }} style={styles.modalRoot}>
                <TouchableOpacity activeOpacity={1} style={[styles.modalContent, props.contentStyle]}>
                    {props.children}
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = {
    modalRoot: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        width: 300,
        padding: 16,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
};