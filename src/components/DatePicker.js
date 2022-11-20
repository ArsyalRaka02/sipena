import React, { Component, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    Modal,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import moment from 'moment';
import Color from '../utils/color';
// import Styles from '../utility/Style';
import { Calendar } from 'react-native-calendars';
import SimpleModal from './SimpleModal';
import Button from './Button';
import color from '../utils/color';

const defaultDate = moment().format("YYYY-MM-DD");
const defaultYear = moment().format("YYYY");

export default function DatePicker(props) {
    const mode = props.mode || 'date';
    const format = props.format || 'YYYY-MM-DD';
    const displayFormat = props.displayFormat || 'DD MMM YYYY';
    const value = props.value;

    const [show, setShow] = useState(false);
    const [currentDate, setCurrentDate] = useState(defaultDate);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentYear, setCurrentYear] = useState(defaultYear);
    const [hour, setHour] = useState(null);
    const [minute, setMinute] = useState(null);
    const [hourString, setHourString] = useState(null);
    const [minuteString, setMinuteString] = useState(null);
    const [display, setDisplay] = useState('date');
    const [markedDates, setMarkedDates] = useState({});

    const [arrayYear, setArrayYear] = useState([]);
    const [yearIndex, setYearIndex] = useState(0);

    const scrollRef = useRef(null);

    const icon = useMemo(() => {
        return mode === 'date' ? 'calendar-blank' : 'clock-outline';
    }, [mode]);

    useEffect(() => {
        if (mode == 'date') {
            //set array year
            let _markedDates = {};
            let _arrayYear = [];
            let _currentYear = null;
            let idx = 0;

            if (value) {
                let _currentTime = moment(value, format).toDate();
                let _currentDate = moment(_currentTime).format('YYYY-MM-DD');
                _markedDates[_currentDate] = { selected: true };

                let firstYear = parseInt(moment().subtract(80, 'year').format('YYYY'));
                let endYear = parseInt(moment().add(1, 'year').format('YYYY'));

                _arrayYear = [];
                let _idx = 0;
                _currentYear = parseInt(moment(_currentTime).format('YYYY'));
                for (let i = firstYear; i < endYear; i++) {
                    _arrayYear.push(i);
                    if (_currentYear == i) {
                        idx = _idx;
                    }
                    _idx++;
                }

                setMarkedDates(_markedDates);
                setArrayYear(_arrayYear);
                setCurrentDate(_currentDate);
                setCurrentTime(_currentTime);
                setCurrentYear(_currentYear);
                setYearIndex(idx);
            }
        } else {
            // setCurrentTime(new Date());
            let _currentTime = moment(value, format).toDate();
            setCurrentTime(_currentTime);
        }

    }, [value, format, mode]);

    const pad = useCallback((time) => {
        if (time == null) {
            return '00';
        }
        let str = time.toString();
        // console.log("STR", str);
        if (str.length == 1) {
            return '0' + str;
        }
        return str;
    }, []);

    return (
        <View style={[styles.wrapper, props.containerStyle]}>
            {props.label != null && (
                <Text style={styles.label}>{props.label}</Text>
            )}

            <TouchableOpacity
                style={[styles.box, props.style]}
                activeOpacity={0.8}
                onPress={() => {
                    setShow(true);

                    if (mode == 'date') {
                        setDisplay('date');
                    } else if (mode == 'time') {
                        let hour = parseInt(moment(currentTime).format('HH'));
                        let minute = parseInt(moment(currentTime).format('mm'));

                        setHour(hour);
                        setMinute(minute);
                        setHourString(pad(hour));
                        setMinuteString(pad(minute));
                    }
                }}>

                <MaterialCommunityIcons
                    name={icon}
                    size={22}
                    color={Color.blackFont}
                    style={{ marginRight: 10 }}
                />
                <Text style={styles.text}>
                    {moment(currentTime).format(displayFormat)}
                </Text>
            </TouchableOpacity>

            <SimpleModal
                visible={show}
                onRequestClose={() => {
                    setShow(false);
                }}>
                {mode == 'date' && (
                    <>
                        {display == 'date' && (
                            <>
                                <View
                                    style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        style={[styles.yearPickerButton, { backgroundColor: color.primary }]}
                                        onPress={() => {
                                            //switch to year picker
                                            setDisplay('year');

                                            setTimeout(() => {
                                                scrollRef.current?.scrollTo({
                                                    x: 0,
                                                    y: 30 * yearIndex,
                                                    animated: true,
                                                });
                                            }, 500);
                                        }}>
                                        <MaterialCommunityIcons
                                            name="calendar-search"
                                            size={20}
                                            color={Color.white}
                                        />
                                        <Text style={styles.yearPickerText}>
                                            {moment(currentDate).format('YYYY')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <Calendar
                                    initialDate={currentDate}
                                    current={currentDate}
                                    markedDates={markedDates}
                                    onDayPress={(day) => {
                                        props.onChange(moment(day.timestamp).format(format));
                                        setShow(false);
                                    }}
                                    enableSwipeMonths={true}
                                    theme={{
                                        backgroundColor: color.white,
                                        calendarBackground: color.white,
                                        todayTextColor: color.primary,
                                        dayTextColor: color.black,
                                        textDisabledColor: color.gray,
                                        monthTextColor: color.black,
                                    }}
                                    minDate={props.minDate}
                                    maxDate={props.maxDate}
                                />
                            </>
                        )}

                        {display == 'year' && (
                            // <View style={{ flex: 1 }}>
                            <ScrollView
                                style={{ height: '80%' }}
                                ref={scrollRef}>
                                {arrayYear.map((y) => {
                                    return (
                                        <TouchableOpacity
                                            style={
                                                y == currentYear
                                                    ? [styles.pickerItemYearSelected, { backgroundColor: color.primary }]
                                                    : styles.pickerItemYear
                                            }
                                            onPress={() => {
                                                let selectedTime =
                                                    y + moment(currentDate).format('-MM-DD');
                                                props.onChange(
                                                    moment(selectedTime).format(format),
                                                );
                                                setDisplay('date');
                                            }}>
                                            <Text
                                                style={
                                                    y == currentYear
                                                        ? styles.pickerItemYearSelectedText
                                                        : styles.pickerItemYearText
                                                }>
                                                {y}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                            // </View>
                        )}
                    </>
                )}

                {mode == 'time' && (
                    <TouchableOpacity activeOpacity={1}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 20,
                            }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={styles.chevronButton}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        if (hour < 23) {
                                            setHour(hour + 1);
                                            setHourString(pad(hour + 1));
                                        } else {
                                            setHour(0);
                                            setHourString(pad(0));
                                        }
                                    }}>
                                    <MaterialCommunityIcons
                                        name="chevron-up"
                                        size={30}
                                        color={Color.primary}
                                    />
                                </TouchableOpacity>

                                <TextInput
                                    style={styles.inputTime}
                                    keyboardType="numeric"
                                    value={hourString}
                                    onChangeText={(hourString) => {
                                        let num = parseInt(hourString);
                                        if (num > 23) {
                                            hourString = '23';
                                            num = 23;
                                        }
                                        if (num < 0) {
                                            hourString = '00';
                                            num = 0;
                                        }
                                        setHourString(hourString);
                                        setHour(num);
                                    }}
                                />

                                <TouchableOpacity
                                    style={styles.chevronButton}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        if (hour > 0) {
                                            setHour(hour - 1);
                                            setHourString(pad(hour - 1));
                                        } else {
                                            setHour(23);
                                            setHourString(pad(23));
                                        }
                                    }}>
                                    <MaterialCommunityIcons
                                        name="chevron-down"
                                        size={30}
                                        color={Color.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.timeString}>:</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={styles.chevronButton}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        if (minute < 59) {
                                            setMinute(minute + 1);
                                            setMinuteString(pad(minute + 1));
                                        } else {
                                            setMinute(0);
                                            setMinuteString(pad(0));
                                        }
                                    }}>
                                    <MaterialCommunityIcons
                                        name="chevron-up"
                                        size={30}
                                        color={Color.primary}
                                    />
                                </TouchableOpacity>

                                <TextInput
                                    style={styles.inputTime}
                                    keyboardType="numeric"
                                    value={minuteString}
                                    onChangeText={(minuteString) => {
                                        let num = parseInt(minuteString);
                                        if (num > 59) {
                                            minuteString = '59';
                                            num = 59;
                                        }
                                        if (num < 0) {
                                            minuteString = '00';
                                            num = 0;
                                        }
                                        setMinuteString(minuteString);
                                        setMinute(num);
                                    }}
                                />

                                <TouchableOpacity
                                    style={styles.chevronButton}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        if (minute > 0) {
                                            setMinute(minute - 1);
                                            setMinuteString(pad(minute - 1));
                                        } else {
                                            setMinute(59);
                                            setMinuteString(pad(59));
                                        }
                                    }}>
                                    <MaterialCommunityIcons
                                        name="chevron-down"
                                        size={30}
                                        color={Color.primary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Button
                            onPress={() => {
                                let day =
                                    moment().format('YYYY-MM-DD') + ' ' + pad(hour) + ':' + pad(minute) + ':00';

                                console.log('Day', day);
                                props.onChange(moment(day).format(format));
                                setShow(false);
                            }}
                        >
                            SELECT
                        </Button>
                    </TouchableOpacity>
                )}
            </SimpleModal>
        </View>
    );
}

