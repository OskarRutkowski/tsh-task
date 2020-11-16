import {observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useStore} from '../mobx/use-store';
import {colors, fonts} from '../styles/styles';
import {ScreenNavigationProp, ScreenRouteProp} from '../types';

export interface Props {
  route: ScreenRouteProp<'Login'>;
  navigation: ScreenNavigationProp<'Login'>;
}

export const LoginScreen: React.FC<Props> = observer(
  ({route, navigation}: Props) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const passwordInputRef = useRef<any>(null);

    const LoggingStore = useStore().loggingStore;

    useEffect(() => {
      passwordInputRef.current!.setNativeProps({
        style: {fontFamily: fonts.normal.n600},
      });
    }, []);

    const logIn = async () => {
      await LoggingStore.logIn({username: username, password: password});
      if (LoggingStore.isLoggedIn) {
        navigation.navigate('Home');
      }
    };

    const checkCreds = () => {
      if (username === '') {
        LoggingStore.setError('Empty fields');
      } else {
        logIn();
      }
    };
    console.log('err', LoggingStore.error);
    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={{marginHorizontal: 24, flex: 1, justifyContent: 'center'}}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>join.tsh.io</Text>
          </View>
          <ScrollView
            style={{flex: 0.8}}
            contentContainerStyle={{justifyContent: 'center'}}>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.logoTextLogin}>Login</Text>
              <Text style={styles.infoText}>Username</Text>
              <View style={styles.input}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <TextInput
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    underlineColorAndroid="transparent"
                    placeholder="Enter username"
                    placeholderTextColor={colors.darkGrey}
                    style={styles.inputText}
                  />
                </TouchableWithoutFeedback>
              </View>
              <Text style={styles.infoText}>Password</Text>
              <View style={styles.input}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <TextInput
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    placeholder="Enter password"
                    placeholderTextColor={colors.darkGrey}
                    secureTextEntry
                    style={styles.inputText}
                    ref={passwordInputRef}
                  />
                </TouchableWithoutFeedback>
              </View>
              <TouchableOpacity
                style={styles.logButton}
                onPress={() => checkCreds()}
                disabled={LoggingStore.loading}>
                {LoggingStore.loading ? (
                  <ActivityIndicator
                    size={16}
                    color={colors.white}
                    style={{flex: 1, padding: 3}}
                  />
                ) : (
                  <Text style={styles.logButtonText}>Log in</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.link}>
                <Text style={styles.linkText}>Forgot password?</Text>
              </TouchableOpacity>
              <Text style={styles.errorText}>{LoggingStore.error}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  logButton: {
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
    borderRadius: 4,
    marginTop: 56,
  },
  logButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.normal.n600,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  logoContainer: {
    flex: 0.2,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 24,
    fontFamily: fonts.normal.n600,
    color: colors.black,
    textAlignVertical: 'center',
  },
  logoTextLogin: {
    fontFamily: fonts.normal.n600,
    fontSize: 30,
    color: colors.black,
    textAlignVertical: 'center',
    marginTop: 70,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 8,
    maxHeight: 48,
    justifyContent: 'center',
  },
  inputText: {
    fontFamily: fonts.normal.n600,
    fontSize: 14,
    color: colors.black,
    fontWeight: 'normal',
  },
  link: {
    paddingVertical: 12,
    justifyContent: 'center',
  },
  linkText: {
    fontSize: 14,
    fontFamily: fonts.normal.n600,
    textDecorationLine: 'underline',
    color: colors.darkGrey,
  },
  infoText: {
    fontSize: 14,
    fontFamily: fonts.normal.n600,
    color: colors.black,
    paddingBottom: 8,
    paddingTop: 22,
  },
  errorText: {
    fontSize: 14,
    fontFamily: fonts.normal.n600,
    color: colors.black,
    paddingBottom: 8,
    paddingTop: 22,
    textAlign: 'center',
  },
});
