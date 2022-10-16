import React, { useCallback, useEffect, useRef, useState } from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,

} from "react-native";
import color from "../utils/color";
import Feather from 'react-native-vector-icons/Feather';
import Timer from 'react-native-timer';
import moment from "moment";
import Video from 'react-native-video';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HeaderSlider(props) {
    const [page, setPage] = useState(0);
    const [galleries, setGalleries] = useState([]);
    const sliderRef = useRef();

    useEffect(() => {
        Timer.setInterval("slider", () => {
            nextSlider();
        }, 3000);

        return () => {
            Timer.clearInterval("slider");
        };
    }, []);

    useEffect(() => {
        setGalleries(props.data);
    }, [props.data]);

    const nextSlider = useCallback(() => {
        const offsets = getOffsets();
        let newPage = page + 1;
        if (newPage === galleries.length - 1) {
            newPage = 0;
        }
        sliderRef.current.scrollTo({ x: offsets[newPage], animated: true });
        setPage(newPage);
    }, [galleries, page]);

    const getOffsets = useCallback(() => {
        return galleries.map((item, index) => {
            if (index == 0) {
                return 0;
            }
            return index * SCREEN_WIDTH;
        });
    }, [galleries, page]);

    return (
        <View style={styles.container}>
            <ScrollView
                ref={sliderRef}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                decelerationRate='fast'>
                {galleries.map((gallery, index) => {
                    if (gallery.type == "video") {
                        return (
                            <TouchableOpacity key={index}
                                activeOpacity={1}
                                style={styles.item}
                                onPress={() => {
                                    let _galleries = [...galleries];
                                    _galleries[index].paused = !_galleries[index].paused;
                                    setGalleries(_galleries);
                                }}>
                                <Video
                                    paused={gallery.paused}
                                    repeat={true}
                                    resizeMode="cover"
                                    style={styles.backgroundVideo}
                                    source={{ uri: gallery.url }}
                                />
                                <View style={styles.videoOverlay}>
                                    {gallery.paused && (
                                        <View style={styles.whiteButton}>
                                            <Feather name='play' size={14} color={color.black} style={{ marginLeft: 2 }} />
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        )
                    } else {
                        return (
                            <View key={index}
                                style={styles.item}>
                                <Image
                                    resizeMode="cover"
                                    style={styles.backgroundVideo}
                                    source={{ uri: gallery.url }}
                                />
                            </View>
                        )
                    }
                })}
            </ScrollView>

            <View style={styles.indicator}>
                {galleries.map((item, index) => {
                    return (
                        <View style={[styles.dot, index == page ? styles.dotActive : null]} key={index} />
                    );
                })}

                <View style={{ flex: 1 }} />

                <View style={styles.stepWrap}>
                    <Text style={styles.step}>{page + 1}/{galleries.length}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
    },
    item: {
        width: SCREEN_WIDTH,
        height: 200,
        overflow: "hidden",
        backgroundColor: "#CCC",
    },
    backgroundVideo: {
        width: '100%',
        height: '100%',
    },
    videoOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: color.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        width: SCREEN_WIDTH - 40,
        // backgroundColor: 'yellow',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#2C2B2B",
        marginRight: 5,
    },
    dotActive: {
        backgroundColor: color.white,
    },
    stepWrap: {
        backgroundColor: "#2C2B2B",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
    },
    step: {
        color: color.white,
        fontSize: 14,
    },
});