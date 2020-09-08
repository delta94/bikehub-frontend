import React, { Component, useState, useRef } from 'react';
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
} from 'react-native';
import { TextInput, Button, HelperText, Checkbox, RadioButton } from 'react-native-paper';
import { useColorScheme } from 'react-native-appearance';
import axios from 'axios';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Login({ navigation }: { navigation: any }) {
  const [dispName, setDispName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [gender, setGender] = useState('0');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');
  const [accept, setAccept] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [isinValid, setIsinValid] = useState(false);
  // Empty check
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [isDispNameEmpty, setIsDispNameEmpty] = useState(false);
  // Valid check
  const [isBirthdayInvalid, setIsBirthdayInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isPasswordNotSame, setIsPasswordNotSame] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'light' ? '#000000' : '#fff';
  const topContainerColor = colorScheme === 'light' ? styles.topContainerLight : styles.topContainerDark;
  const radioButtonTheme = colorScheme === 'light' ? styles.RadioButtonLight : styles.RadioButtonDark;
  const BASE_URL = Constants.manifest.extra.authApiBaseUrl;
  const REGISTRATION_PATH = Constants.manifest.extra.registrationPath;
  const refInput1 = useRef()
  const refInput2 = useRef()
  const refInput3 = useRef()
  const refInput4 = useRef()
  const refInput5 = useRef()
  const refInput6 = useRef()
  const refInput7 = useRef()
  const refInput8 = useRef()

  const registration = () => {
    // init
    setIsDispNameEmpty(false)
    setIsEmailEmpty(false)
    setIsBirthdayInvalid(false)
    setIsPasswordEmpty(false)
    setIsPasswordEmpty(false)
    setIsPasswordNotSame(false)
    setIsPasswordInvalid(false)

    let hasError = false;
    // check accept
    if (!accept) {
      hasError = true
      alert("利用規約に同意をお願いいたします。")
      return
    }
    // check disp name empty
    if (!dispName) {
      hasError = true
      setIsDispNameEmpty(true)
    }
    // check disp email empty
    if (!email) {
      hasError = true
      setIsEmailEmpty(true)
    }
    // check birthday
    const birthday = `${year}-${month}-${date}`
    const check = Date.parse(birthday)
    if (!check) {
      hasError = true
      setIsBirthdayInvalid(true)
    }
    // check password empty
    if (isPasswordEmpty) {
      hasError = true
      setIsPasswordEmpty(true)
    }

    // check password same
    if (password !== password2) {
      hasError = true
      setIsPasswordNotSame(true)
    }
    // check password collect
    var regex = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/;
    const checkResult = regex.test(password);
    if (!checkResult) {
      hasError = true
      setIsPasswordInvalid(true)
    }
    if (hasError) return
    sendData()
  }
  const sendData = async () => {

    const data = {
      "disp_name": dispName,
      "email": email,
      "birthday": `${year}-${month}-${date}`,
      "gender": gender,
      "accept": accept,
      "password": password,
      "password2": password2
    }

    //console.log(data)
    //console.log(BASE_URL + REGISTRATION_PATH)

    await axios({
      url: BASE_URL + REGISTRATION_PATH,
      method: 'POST',
      data: data
    })
      .then((response: any) => {
        alert("アカウント登録が完了しました！入力したメールアドレスから、アカウント認証を完了させてください。")
        navigation.navigate('ログイン')
      })
      .catch((e) => {
        //console.log(e.response.data);
        //console.log(e.response);
        alert("このメールアドレスはすでに登録されています。")
      });
  };
  return (
    <KeyboardAwareScrollView
      style={topContainerColor}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}

      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View>
              <View style={styles.textInputWrapper}>
                <TextInput
                  underlineColor={textColor}
                  label="ニックネーム"
                  onChangeText={(text) => { setDispName(text) }}
                  autoCompleteType="username"
                  textContentType="username"
                  onSubmitEditing={() => refInput2.current.focus()}
                  ref={refInput1}
                  placeholder="ねんぴ太郎"
                  returnKeyType="next"
                  returnKeyLabel="次へ"
                  maxLength={50}
                  disabled={loading}
                  theme={{
                    colors: {
                      text: textColor,
                    },
                  }}
                />
                <HelperText type="error" visible={isDispNameEmpty}>
                  ニックネームを入力してください。
              </HelperText>
              </View>
              <View style={styles.textInputWrapper}>
                <TextInput
                  underlineColor={textColor}
                  label="メールアドレス"
                  onChangeText={(text) => { setEmail(text) }}
                  onSubmitEditing={() => refInput3.current.focus()}
                  ref={refInput2}
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  placeholder="bikehub@bikehub.com"
                  returnKeyType="next"
                  returnKeyLabel="次へ"
                  maxLength={100}
                  disabled={loading}
                  theme={{
                    colors: {
                      text: textColor,
                    },
                  }}
                />
                <HelperText type="error" visible={isEmailEmpty}>
                  メールアドレスを入力してください。
              </HelperText>
              </View>

              <View style={styles.textInputWrapper}>
                <HelperText type="info">
                  誕生日
              </HelperText>
                <View style={styles.textInputBirthdayWrapper}>
                  <TextInput
                    underlineColor={textColor}
                    label="年"
                    onChangeText={(text) => {
                      setYear(text)
                      if (text.length === 4) {
                        refInput4.current.focus()
                      }
                    }}
                    onSubmitEditing={() => refInput4.current.focus()}
                    ref={refInput3}
                    autoCompleteType="off"
                    textContentType="none"
                    returnKeyType="next"
                    returnKeyLabel="次へ"
                    maxLength={4}
                    placeholder="YYYY"
                    keyboardType='number-pad'
                    // onFocus={showDatepicker}
                    disabled={loading}
                    style={{ width: "40%" }}
                    theme={{
                      colors: {
                        text: textColor,
                      },
                    }}
                  />
                  <TextInput
                    underlineColor={textColor}
                    label="月"
                    onChangeText={(text) => {
                      setMonth(text)
                      if (text.length === 2) {
                        refInput5.current.focus()
                      }
                    }}
                    onSubmitEditing={() => refInput5.current.focus()}
                    ref={refInput4}
                    autoCompleteType="off"
                    textContentType="none"
                    returnKeyType="next"
                    returnKeyLabel="次へ"
                    keyboardType='number-pad'
                    placeholder="MM"
                    maxLength={2}
                    style={{ width: "30%" }}
                    // onFocus={showDatepicker}
                    disabled={loading}
                    theme={{
                      colors: {
                        text: textColor,
                      },
                    }}
                  />
                  <TextInput
                    underlineColor={textColor}
                    label="日"
                    onChangeText={(text) => {
                      setDate(text)
                    }}
                    onSubmitEditing={() => refInput6.current.focus()}
                    ref={refInput5}
                    autoCompleteType="off"
                    textContentType="none"
                    returnKeyType="next"
                    returnKeyLabel="次へ"
                    placeholder="DD"
                    style={{ width: "30%" }}
                    keyboardType='number-pad'
                    maxLength={2}
                    // onFocus={showDatepicker}
                    disabled={loading}
                    theme={{
                      colors: {
                        text: textColor,
                      },
                    }}
                  />
                </View>
                <HelperText type="error" visible={isBirthdayInvalid}>
                  生年月日を正しく入力してください
              </HelperText>
              </View>
              <View style={styles.viewInline}>
                <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
                  <View style={radioButtonTheme}>
                    <Text style={{ color: textColor }}>選択しない</Text>
                  </View>
                  <View style={radioButtonTheme}>
                    <Text style={{ color: textColor }}>女性</Text>
                  </View>
                  <View style={radioButtonTheme}>
                    <Text style={{ color: textColor }}>男性</Text>
                  </View>
                </RadioButton.Group>
              </View>
              <View style={styles.viewInline}>
                <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
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
                  <View style={radioButtonTheme}>
                    <View style={styles.RadioButtonWrapper}>
                      <RadioButton
                        uncheckedColor="green"
                        color="green"
                        value="2" />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
            </View>
            <View style={styles.textInputWrapper}>
              <TextInput
                underlineColor={textColor}
                label="Password"
                onChangeText={(text) => {
                  if (!text) {
                    setIsPasswordEmpty(true);
                  } else {
                    setIsPasswordEmpty(false);
                  }
                  setPassword(text);
                }}
                onSubmitEditing={() => refInput8.current.focus()}
                ref={refInput7}
                autoCompleteType="password"
                textContentType="newPassword"
                importantForAutofill="yes"
                returnKeyType="next"
                returnKeyLabel="次へ"
                maxLength={50}
                secureTextEntry={true}
                disabled={loading}
                theme={{
                  colors: {
                    text: textColor,
                  },
                }}
              />
              <HelperText type="error" visible={isPasswordEmpty}>
                パスワードを入力してください。
              </HelperText>
              <HelperText type="error" visible={isPasswordInvalid}>
                半角英数字8文字以上をを大文字小文字含めて登録してください
              </HelperText>
            </View>
            <View style={styles.textInputWrapper}>
              <TextInput
                underlineColor={textColor}
                label="Password(確認)"
                onChangeText={(text) => {
                  if (!text) {
                    setIsPasswordEmpty(true);
                  } else {
                    setIsPasswordEmpty(false);
                  }
                  setPassword2(text);
                }}
                importantForAutofill="yes"
                onSubmitEditing={() => //console.log("done")}
                  ref = { refInput8 }
                autoCompleteType="password"
                textContentType="newPassword"
                returnKeyType="done"
                returnKeyLabel="完了"
                maxLength={50}
                secureTextEntry={true}
                disabled={loading}
                theme={{
                  colors: {
                    text: textColor,
                  },
                }}
              />
              <HelperText type="error" visible={isPasswordNotSame}>
                パスワードが一意しません。
              </HelperText>
            </View>

            <Button
              loading={loading}
              style={styles.buttonInline}
              onPress={() => navigation.navigate('利用規約')}
            >
              利用規約を読む
            </Button>

            <View style={{ marginTop: 50, marginBottom: 50 }}>
              <View style={radioButtonTheme}>
                <HelperText type="info" style={{ color: textColor }}>
                  利用規約に同意する
              </HelperText>
                <View style={styles.RadioButtonWrapper}>
                  <Checkbox
                    uncheckedColor="green"
                    color="green"
                    status={accept ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setAccept(!accept);
                    }}
                  />
                </View>
              </View>

            </View>
            <Button
              loading={loading}
              style={styles.button}
              onPress={() => registration()}
            >
              登録
          </Button>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    flexDirection: 'column',
    // justifyContent: 'center',
    margin: "auto",
    height: "100%",
    backgroundColor: "#000000"
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
