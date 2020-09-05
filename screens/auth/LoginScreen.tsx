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
    console.log(isEmailEmpty);
    console.log(isPasswordEmpty);
    console.log('email');
    console.log(email);
    console.log(password);
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
    fetchArticles().then(() => {
      setLoading(false);
    });
  };

  const fetchArticles = async () => {
    await axios({
      url: BASE_URL + LOGIN_PATH,
      method: 'POST',
      headers: {
        Authorization: API_KEY,
        'Content-Type': 'application/json',
      },
      data: {
        email: email,
        password: password,
      },
    })
      .then((response: any) => {
        if (Number(response.status) == 200) {
        } else {
          setIsinValid(true);
        }
      })
      .catch((e) => {
        setIsinValid(true);
        if (e.response) {
          console.log(e.response.data); // => the response payload
        }
        console.log(e);
      });
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
          <View style={styles.viewInline}>
            <Button
              compact={true}
              style={styles.buttonInline}
              onPress={() => console.log('Pressed')}
            >
              新規登録
            </Button>
            <Button
              compact={true}
              style={styles.buttonInline}
              onPress={() => console.log('Pressed')}
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
