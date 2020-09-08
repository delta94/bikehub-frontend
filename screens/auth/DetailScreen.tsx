import React, { Component, useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  Button as ButtonNative,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput, Button, DefaultTheme, HelperText, Snackbar } from 'react-native-paper';
import { useColorScheme } from 'react-native-appearance';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

export default function Login({ navigation }) {
  const [isActive, setIsActive] = useState(true);
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [dispName, setDispName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'light' ? '#000000' : '#fff';
  const backgroundColor = colorScheme === 'light' ? '#fff' : '#000000';
  const topContainerColor = colorScheme === 'light' ? styles.topContainerLight : styles.topContainerDark;
  const BASE_URL = Constants.manifest.extra.authApiBaseUrl;
  const USER_PATH = Constants.manifest.extra.userPath;
  const [visible, setVisible] = useState(false);
  const [snackText, setSnackText] = useState("");
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    getUserData()
  }, []);

  useEffect(() => {
    if (isEdit) {
      getUserData()
      setVisible(true)
    }
  }, [isEdit]);

  useEffect(() => {
    if (isDelete) {
      setIsActive(false)
      setIsEdit(true)
      getUserData()
    }
  }, [isDelete]);

  const deleteUser = () =>
    Alert.alert(
      "アカウントの削除",
      "登録した燃費情報などにアクセスできなくなります。本当によろしいですか？",
      [
        {
          text: "キャンセル",
          onPress: () => //console.log("Cancel Pressed"),
            style: "cancel"
        },
        {
          text: "削除", onPress: () => { setIsDelete(true) }
        }
      ],
      { cancelable: false }
    );

  const getAccessToken = async () => {
    try {
      const value = await AsyncStorage.getItem('ACCESS_TOKEN');
      //console.log(value)
      return value;
    } catch (error) {
      return null;
    }
  }

  const logout = async () => {
    try {
      const value = await AsyncStorage.removeItem('ACCESS_TOKEN');
    } catch (error) {
      navigation.navigate('ログイン');
      return null;
    }
    navigation.navigate('ログイン');
  }

  const getUserData = () => {
    getAccessToken().then((token) => {
      sendData(token)
    })
  }
  const sendData = async (token: string) => {
    let data: any = null;
    let method: any = 'GET';
    if (isEdit) {
      if (!dispName) {
        alert("空白でニックネームは登録できません")
        return
      }
      method = 'PUT';
      data = {
        "first_name": "",
        "last_name": "",
        "username": email,
        "email": email,
        "disp_name": dispName,
        "is_active": isActive
      }
    }
    await axios({
      url: BASE_URL + USER_PATH,
      method: method,
      headers: {
        Authorization: `Bearer  ${token}`,
        'Content-Type': 'application/json',
      },
      data: data
    })
      .then((response: any) => {
        if (isDelete || response.status === 401) {
          logout()
        } else if (Number(response.status) == 200) {
          let fmtBirthday = "";
          //console.log(response.data)
          const userData = response.data
          if (userData.birthday) {
            const splitBirthday = userData.birthday.split('-')
            fmtBirthday = `${splitBirthday[0]}年${splitBirthday[1]}月${splitBirthday[2]}日`
          }
          setIsActive(userData.is_active)
          setBirthday(fmtBirthday)
          setEmail(userData.email)
          setDispName(userData.disp_name)
        }
      })
      .catch((e) => {
        if (e.response) {
          //console.log(e.response.status);
          //console.log(e.response.data);
        }
        setIsEdit(false)
        alert("ログインの有効期限が切れました再ログインしてください。")
        logout()
      });
    setIsEdit(false)
  };

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
                underlineColor={textColor}
                label="ニックネーム"
                onChangeText={(text) => {
                  setDispName(text)
                }}
                onEndEditing={() => setIsEdit(true)}
                style={{ fontSize: 20 }}
                autoCompleteType="username"
                textContentType="none"
                returnKeyType="done"
                returnKeyLabel="done"
                value={dispName}
                maxLength={50}
                disabled={false}
                theme={{
                  colors: {
                    text: textColor,
                  },
                }}
              />
              <MaterialCommunityIcons name="newspaper" size={26} />
            </View>

            <View style={styles.textInputWrapper}>
              <HelperText type="info" visible={true}>
                メールアドレス(変更できません)
              </HelperText>
              <TextInput
                underlineColor={textColor}
                label="メールアドレス"
                autoCompleteType="email"
                textContentType="emailAddress"
                returnKeyType="done"
                returnKeyLabel="ログイン"
                maxLength={50}
                value={email}
                disabled={true}
                theme={{
                  colors: {
                    text: textColor,
                  },
                }}
              />
            </View>

            <View style={styles.textInputWrapper}>
              <HelperText type="info" visible={true}>
                誕生日  (変更できません)
              </HelperText>
              <TextInput
                underlineColor={textColor}
                label="誕生日"
                autoCompleteType="password"
                textContentType="password"
                returnKeyType="done"
                returnKeyLabel="ログイン"
                maxLength={50}
                value={birthday}
                disabled={true}
                theme={{
                  colors: {
                    text: textColor,
                  },
                }}
              />
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              loading={loading}
              style={styles.button}
              onPress={() => logout()}
            >
              ログアウト
          </Button>
          </View>
          <View style={styles.buttonDangerWrapper}>
            <Button
              loading={loading}
              style={styles.buttonDanger}
              onPress={() => deleteUser()}
              color="red"
            >
              アカウントの削除
          </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{ backgroundColor: textColor }}
        action={{
          label: '消去',
          onPress: () => {
            setVisible(false)
          },
        }}>
        <Text style={{ color: backgroundColor }}>
          ニックネームを変更しました！
        </Text>
      </Snackbar>
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  buttonDanger: {
    backgroundColor: 'transparent',
    borderColor: 'red',
    borderWidth: 1,
    paddingHorizontal: 0,
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: "#c0c0c0",
    borderWidth: 1,
    paddingHorizontal: 0,
  },
  buttonDangerWrapper: {
    marginTop: 50,
    borderColor: 'red',
    borderWidth: 1,
  },
  buttonWrapper: {
    marginTop: 50,
    borderWidth: 1,
  },
  buttonInline: {
    padding: 0,
    margin: 0,
  },
  viewInline: {
    marginTop: 10,
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
    margin: "auto",
    // alignItems: 'center',
    backgroundColor: "#000000"
  },
  topContainerLight: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: "auto",
    // alignItems: 'center',
    backgroundColor: "#fff"
  },
});
