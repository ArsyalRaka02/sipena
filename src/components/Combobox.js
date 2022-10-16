import React, { Component, useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, Modal, ScrollView, StyleSheet, TouchableOpacity, View, Platform, Text, TextInput } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import _ from 'lodash';
import NoData from './NoData';
import defaultTheme from './Theme';
import color from '../utils/color';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Combobox(props) {
    let selectedValue = props.value;
    let data = props.data;
    let onChange = props.onChange;
    let newTheme = props.theme;
    let renderDisplay = props.renderDisplay;
    let showSearchBar = props.showSearchBar ?? false;
    let isShowLeftIcons = props.showLeftIcons ?? false;
    let jenisIcons = props.jenisIcons ?? "MaterialCommunityIcons";
    let jenisIconsRight = props.jenisIconsRight ?? "MaterialCommunityIcons";

    const [isShowPicker, setShowPicker] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [filteredData, setFilteredData] = useState(data);
    const [theme, setTheme] = useState({});

    useEffect(() => {
        //load theme on load
        const _newT = _.merge(defaultTheme, newTheme);
        //console.log('_newT', _newT);
        setTheme(_newT);
    }, [newTheme]);

    useEffect(() => {
        chooseByValue(selectedValue);
    }, [data, selectedValue]);

    useEffect(() => {
        let _data = [...data];

        //search data by keyword
        let result = _data.filter(item => {
            if (getLabel(item).toLowerCase().indexOf(search.toLowerCase()) > -1) {
                return item;
            }
        });
        setFilteredData(result);
    }, [data, search]);

    const chooseByValue = useCallback((newValue) => {
        if (data && data.length > 0) {
            data.forEach((item, key) => {
                let itemVal = getValue(item);
                if (itemVal == newValue) {
                    console.log("OK Selected");
                    onChange(itemVal);
                    setSelectedItem(item);
                }
            });
        }
    }, [data, onChange]);

    const getValue = useCallback((item) => {
        return item.id;
    }, []);

    const getLabel = useCallback((item) => {
        return item.label;
    }, []);

    const openPicker = useCallback(() => {
        setShowPicker(true);
    }, []);

    const modalContent = useMemo(() => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={isShowPicker}
                onRequestClose={() => setShowPicker(false)}>
                <TouchableOpacity
                    onPress={() => setShowPicker(false)}
                    activeOpacity={1}
                    style={[styles.modalRoot, theme.modalRootStyle]}>
                    <View style={[styles.modalContent, theme.modalContentStyle]}>
                        {showSearchBar == true && (
                            <View style={[styles.searchBarStyle, theme.searchWrapperStyle]}>
                                <MaterialIcons
                                    name='search'
                                    size={24}
                                    style={[styles.searchIcon, theme.searchIconStyle]}
                                />
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <TextInput
                                        onChangeText={(term) => {
                                            setSearch(term);
                                        }}
                                        value={search}
                                        style={[styles.searchInput, theme.searchInputStyle]}
                                        placeholder={"Search "}
                                        placeholderTextColor={props.placeholderTextColor}
                                    />
                                </View>
                            </View>
                        )}
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            // style={{ flex:1, alignSelf:'center' }}
                            keyboardShouldPersistTaps='handled'>
                            {filteredData.length == 0 && (
                                <NoData>No Data Available</NoData>
                            )}
                            {filteredData.map((item, index) => {
                                let styleModalItem = styles.modalItem;
                                if (filteredData.length - 1 == index) {
                                    styleModalItem = styles.modalItemNoBorder;
                                }
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styleModalItem, theme.listStyle]}
                                        onPress={() => {
                                            setShowPicker(false);
                                            onChange(getValue(item));
                                            setSelectedItem(item);
                                        }}>
                                        <Text style={[styles.modalText, theme.listTextStyle]}>{getLabel(item)}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }, [isShowPicker, theme, search, filteredData, onChange, getValue, getLabel]);

    if (renderDisplay != null) {
        return (
            <>
                <TouchableOpacity onPress={openPicker} activeOpacity={0.8}>
                    {renderDisplay()}
                </TouchableOpacity>

                {modalContent}
            </>
        );
    }

    return (
        <View style={[styles.container, theme.containerStyle]}>

            {
                props.label != null && (
                    <Text style={[styles.label, theme.labelStyle]}>{props.label}</Text>
                )
            }
            {
                isShowLeftIcons == true && (
                    <>
                        <TouchableOpacity onPress={openPicker}
                            activeOpacity={0.7}
                            style={[styles.pickerWrapper, theme.boxStyle]}>

                            {
                                jenisIcons == "MaterialCommunityIcons" && (
                                    <MaterialCommunityIcons name={props.iconName} size={20} style={[styles.leftIcon, theme.leftIconStyle]} />
                                )
                            }
                            {
                                jenisIcons == "FontAwesome5" && (
                                    <FontAwesome5 name={props.iconName} size={20} style={[styles.leftIcon, theme.leftIconStyle]} />
                                )
                            }
                            {
                                jenisIcons == "Ionicons" && (
                                    <Ionicons name={props.iconName} size={20} style={[styles.leftIcon, theme.leftIconStyle]} />
                                )
                            }
                            <Text style={[styles.textContent, theme.textContentStyle]}>{selectedItem ? selectedItem.label : '(Please Select)'}</Text>
                            {
                                jenisIconsRight == "MaterialCommunityIcons" && (
                                    <MaterialCommunityIcons name={props.iconNameRight} size={20} style={[styles.rightIcon, theme.rightIconStyle]} />
                                )
                            }
                            {
                                jenisIconsRight == "FontAwesome5" && (
                                    <FontAwesome5 name={props.iconNameRight} size={20} style={[styles.rightIcon, theme.rightIconStyle]} />
                                )
                            }
                            {
                                jenisIconsRight == "Ionicons" && (
                                    <Ionicons name={props.iconNameRight} size={20} style={[styles.rightIcon, theme.rightIconStyle]} />
                                )
                            }
                        </TouchableOpacity>
                    </>
                )
            }

            {
                isShowLeftIcons == false && (
                    <>
                        <TouchableOpacity onPress={openPicker}
                            activeOpacity={0.7}
                            style={[styles.pickerWrapper, theme.boxStyle]}>
                            <Text style={[styles.textContent, theme.textContentStyle]}>{selectedItem ? selectedItem.label : '(Please Select)'}</Text>
                            {
                                jenisIconsRight == "MaterialCommunityIcons" && (
                                    <MaterialCommunityIcons name={props.iconNameRight} size={20} style={[styles.rightIcon, theme.rightIconStyle]} />
                                )
                            }
                            {
                                jenisIconsRight == "FontAwesome5" && (
                                    <FontAwesome5 name={props.iconNameRight} size={20} style={[styles.rightIcon, theme.rightIconStyle]} />
                                )
                            }
                            {
                                jenisIconsRight == "Ionicons" && (
                                    <Ionicons name={props.iconNameRight} size={20} style={[styles.rightIcon, theme.rightIconStyle]} />
                                )
                            }
                        </TouchableOpacity>
                    </>
                )
            }


            {/* {(props.error != "" && props.error != null) && (
                <Text style={styles.errorText}>{props.error}</Text>
            )} */}

            {modalContent}
        </View>
    );
}

const styles = {
    container: {
        //backgroundColor: 'blue',
    },
    pickerWrapper: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 8,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    label: {
        color: '#000',
        marginBottom: 5,
        fontSize: 14,
    },
    searchInput: {
        marginLeft: 10,
    },
    searchBarStyle: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#eee',
        borderRadius: 5
    },
    textContent: {
        fontSize: 16,
        flex: 1,
    },
    rightIcon: {
        color: '#000',
    },
    leftIcon: {
        color: '#000',
    },
    searchIcon: {
        color: '#000',
    },

    modalRoot: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        maxWidth: 500,
        width: SCREEN_WIDTH - 32,
        borderRadius: 5,
        backgroundColor: '#fff',
        padding: 10,
        maxHeight: SCREEN_HEIGHT - 100
    },
    modalItem: {
        paddingVertical: 10,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        paddingHorizontal: 5,
    },
    modalItemNoBorder: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    modalText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '500'
    }
};