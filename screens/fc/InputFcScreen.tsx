import React, { Component, useState, useRef, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    Platform,
    Picker,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Button as ButtonNative,
    Alert,
    AsyncStorage
} from 'react-native';
import { TextInput, Button, HelperText, Checkbox, RadioButton } from 'react-native-paper';
import { useColorScheme } from 'react-native-appearance';
import axios from 'axios';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputScrollView from 'react-native-input-scroll-view';

export default function InputFcScreen({ navigation, route }: { navigation: any, route: any }) {
    const { bikeId, isEdit, fcId } = route.params;
    const [dispName, setDispName] = useState('');
    const getUserId = async () => {
        try {
            const value = await AsyncStorage.getItem('USER_ID');
            setFc('user', value);
        } catch (error) {
        }
    }
    const getAccessToken = async () => {
        try {
            const value = await AsyncStorage.getItem('ACCESS_TOKEN');
            console.log(value)
            setToken(value);
        } catch (error) {
            setToken('');
        }
    }

    useFocusEffect(
        useCallback(() => {
            getUserId()
            getAccessToken()
        }, [])
    );
    const [fcData, setFcData] = useState(
        {
            "fc": '',
            "distance_bf": '',
            "distance_af": '',
            "distance": '',
            "gas_amount": '',
            "city_ride": '50',
            "high_way_ride": '50',
            "fc_comment": '',
            "model_year": '',
            "fuel_type": '0',
            "bike": bikeId,
            "user": '',
        }
    );
    const [fcPrevData, setFcPrevData] = useState(
        {
            "fc": '',
            "distance_bf": '',
            "distance_af": '',
            "distance": '',
            "gas_amount": '',
            "city_ride": '50',
            "high_way_ride": '50',
            "fc_comment": '',
            "model_year": '',
            "fuel_type": '0',
            "bike": bikeId,
            "user": '',
        }
    );
    const [token, setToken]: any = useState('');
    const [comment, setComment] = useState('');
    const [highWayRide, setHighWayRide] = useState('50');
    const [cityRide, setCityRide] = useState('50');
    const [loading, setLoading] = useState(false);
    // Empty check
    const [isModelYearEmpty, setIsModelYearEmpty] = useState(false);
    const [isFcEmpty, setIsFcEmpty] = useState(false);
    const [isFcHigh, setIsFcHigh] = useState(false);
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'light' ? '#000000' : '#fff';
    const topContainerColor = colorScheme === 'light' ? styles.topContainerLight : styles.topContainerDark;
    const radioButtonTheme = colorScheme === 'light' ? styles.RadioButtonLight : styles.RadioButtonDark;
    const BASE_URL = Constants.manifest.extra.authApiBaseUrl;
    const FC_REGISTRATION_PATH = Constants.manifest.extra.fcApiPath;
    const API_KEY = Constants.manifest.extra.apiKey;
    const refInput1 = useRef<HTMLDivElement>(null);
    const refInput2 = useRef<HTMLDivElement>(null);
    const refInput3 = useRef<HTMLDivElement>(null);
    const refInput4 = useRef<HTMLDivElement>(null);
    const refInput5 = useRef<HTMLDivElement>(null);
    const refInput6 = useRef<HTMLDivElement>(null);
    const refInput7 = useRef<HTMLDivElement>(null);
    const refInput8 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fc = Number(fcData.fc)
        const distance_bf = Number(fcData.distance_bf)
        const distance_af = Number(fcData.distance_af)
        const distance = Number(fcData.distance)
        const gas_amount = Number(fcData.gas_amount)
        const city_ride = Number(fcData.city_ride)
        const high_way_ride = Number(fcData.high_way_ride)

        const prev_fc = Number(fcPrevData.fc)
        const prev_distance_bf = Number(fcPrevData.distance_bf)
        const prev_distance_af = Number(fcPrevData.distance_af)
        const prev_distance = Number(fcPrevData.distance)
        const prev_gas_amount = Number(fcPrevData.gas_amount)
        const prev_city_ride = Number(fcPrevData.city_ride)
        const prev_high_way_ride = Number(fcPrevData.high_way_ride)


        if (distance_bf !== prev_distance_bf || distance_af !== prev_distance_af) {
            if (!distance_bf || !distance_af) return;
            const d = (distance_af - distance_bf) < 0 ? 0 : (distance_af - distance_bf)
            setFc('distance', String(d))
        }

        if (!fc && distance !== prev_distance || gas_amount !== prev_gas_amount) {
            if (!distance || !gas_amount) return;
            const d = (distance / gas_amount).toFixed(2);
            setFc('fc', String(d))
        }

        setFcPrevData(fcData)
        if (city_ride !== prev_city_ride && high_way_ride === prev_high_way_ride) {
            const total = city_ride + high_way_ride
            if (!city_ride) {
                setCityRide('0')
            }
            if (total !== 100) {
                const diff = 100 - city_ride
                setHighWayRide(String(diff))
            }
        }
        if (city_ride === prev_city_ride && high_way_ride !== prev_high_way_ride) {
            const total = city_ride + high_way_ride
            if (!high_way_ride) {
                setHighWayRide('0')
            }
            if (total !== 100) {
                const diff = 100 - high_way_ride
                setCityRide(String(diff))
            }
        }

    }, [fcData])

    const setFc = (name: string, value: any) => {
        setFcData(
            {
                ...fcData,
                [name]: value
            }
        )
    }

    const registration = () => {
        setLoading(true)
        // init
        setIsFcEmpty(false)
        setIsModelYearEmpty(false)
        setIsFcHigh(false)


        if (!Number(fcData.fc)) {
            setIsFcEmpty(true)
            setLoading(false)
            return
        } else if (Number(fcData.fc) > 999) {
            setIsFcHigh(true)
            setLoading(false)
            return
        }
        if (!Number(fcData.model_year)) {
            setIsModelYearEmpty(true)
            setLoading(false)
            return
        }
        sendData()
    }
    const sendData = async () => {
        console.log(fcData)
        console.log(BASE_URL + FC_REGISTRATION_PATH)
        let fuelType: string;
        let EditFcId: string = ''
        let method: any = 'POST'
        let headers: any = {
            Authorization: API_KEY,
            'Content-Type': 'application/json',
        }
        if (isEdit) {
            method = 'PUT'
            EditFcId = `/${fcId}`
            headers = {
                Authorization: `Bearer  ${token}`,
                'Content-Type': 'application/json',
            }
        }
        if (Number(fcData.fuel_type) === 0) {
            fuelType = '23857b29cf1e4bb086c458d2d5aaa319'
        } else {
            fuelType = 'ccd6a3d15c4a41b6a3f1bc36fb0ed9b1'
        }


        await axios({
            url: BASE_URL + FC_REGISTRATION_PATH + EditFcId,
            method: method,
            headers: headers,
            data: { ...fcData, 'fuel_type': fuelType }

        })
            .then((response: any) => {
                alert("燃費の登録が完了しました！")
                navigation.navigate('HOME')
                setLoading(false)
            })
            .catch((e) => {
                console.log(e.response.data);
                console.log(e.response);
                setLoading(false)
                alert("燃費の登録に失敗しました。時間をおいて再度お試しください。")
            });
    };
    return (
        <KeyboardAwareScrollView
            style={topContainerColor}
            extraScrollHeight={200}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View>
                        <View>
                            <View style={styles.viewInline}>
                                <View style={radioButtonTheme}>
                                    <Text style={{ color: textColor }}>ガソリン</Text>
                                </View>
                                <View style={radioButtonTheme}>
                                    <Text style={{ color: textColor }}>ハイオク</Text>
                                </View>
                            </View>
                            <View style={styles.viewInline}>
                                <RadioButton.Group onValueChange={v => setFc('fuel_type', v)} value={fcData.fuel_type}>
                                    <View style={radioButtonTheme}>
                                        <View style={styles.RadioButtonWrapper}>
                                            <RadioButton
                                                uncheckedColor="green"
                                                color="green"
                                                value="0" />
                                        </View>
                                    </View>
                                    <View style={radioButtonTheme}>
                                        <View style={styles.RadioButtonWrapper}>
                                            <RadioButton
                                                uncheckedColor="green"
                                                color="green"
                                                value="1" />
                                        </View>
                                    </View>
                                </RadioButton.Group>
                            </View>
                        </View>
                        <View style={styles.textInputBirthdayWrapper}>
                            <TextInput
                                underlineColor={textColor}
                                label="街乗り割合(%)"
                                onChangeText={(text) => {
                                    setCityRide(text)
                                    setFc('city_ride', text)
                                }}
                                value={cityRide}
                                onSubmitEditing={() => {
                                    if (refInput1.current) refInput1.current.focus()
                                }}
                                defaultValue={fcData.city_ride}
                                autoCompleteType="off"
                                textContentType="none"
                                returnKeyType="next"
                                returnKeyLabel="次へ"
                                maxLength={2}
                                placeholder="街乗り割合(%)"
                                keyboardType='number-pad'
                                disabled={loading}
                                style={{ width: "50%" }}
                                theme={{
                                    colors: {
                                        text: textColor,
                                    },
                                }}
                            />
                            <TextInput
                                underlineColor={textColor}
                                label="高速割合(%)"
                                onChangeText={(text) => {
                                    setHighWayRide(text)
                                    setFc('high_way_ride', text)
                                }}
                                onSubmitEditing={() => {
                                    if (refInput2.current) refInput2.current.focus()
                                }}
                                value={highWayRide}
                                defaultValue={fcData.high_way_ride}
                                ref={refInput1}
                                autoCompleteType="off"
                                textContentType="none"
                                returnKeyType="next"
                                returnKeyLabel="次へ"
                                keyboardType='number-pad'
                                placeholder="高速割合(%)"
                                maxLength={2}
                                style={{ width: "50%" }}
                                disabled={loading}
                                theme={{
                                    colors: {
                                        text: textColor,
                                    },
                                }}
                            />
                        </View>
                        <View style={styles.textInputWrapper}>
                            <TextInput
                                // autoFocus={true}
                                defaultValue={fcData.distance_bf}
                                underlineColor={textColor}
                                label="給油前の距離(Km) -オプション-"
                                keyboardType='numeric'
                                onChangeText={(text) => {
                                    setFc('distance_bf', text)
                                    // if (text.length === 3) {
                                    //     refInput3.current.focus()
                                    // }
                                }}
                                autoCompleteType="off"
                                textContentType="none"
                                onSubmitEditing={() => {
                                    if (refInput3.current) refInput3.current.focus()
                                }}
                                ref={refInput2}
                                placeholder="2000"
                                returnKeyType="next"
                                returnKeyLabel="次へ"
                                nameSuffix="Km"
                                maxLength={7}
                                disabled={loading}
                                theme={{
                                    colors: {
                                        text: textColor,
                                    },
                                }}
                            />
                        </View>
                        <View style={styles.textInputWrapper}>
                            <TextInput
                                // autoFocus={true}
                                defaultValue={fcData.distance_af}
                                underlineColor={textColor}
                                label="給油後の距離(Km) -オプション-"
                                keyboardType='numeric'
                                onChangeText={(text) => { setFc('distance_af', text) }}
                                autoCompleteType="off"
                                textContentType="none"
                                onSubmitEditing={() => {
                                    if (refInput4.current) refInput4.current.focus()
                                }
                                }
                                ref={refInput3}
                                placeholder="2200"
                                returnKeyType="next"
                                returnKeyLabel="次へ"
                                nameSuffix="Km"
                                maxLength={7}
                                disabled={loading}
                                theme={{
                                    colors: {
                                        text: textColor,
                                    },
                                }}
                            />
                        </View>
                        <View style={styles.textInputWrapper}>
                            <TextInput
                                // autoFocus={true}
                                defaultValue={fcData.distance}
                                underlineColor={textColor}
                                label="走行距離(Km) -オプション-"
                                keyboardType='numeric'
                                onChangeText={(text) => { setFc('distance', text) }}
                                value={fcData.distance}
                                autoCompleteType="off"
                                textContentType="none"
                                onSubmitEditing={() => {
                                    if (refInput5.current) refInput5.current.focus()
                                }
                                }
                                ref={refInput4}
                                placeholder="20"
                                returnKeyType="next"
                                returnKeyLabel="次へ"
                                nameSuffix="Km"
                                maxLength={4}
                                disabled={loading}
                                theme={{
                                    colors: {
                                        text: textColor,
                                    },
                                }}
                            />
                        </View>
                        <View style={styles.textInputWrapper}>
                            <TextInput
                                // autoFocus={true}
                                defaultValue={fcData.gas_amount}
                                underlineColor={textColor}
                                label="給油量(リットル) -オプション-"
                                keyboardType='numeric'
                                onChangeText={(text) => { setFc('gas_amount', text) }}
                                autoCompleteType="off"
                                textContentType="none"
                                onSubmitEditing={() => {

                                    if (refInput6.current) refInput6.current.focus()

                                }}
                                ref={refInput5}
                                placeholder="12.15"
                                returnKeyType="next"
                                returnKeyLabel="次へ"
                                nameSuffix="L"
                                maxLength={5}
                                disabled={loading}
                                theme={{
                                    colors: {
                                        text: textColor,
                                    },
                                }}
                            />
                        </View>
                        <View style={styles.textInputWrapper}>
                            <TextInput
                                // autoFocus={true}
                                defaultValue={fcData.fc}
                                underlineColor={textColor}
                                label="燃費(Km/L)"
                                keyboardType='numeric'
                                onChangeText={(text) => { setFc('fc', text) }}
                                autoCompleteType="username"
                                textContentType="username"
                                onSubmitEditing={() => {
                                    if (refInput7.current) refInput7.current.focus()
                                }
                                value={fcData.fc}
                                ref={refInput6}
                                placeholder="20.31"
                                returnKeyType="next"
                                returnKeyLabel="次へ"
                                maxLength={4}
                                disabled={loading}
                                nameSuffix="Km/L"
                                theme={{
                                    colors: {
                                        text: textColor,
                                    },
                                }}
                            />
                            <HelperText type="error" visible={isFcEmpty}>
                                燃費を入力してください。
                                </HelperText>
                            <HelperText type="error" visible={isFcHigh}>
                                燃費が良すぎて登録できません。
                                </HelperText>
                        </View>
                        <View style={styles.textInputWrapper}>
                            <TextInput
                                defaultValue={fcData.model_year}
                                // autoFocus={true}
                                underlineColor={textColor}
                                label="バイクの年式"
                                keyboardType='number-pad'
                                onChangeText={(text) => { setFc('model_year', text) }}
                                autoCompleteType="username"
                                textContentType="username"
                                onSubmitEditing={() => {
                                    if (refInput8.current) refInput8.current.focus()
                                }}
                                ref={refInput7}
                                placeholder="2012"
                                returnKeyType="next"
                                returnKeyLabel="次へ"
                                maxLength={4}
                                disabled={loading}
                                nameSuffix="年式"
                                theme={{
                                    colors: {
                                        text: textColor,
                                    },
                                }}
                            />
                            <HelperText type="error" visible={isModelYearEmpty}>
                                年式を入力してください。
                                </HelperText>
                        </View>

                        <View style={styles.textInputCommentWrapper}>
                            <TextInput
                                defaultValue={fcData.fc_comment}
                                underlineColor={textColor}
                                label="コメント"
                                onChangeText={(text) => { setFc('fc_comment', text) }}
                                autoCompleteType="off"
                                textContentType="none"
                                blurOnSubmit={false}
                                value={comment}
                                onSubmitEditing={(text) => { setComment(`${comment}${'\n'}`) }}
                                onChange={(obj) => { setComment(obj.nativeEvent.text) }}
                                ref={refInput8}
                                placeholder="満タン法です。燃費メータと比較用です。"
                                returnKeyType="none"
                                returnKeyLabel="改行"
                                maxLength={500}
                                disabled={loading}
                                multiline
                                theme={{
                                    colors: {
                                        text: textColor,
                                    },
                                }}
                            />
                        </View>

                        <Button
                            loading={loading}
                            style={styles.button}
                            onPress={() => registration()}
                        >登録</Button>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView >
    );
}

