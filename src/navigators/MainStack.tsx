import React from  'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/*PAGES*/
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import MoneyJar from '../screens/MoneyJar';
import MoneyJarOpened from '../screens/MoneyJarOpened';
import Credits from '../screens/Credits';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
/****/

const MainStack = createNativeStackNavigator();

export default () => (
  
  <MainStack.Navigator>
    <MainStack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
    <MainStack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
    <MainStack.Screen name="Credits" component={Credits} options={{ headerShown: false }}/>
    <MainStack.Screen name="MoneyJarOpened" component={MoneyJarOpened} options={{ headerShown: false }}/>
    <MainStack.Screen name="MoneyJar" component={MoneyJar} options={{ headerShown: false }}/>
    <MainStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <MainStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>

  </MainStack.Navigator>
);