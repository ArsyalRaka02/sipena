import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import color from '../utils/color';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class FacebookButton extends React.Component {
    render() {
        let label = this.props.label;

        if (label == null) {
            label = "Continue with Facebook";
        }

        return (
            <TouchableOpacity
                style={styles.main}
                activeOpacity={0.8}
                onPress={() => {
                    this.props.onPress != null && this.props.onPress();
                }}>
                <MaterialCommunityIcons name="facebook" color={color.white} size={30} />
                <Text style={styles.text}>{label}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        backgroundColor: "#1877F2",
        borderRadius: 7,
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 10,
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
        marginRight: 30,
    }
});

export default FacebookButton