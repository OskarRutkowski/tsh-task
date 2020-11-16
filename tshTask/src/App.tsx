import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from './screens/login';
import {HomeScreen} from './screens/home';
import {store, StoreProvider} from './mobx/store-provider';
import {LoggingStore} from './mobx/logging-store';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <StoreProvider value={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
