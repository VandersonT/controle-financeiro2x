import React from  'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/*PAGES*/
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
/****/

const MainStack = createNativeStackNavigator();

export default () => (
  <MainStack.Navigator>

    <MainStack.Screen name="SignIn" component={SignIn} />
    <MainStack.Screen name="Home" component={Home} />

  </MainStack.Navigator>
);