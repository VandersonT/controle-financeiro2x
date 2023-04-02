import React from  'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/*PAGES*/
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import MoneyJar from '../screens/MoneyJar';
import MoneyJarOpened from '../screens/MoneyJarOpened';
/****/

const MainStack = createNativeStackNavigator();

export default () => (
  
  <MainStack.Navigator>
    <MainStack.Screen name="MoneyJarOpened" component={MoneyJarOpened} options={{ headerShown: false }}/>
    <MainStack.Screen name="MoneyJar" component={MoneyJar} options={{ headerShown: false }}/>
    <MainStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <MainStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>

  </MainStack.Navigator>
);