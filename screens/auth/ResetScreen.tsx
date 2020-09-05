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
import { TextInput, Button, DefaultTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native-appearance';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();

  // const themeItemContainer =
  //   colorScheme === 'light'
  //     ? styles.itemContainerLight
  //     : styles.itemContainerDark;
  const textColor = colorScheme === 'light' ? '#000000' : '#fff';
  const backGroundColor = colorScheme === 'light' ? '#000000' : '#fff';

  const login = () => {
    setLoading(true);
    console.log(email);
    console.log(password);
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
                onChangeText={(text) => setEmail(text)}
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
            </View>
            <View style={styles.textInputWrapper}>
              <TextInput
                underlineColor={textColor}
                label="Password"
                onChangeText={(text) => setPassword(text)}
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
            </View>
          </View>
          <Button
            loading={loading}
            style={styles.button}
            onPress={() => login()}
          >
            ログイン
          </Button>
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
