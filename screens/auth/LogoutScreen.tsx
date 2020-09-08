import React, { Component, useState } from 'react';
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
import axios from 'axios';
import Constants from 'expo-constants';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [isinValid, setIsinValid] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'light' ? '#000000' : '#fff';
  const backGroundColor = colorScheme === 'light' ? '#000000' : '#fff';
  const API_KEY = Constants.manifest.extra.apiKey;
  const BASE_URL = Constants.manifest.extra.authApiBaseUrl;
  const LOGIN_PATH = Constants.manifest.extra.loginPath;

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
    loginRequest().then(() => {
      setLoading(false);
    });
  };

  const loginRequest = async () => {
    await axios({
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
          //console.log('login success');
          setAccessToken(response.data.access_token);
          setRefreshToken(response.data.refresh_token);
        } else {
          setIsinValid(true);
        }
      })
      .catch((e) => {
        setIsinValid(true);
        if (e.response) {
          //console.log(e.response.data); // => the response payload
        }
      });
  };

  const logout = async () => {
    //console.log('--------logout---------');
    await axios({
      url: BASE_URL + '/rest/auth/logout/',
      method: 'POST',
      headers: {
        Authorization: `Bearer  ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response: any) => {
        if (Number(response.status) == 200) {
          //console.log(response.data);
        }
      })
      .catch((e) => {
        setIsinValid(true);
        if (e.response) {
          //console.log(e.response.status);
          //console.log(e.response.data);
        }
      });
    //console.log(
    '--------logout↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑---------'
    );
};

const getUserData = async () => {
  //console.log('--------get userdata---------');
  await axios({
    url: BASE_URL + '/rest/auth/user/',
    method: 'GET',
    headers: {
      Authorization: `Bearer  ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response: any) => {
      if (Number(response.status) == 200) {
        //console.log(response.data);
      }
    })
    .catch((e) => {
      setIsinValid(true);
      if (e.response) {
        //console.log(e.response.status);
        //console.log(e.response.data);
      }
    });
  //console.log(
  '--------logout↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑---------'
    );
  };

const refleshToken = async () => {
  //console.log('--------get reflesh---------');
  await axios({
    url: BASE_URL + '/rest/auth/token/refresh/',
    method: 'POST',
    headers: {
      Authorization: `Bearer  ${accessToken}`,
      'Content-Type': 'application/json',
    }, data: JSON.stringify({
      "refresh": [
        refreshToken
      ]
    })
  })
    .then((response: any) => {
      if (Number(response.status) == 200) {
        //console.log(response.data);
      }
    })
    .catch((e) => {
      setIsinValid(true);
      if (e.response) {
        //console.log(e.response.status);
        //console.log(e.response.data);
      }
    });
  //console.log(
  '--------logout↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑---------'
    );
  };

const passwordReset = async () => {
  //console.log('--------get userdata---------');
  await axios({
    url: BASE_URL + '/rest/auth/password/reset/',
    method: 'POST',
    headers: {
      Authorization: `Bearer  ${accessToken}`,
      'Content-Type': 'application/json',
    },
    data: {
      email: 'yuta322@gmail.com',
    },
  })
    .then((response: any) => {
      if (Number(response.status) == 200) {
        //console.log(response.data);
      }
    })
    .catch((e) => {
      setIsinValid(true);
      if (e.response) {
        //console.log(e.response.status);
        //console.log(e.response.data);
      }
    });
  //console.log(
  '--------logout↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑---------'
    );
  };

return (
  <KeyboardAvoidingView
    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    style={styles.container}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <View style={styles.textInputWrapper}>
            <TextInput
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
        <Button
          loading={loading}
          style={styles.button}
          onPress={() => logout()}
        >
          ログアウト
          </Button>
        <Button
          loading={loading}
          style={styles.button}
          onPress={() => getUserData()}
        >
          ユーザー情報
          </Button>
        <Button
          loading={loading}
          style={styles.button}
          onPress={() => refleshToken()}
        >
          リフレッシュ
          </Button>
        <Button
          loading={loading}
          style={styles.button}
          onPress={() => passwordReset()}
        >
          リセット
          </Button>
        <View style={styles.viewInline}>
          <Button
            compact={true}
            style={styles.buttonInline}
            onPress={() => //console.log('Pressed')}
            >
              新規登録
            </Button>
            <Button
            compact={true}
            style={styles.buttonInline}
            onPress={() => //console.log('Pressed')}
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
    padding: 5,
    maxWidth: 500,
  },
});
