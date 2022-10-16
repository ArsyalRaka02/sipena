import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import color from '../utils/color';

class GoogleButton extends React.Component {
    render() {
        let label = this.props.label;

        if (label == null) {
            label = "Sign in with Google";
        }

        return (
            <TouchableOpacity
                style={styles.main}
                activeOpacity={0.8}
                onPress={() => {
                    this.props.onPress != null && this.props.onPress();
                }}>
                <Image source={require('../assets/images/icon-google.png')} style={styles.image} />
                <Text style={styles.text}>{label}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        backgroundColor: "#4285F4",
        borderRadius: 7,
        alignItems: 'center',
    },
    image: {
        width: 46,
        height: 46,
    },
    text: {
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginRight: 50,
    }
});

export default GoogleButton