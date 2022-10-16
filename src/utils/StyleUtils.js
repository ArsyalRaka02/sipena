import color from "./color";
import { fonts } from "./fonts";

export default {
    dropdownStyle: {
        containerStyle: {
            backgroundColor: '#000',
            marginBottom: 20,
        },
        boxStyle: {
            backgroundColor: '#000',
            borderColor: color.primary,
        },
        labelStyle: {
            color: '#fff',
        },
        textContentStyle: {
            color: '#fff',
        },
        rightIconStyle: {
            color: '#fff',
        },
        modalRootStyle: {
            backgroundColor: 'rgba(255,255,255,0.5)',
        },
        modalContentStyle: {
            backgroundColor: '#000',
            borderWidth: 1,
            borderColor: color.primary,
        },
        searchWrapperStyle: {
            backgroundColor: '#222',
        },
        searchIconStyle: {
            color: '#fff',
        },
        searchInputStyle: {
            color: '#fff',
        },
        listStyle: {
            backgroundColor: '#000',
        },
        listTextStyle: {
            color: "#fff",
        },
        listTextActiveStyle: {
            color: color.primary,
        },
        multipleConfirmButton: {
    
        },
        multipleConfirmButtonText: {
            
        },
    },

    titleStyle: {
        fontFamily: fonts.montserratBold,
        fontSize: 16,
        marginBottom: 15,
    },
    labelStyle: {
        fontFamily: fonts.montserratReguler,
        fontSize: 14,
        color: color.black50,
        marginBottom: 5,
    },
}