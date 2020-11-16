import {observer} from 'mobx-react';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useStore} from '../mobx/use-store';
import {globalStyle} from '../styles/styles';
import {ScreenNavigationProp, ScreenRouteProp} from '../types';

export interface Props {
  route: ScreenRouteProp<'Login'>;
  navigation: ScreenNavigationProp<'Login'>;
}

export const LoginScreen: React.FC<Props> = observer(
  ({route, navigation}: Props) => {
    const LoggingStore = useStore().loggingStore;

    const logIn = async () => {
      await LoggingStore.logIn({username: 'userTest', password: 'userTest'});
      if (LoggingStore.isLoggedIn) {
        navigation.navigate('Home');
      }
    };

    return (
      <View style={s.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={{marginHorizontal: 24}}>
          <TouchableOpacity
            style={globalStyle.logButton}
            onPress={() => logIn()}>
            <Text style={globalStyle.logButtonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  logButton: {
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4460F7',
    borderRadius: 4,
  },
  logButtonText: {
    color: 'white',
  },
});
