import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import color from '../utils/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker"
import moment from 'moment';
import { HttpRequest } from '../utils/http';
import Toast from './Toast';
import { useNavigation } from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';
import ImageResizer from 'react-native-image-resizer';


export default function UploadCamera(props) {
    const navigation = useNavigation();
    const cameraRef = useRef();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showCaptureButton, setShowCaptureButton] = useState(false);

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
            cropping: false
        }).then(image => {
            console.log("Image", image);
            setImage(image.path);

            if (props.onSelectImage) {
                props.onSelectImage(image.path);
            }
        })
    }, []);

    const takePicture = useCallback(() => {
        setIsModalVisible(true);

        setShowCaptureButton(false);

        setTimeout(() => {
            setShowCaptureButton(true);
        }, 5000);
        return;

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
        }).catch(err => {
            console.log("TakePictureError", err);
            Toast.showError("Error Take Picture");
        });
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
        // setIsUploading(true);
        // setImage(image.path);
        // if (props.onSelectImage) {
        //     props.onSelectImage(image.path);
        // }
        // let formData = new FormData();
        // formData.append('file', {
        //     name: 'image-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.jpg',
        //     type: 'image/jpeg',
        //     uri: image,
        //     //uri: Platform.OS == "android" ? newImageUri : response.uri.replace('file://', ''),
        // });

        // if (props.onSelectImage) {
        //     props.onSelectImage(path);
        // }

        // HttpRequest.postImage(formData).then(res => {
        //     setIsUploading(false);
        //     console.log("Response", res, res.data.url);
        //     let path = res.data.url;
        //     setImage(path);

        //     if (props.onSelectImage) {
        //         props.onSelectImage(path);
        //     }
        // }).catch(error => {
        //     console.log("Error", error, error.response);
        //     Toast.showError('Gagal mengupload gambar');
        //     setIsUploading(false);
        // });
    }, [props.onSelectImage]);

    const takePictureAsync = useCallback(async () => {
        console.log("Camera", cameraRef.current);
        if (cameraRef.current) {
            const options = { quality: 1, base64: false };
            const data = cameraRef.current.takePictureAsync(options);

            setIsModalVisible(false);

            ImageResizer.createResizedImage(data.uri, 1000, 1000, 'JPEG', 100, 0)
                .then(response => {
                    uploadImage(response.uri);

                    // response.uri is the URI of the new image that can now be displayed, uploaded...
                    // response.path is the path of the new image
                    // response.name is the name of the new image with the extension
                    // response.size is the size of the new image
                })
                .catch(err => {
                    // Oops, something went wrong. Check that the filename is correct and
                    // inspect err to get more details.
                    Toast.showError("Gagal mengkompresi gambar c");
                });
        }
    }, [cameraRef.current]);

    const takePictureCamera = useCallback(async (camera) => {
        console.log("takePictureCamera", camera);
        const options = { quality: 1, base64: true };
        const data = await camera.takePictureAsync(options);
        //  eslint-disable-next-line
        console.log(data.uri);

        setIsModalVisible(false);
        setImage(data.uri);
        ImageResizer.createResizedImage(data.uri, 1000, 1000, 'JPEG', 100, 0)
            .then(response => {
                if (props.onSelectImage) {
                    props.onSelectImage(response.uri);
                }
                // uploadImage(response.uri);
                // response.uri is the URI of the new image that can now be displayed, uploaded...
                // response.path is the path of the new image
                // response.name is the name of the new image with the extension
                // response.size is the size of the new image
            })
            .catch(err => {
                // Oops, something went wrong. Check that the filename is correct and
                // inspect err to get more details.
                Toast.showError("Gagal mengkompresi gambar t", err);
            });

        // uploadImage(data.uri);
    }, []);


    const renderModal = useCallback(() => {
        return (
            <Modal visible={isModalVisible} transparent={true} onRequestClose={() => { setIsModalVisible(false) }}>
                <View style={styles.modal}>
                    <RNCamera
                        ref={cameraRef}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.front}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}>
                        {({ camera, status, recordAudioPermissionStatus }) => {
                            if (status !== 'READY') return null;

                            if (showCaptureButton) {
                                return (
                                    <TouchableOpacity onPress={() => takePictureCamera(camera)} style={styles.capture}>
                                        <View style={styles.captureInternal} />
                                    </TouchableOpacity>
                                );
                            }

                            return (
                                <View style={styles.capture}>
                                    <ActivityIndicator size='large' color={color.white} />
                                </View>
                            );
                        }}
                    </RNCamera>

                    {/* {showCaptureButton && (
                        <TouchableOpacity onPress={takePictureAsync} style={styles.capture}>
                            <View style={styles.captureInternal} />
                        </TouchableOpacity>
                    )} */}
                </View>
            </Modal>
        );
    }, [isModalVisible, showCaptureButton]);

    if (props.renderDisplay != null) {
        return (
            <>
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
                {renderModal()}
            </>
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

            {renderModal()}
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
        fontSize: 12,
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
    },

    modal: {
        flex: 1,
        backgroundColor: color.gray,
    },
    preview: {
        flex: 1,
        backgroundColor: color.white,
    },
    capture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: color.white,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: Dimensions.get('window').width / 2 - 25,
    },
    captureInternal: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: color.white,
    },
});