import React, { Component, useState, useRef, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    Platform,
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
import Slider from '@react-native-community/slider';

export default function InputFcScreen({ navigation, route }: { navigation: any, route: any }) {
    const { bikeId, isEdit, receivedFcData, userId, fcId } = route.params;
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
            setToken(value);
            return value
        } catch (error) {
            setToken('');
            return null
        }
    }

    const d = receivedFcData[0]
    const [fcData, setFcData] = useState(
        {
            "fc": `${d.fc ? d.fc : ''}`,
            "distance_bf": `${d.distance_bf ? d.distance_bf : ''}`,
            "distance_af": `${d.distance_af ? d.distance_af : ''}`,
            "distance": `${d.distance ? d.distance : ''}`,
            "gas_amount": `${d.gas_amount ? d.gas_amount : ''}`,
            "city_ride": `${d.city_ride ? d.city_ride : '50'}`,
            "high_way_ride": `${d.high_way_ride ? d.high_way_ride : '50'}`,
            "fc_comment": `${d.fc_comment ? d.fc_comment : ''}`,
            "model_year": `${d.model_year ? d.model_year : ''}`,
            "fuel_type": `${d.fuel_type.fuel ? d.fuel_type.fuel : '0'}`,
            "bike": bikeId,
            "user": userId,
        }
    );
    const [fcPrevData, setFcPrevData] = useState(
        {
            "fc": `${d.fc ? d.fc : ''}`,
            "distance_bf": `${d.distance_bf ? d.distance_bf : ''}`,
            "distance_af": `${d.distance_af ? d.distance_af : ''}`,
            "distance": `${d.distance ? d.distance : ''}`,
            "gas_amount": `${d.gas_amount ? d.gas_amount : ''}`,
            "city_ride": `${d.city_ride ? d.city_ride : '50'}`,
            "high_way_ride": `${d.high_way_ride ? d.high_way_ride : '50'}`,
            "fc_comment": `${d.fc_comment ? d.fc_comment : ''}`,
            "model_year": `${d.model_year ? d.model_year : ''}`,
            "fuel_type": `${d.fuel_type.fuel ? d.fuel_type.fuel : '0'}`,
            "bike": bikeId,
            "user": userId,
        }
    );
    const [token, setToken]: any = useState('');
    const [comment, setComment] = useState(`${d.fc_comment ? d.fc_comment : ''}`);
    const [cityRide, setCityRide] = useState(`${d.city_ride ? d.city_ride : '50'}`);
    const [highWayRide, setHighWayRide] = useState(`${d.high_way_ride ? d.high_way_ride : '50'}`);
    const [loading, setLoading] = useState(false);
    // Empty check
    const [isModelYearEmpty, setIsModelYearEmpty] = useState(false);
    const [isFcEmpty, setIsFcEmpty] = useState(false);
    const [isFcHigh, setIsFcHigh] = useState(false);
    const colorScheme = useColorScheme();
    const textColor = colorScheme === 'light' ? '#000000' : '#fff';
    const backgroundColor = colorScheme === 'light' ? styles.searchBoxLight : styles.searchBoxDark;
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

    useFocusEffect(
        useCallback(() => {
            getUserId()
            getAccessToken().then((v) => {
                if (!v) {
                    navigation.navigate('HOME')
                }
            })
        }, [])
    );

    useEffect(() => {
        const fc = Number(fcData.fc)
        const distance_bf = Number(fcData.distance_bf)
        const distance_af = Number(fcData.distance_af)
        const distance = Number(fcData.distance)
        const gas_amount = Number(fcData.gas_amount)

        const prev_distance_bf = Number(fcPrevData.distance_bf)
        const prev_distance_af = Number(fcPrevData.distance_af)
        const prev_distance = Number(fcPrevData.distance)
        const prev_gas_amount = Number(fcPrevData.gas_amount)


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
        if (Number(fcData.model_year) < 1800 && Number(fcData.model_year) > 2500) {
            Alert.alert(
                '確認',
                '年式が正しくないように見えますが大丈夫ですか？',
                [
                    { text: "OK" },
                    {
                        text: "削除", onPress: () => { return }
                    },
                ],
            );
            return
        }

        // convert to blank to number

        let data = fcData

        if (!data.distance_af) data.distance_af = '0'
        if (!data.distance_bf) data.distance_bf = '0'
        if (!data.distance) data.distance = '0'
        if (!data.gas_amount) data.gas_amount = '0'

        sendData(data)
    }
    const sendData = async (data: typeof fcData) => {
        let fuelType: string;
        let EditFcId: string = ''
        let method: any = 'POST'
        let headers: any = {
            Authorization: API_KEY,
            'Content-Type': 'application/json',
        }
        if (isEdit) {
            method = 'PUT'
            EditFcId = `${fcId}/`
            headers = {
                Authorization: `Bearer  ${token} `,
                'Content-Type': 'application/json',
            }
        }
        if (Number(data.fuel_type) === 0) {
            fuelType = '23857b29cf1e4bb086c458d2d5aaa319'
        } else {
            fuelType = 'ccd6a3d15c4a41b6a3f1bc36fb0ed9b1'
        }


        await axios({
            url: BASE_URL + FC_REGISTRATION_PATH + EditFcId,
            method: method,
            headers: headers,
            data: { ...data, 'fuel_type': fuelType }

        })
            .then((response: any) => {
                const title = isEdit ? '編集完了！' : '登録完了！'
                const description = isEdit ? '燃費の編集が完了しました！' : '燃費の登録が完了しました！'
                Alert.alert(
                    title,
                    description,
                    [
                        { text: "OK" }
                    ],
                );
                navigation.navigate('HOME')
                setLoading(false)
            })
            .catch((e) => {
                console.log(e.response.data);
                console.log(e.response);
                setLoading(false)
                Alert.alert(
                    "登録失敗",
                    "燃費の登録に失敗しました。時間をおいて再度お試しください。",
                    [
                        { text: "OK" }
                    ],
                );
            });
    };
    return (
        <KeyboardAwareScrollView
            style={topContainerColor}
            extraScrollHeight={200}
            enableAutomaticScroll={true}
            keyboardShouldPersistTaps="always"
        >
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
                        <View style={radioButtonTheme}>
                            <Text style={{ color: textColor }}>{`街乗り${cityRide}%`}</Text>
                        </View>
                        <Slider
                            style={{
                                width: "60%",
                                height: 40,
                                // margin: "auto",
                                // alignContent: "center",
                                // flexDirection: 'row',
                                // flex: 1,
                                // justifyContent: 'center',
                                // alignItems: 'center'

                            }}
                            onValueChange={(v) => setCityRide(v)}
                            onSlidingComplete={(v) => {
                                setFc('city_ride', v)
                                setFc('high_way_ride', (100 - Number(v)))
                            }}
                            value={`${fcData.city_ride}`}
                            step={1}
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor='green'
                            maximumTrackTintColor={textColor}
                        />
                        <View style={radioButtonTheme}>
                            <Text style={{ color: textColor }}>{`高速${100 - Number(cityRide)}%`}</Text>
                        </View>
                    </View>
                    <View style={styles.textInputWrapper}>
                        <TextInput
                            // autoFocus={true}
                            defaultValue={fcData.distance_bf}
                            underlineColor={textColor}
                            label="給油前の距離(Km) -オプション-"
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                // if (text.length === 3) {
                                //     refInput3.current.focus()
                                // }
                                setFc('distance_bf', text)
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
                            }}
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
                            onSubmitEditing={(text) => { setComment(`${comment} ${'\n'} `) }}
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
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'transparent',
        borderColor: '#c0c0c0',
        borderWidth: 1,
        paddingHorizontal: 0,
        marginBottom: 200
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