const styles = {
    wrapper: {
        marginTop: 0
    },
    box: {
        justifyContent: 'flex-start',
        borderColor: Color.primary,
        // borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
    },

    label: {
        fontSize: 12,
        color: Color.black,
        marginBottom: 5,
    },
    text: {
        color: Color.black,
        marginTop: 3,
        fontSize: 12,
    },
    titleText: {
        color: Color.black,
        marginBottom: 5,
    },
    modalRoot: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    modalContent: {
        width: 300,
        padding: 16,
        borderRadius: 5,
        backgroundColor: '#F6F6F6',
    },
    errorText: {
        color: Color.danger,
    },
    inputTime: {
        fontSize: 25,
        color: Color.black,
        fontWeight: 'bold',
        borderColor: Color.gray,
        borderWidth: 1,
        borderRadius: 5,
        width: 50,
        textAlign: 'center',
    },
    timeString: {
        fontSize: 25,
        color: Color.black,
        fontWeight: 'bold',
    },
    chevronButton: {
        paddingHorizontal: 16,
    },

    yearPickerButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    yearPickerText: {
        color: Color.white,
        fontSize: 18,
        marginLeft: 5,
    },
    pickerItemYear: {
        backgroundColor: Color.white,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    pickerItemYearSelected: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    pickerItemYearText: {
        fontSize: 18,
        color: Color.black,
    },
    pickerItemYearSelectedText: {
        fontSize: 18,
        color: Color.black,
    },
};