const styles = StyleSheet.create({
    RadioButtonWrapper: {
        backgroundColor: '#c0c0c0',
        borderRadius: 50,
        paddingHorizontal: 0,
    },
    textInput: {
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
    },
    textInputBirthdayWrapper: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: 'transparent',
        borderColor: '#c0c0c0',
        borderWidth: 1,
        paddingHorizontal: 0,
    },
    buttonInline: {
        padding: 0,
        margin: 0,
    },
    viewInline: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputWrapper: {
        padding: 0,
        paddingHorizontal: 0,
        margin: 0,
        marginTop: 10,
        marginBottom: 10,
    },
    textInputCommentWrapper: {
        padding: 0,
        paddingHorizontal: 0,
        margin: 0,
        marginTop: 10,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: "5%",
        paddingRight: "5%",
        // maxWidth: 500,
    },
    RadioButtonDark: {
        color: "#fff",
        backgroundColor: "#000000",
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    RadioButtonLight: {
        color: "#000000",
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContainerDark: {
        flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // margin: "auto",
        // height: "100%",
        // backgroundColor: "#000000"
    },
    topContainerLight: {
        flex: 1,
        height: "100%",
        flexDirection: 'column',
        // justifyContent: 'center',
        margin: "auto",
        backgroundColor: "#fff"
    },
});
