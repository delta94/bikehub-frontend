import React, { Component, useState, useRef } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Button as ButtonNative,
} from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useColorScheme } from 'react-native-appearance';
import { AsyncStorage } from 'react-native';
import PasswordResetScreen from './PasswordResetScreen'
import axios from 'axios';
import Constants from 'expo-constants';


export default function Login({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [accessToken, setAccessToken] = useState('');
  // const [refreshToken, setRefreshToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [isinValid, setIsinValid] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'light' ? '#000000' : '#fff';
  const topContainerColor = colorScheme === 'light' ? styles.topContainerLight : styles.topContainerDark;
  const BASE_URL = Constants.manifest.extra.authApiBaseUrl;
  const LOGIN_PATH = Constants.manifest.extra.loginPath;
  const refInput1 = useRef()
  const refInput2 = useRef()
  const refInput3 = useRef()

  const login = () => {
    if (!email && !password) {
      setIsEmailEmpty(true);
      setIsPasswordEmpty(true);
      return;
    } else if (!email) {
      setIsEmailEmpty(true);
      return;
    } else if (!password) {
      setIsPasswordEmpty(true);
      return;
    }
    setLoading(true);
    loginRequest().then((result) => {
      setLoading(false);
      if (result) {
        navigation.navigate('ユーザー詳細')
      }
    });
  };

  const setAccessToken = async (accessToken: string) => {
    console.log(accessToken)
    try {
      await AsyncStorage.setItem(
        'ACCESS_TOKEN',
        accessToken
      );
    } catch (error) {
      // Error saving data
    }
  }

  const loginRequest = async () => {
    const result = await axios({
      url: BASE_URL + LOGIN_PATH,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email: email,
        password: password,
      },
    })
      .then((response: any) => {
        if (Number(response.status) == 200) {
          setAccessToken(response.data.access_token)
          return true
        } else {
          setIsinValid(true);
          return false
        }
      })
      .catch((e) => {
        clearToken()
        if (e.response) {
          console.log(e.response)
          if (e.response.data.non_field_errors) {
            alert("メールアドレスの認証を完了させてください。")
          }
        }
        setIsinValid(true);
        return false
      });

    return result;
  };

  const clearToken = async () => {
    try {
      const value = await AsyncStorage.removeItem('ACCESS_TOKEN');
    } catch (error) {
      return null;
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={topContainerColor}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <View style={styles.textInputWrapper}>
              <TextInput
                autoFocus={true}
                underlineColor={textColor}
                label="Email"
                onChangeText={(text) => {
                  if (!text) {
                    setIsEmailEmpty(true);
                  } else {
                    setIsEmailEmpty(false);
                  }
                  setEmail(text);
                }}
                autoCompleteType="username"
                textContentType="username"
                returnKeyType="next"
                returnKeyLabel="次へ"
                onSubmitEditing={() => refInput1.current.focus()}
                maxLength={50}
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
                autoCompleteType="password"
                textContentType="password"
                returnKeyType="done"
                returnKeyLabel="ログイン"
                ref={refInput1}
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
            </View>
          </View>
          <Button
            loading={loading}
            style={styles.button}
            onPress={() => login()}
          >
            ログイン
          </Button>
          <HelperText type="error" visible={isinValid}>
            認証に失敗しました。メールアドレスとパスワードを確認してください。
          </HelperText>
          <View style={styles.viewInline}>
            <Button
              compact={true}
              style={styles.buttonInline}
              onPress={() => {
                navigation.navigate('ユーザー登録')
              }}
            >
              新規登録
            </Button>
            <Button
              compact={true}
              style={styles.buttonInline}
              onPress={() => {
                navigation.navigate('パスワード再設定')
              }}
            >
              パスワードを忘れた
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
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
    padding: 10,
    paddingHorizontal: 0,
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  topContainerDark: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: "100%",
    // alignItems: 'center',
    margin: "auto",
    backgroundColor: "#000000"
  },
  topContainerLight: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    margin: "auto",
    backgroundColor: "#fff"
  },
});
