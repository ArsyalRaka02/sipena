import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import color from '../utils/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker"
import moment from 'moment';
import { HttpRequest } from '../utils/http';
import Toast from './Toast';

export default function UploadImageView(props) {
    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const size = props.size ?? 175;

    useEffect(() => {
        setImage(props.value);
    }, [props.value]);

    const pickPhoto = useCallback(() => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
        }).then(image => {
            console.log("Image", image);
            setImage(image.path);

            if (props.onSelectImage) {
                props.onSelectImage(image.path);
            }
        })
    }, []);

    const takePicture = useCallback(() => {
        ImagePicker.openCamera({
            width: 400,
            height: 400,
            cropping: true,
            useFrontCamera: false,
        }).then(image => {
            console.log("Image", image);
            uploadImage(image.path)
            // setImage(image.path);

            // if (props.onSelectImage) {
            //     props.onSelectImage(image.path);
            // }
        })
    }, []);

    const pickVideo = useCallback(() => {
        ImagePicker.openPicker({
            mediaType: "video",
        }).then(image => {
            console.log("Image", image);
            setImage(image.path);

            if (props.onSelectImage) {
                props.onSelectImage(image.path);
            }
        })
    }, []);

    const takeVideo = useCallback(() => {
        ImagePicker.openCamera({
            mediaType: "video",
        }).then(image => {
            console.log("Image", image);
            setImage(image.path);

            if (props.onSelectImage) {
                props.onSelectImage(image.path);
            }
        })
    }, []);

    const uploadImage = useCallback((image) => {
        setIsUploading(true);
        let formData = new FormData();
        formData.append('file', {
            name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
            type: 'image/jpeg',
            uri: image,
            //uri: Platform.OS == "android" ? newImageUri : response.uri.replace('file://', ''),
        });

        HttpRequest.uploadImage(formData).then(res => {
            setIsUploading(false);
            console.log("Response", res, res.data.path);
            let path = res.data.path;
            // setImage(path);

            if (props.onSelectImage) {
                props.onSelectImage(path);
            }
        }).catch(error => {
            console.log("Error", error, error.response);
            Toast.showError('Gagal mengupload gambar');
            setIsUploading(false);
        });
    }, [props.onSelectImage]);

    if (props.renderDisplay != null) {
        return (
            <TouchableOpacity activeOpacity={1}
                onPress={() => {
                    let useCamera = props.useCamera ?? false;
                    let type = props.type ?? "image";

                    if (type == "image") {
                        if (useCamera) {
                            takePicture();
                        } else {
                            pickPhoto();
                        }
                    } else {
                        if (useCamera) {
                            takeVideo();
                        } else {
                            pickVideo();
                        }
                    }
                }}>
                {props.renderDisplay()}
            </TouchableOpacity>
        );
    }

    return (
        <View style={[styles.container, props.containerStyle]}>
            {props.label != null && <Text style={styles.label}>{props.label}</Text>}

            {isUploading && (
                <View style={[styles.inputContainer, { width: size, height: size }, props.wrapperStyle]}>
                    <ActivityIndicator size="large" color={color.black} />
                    <Text style={styles.textUpload}>Uploading...</Text>
                </View>
            )}

            {!isUploading && (
                <>
                    {image != null && (
                        <View style={[styles.imageContainer, { width: size, height: size }]}>
                            <View style={styles.loadingWrapper}>
                                <ActivityIndicator size="small" color={color.black} />
                            </View>

                            <Image source={{ uri: image }} style={styles.image} resizeMode='cover' />

                            <TouchableOpacity style={[styles.buttonDelete, styles.whiteButton]}
                                activeOpacity={1}
                                onPress={() => {
                                    setImage(null);

                                    if (props.onSelectImage) {
                                        props.onSelectImage(null);
                                    }
                                }}>
                                <Ionicons name="trash-outline" size={14} color={color.black} />
                            </TouchableOpacity>
                        </View>
                    )}

                    {image == null && (
                        <TouchableOpacity style={[styles.inputContainer, { width: size, height: size }, props.wrapperStyle]} onPress={() => {
                            let useCamera = props.useCamera ?? false;

                            if (useCamera) {
                                takePicture();
                            } else {
                                pickPhoto();
                            }
                        }}>
                            <Ionicons name="cloud-upload-outline" size={25} color={color.black} />
                            <Text style={styles.textUpload}>Upload Photo</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    label: {
        fontSize: 14,
        color: color.black,
        marginBottom: 5,
    },
    imageContainer: {
        height: 175,
        width: 175,
    },
    loadingWrapper: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        position: "absolute",
        backgroundColor: "#E5E5E5",
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#A5A4A4",
        height: 175,
        width: 175,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        borderStyle: 'dashed',
        position: 'relative',
    },
    overlay: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.5)",

        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    textUpload: {
        fontSize: 14,
        color: color.black,
        textAlign: "center",
        marginTop: 10,
    },
    eyeButton: {
        paddingLeft: 15,
        paddingVertical: 10,
    },

    whiteButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: color.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDelete: {
        position: 'absolute',
        right: 10,
        top: 10,
    }
});