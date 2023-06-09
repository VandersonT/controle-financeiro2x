import React, { useEffect, useState } from  'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Firebase Importas
import { getAuth, onAuthStateChanged } from "firebase/auth";
import db from '../config/firebase'; //Even if not using this, do not remove! Removing this will cause an options error.

/*PAGES*/
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import MoneyJar from '../screens/MoneyJar';
import MoneyJarOpened from '../screens/MoneyJarOpened';
import Charts from '../screens/Charts';
import Credits from '../screens/Credits';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import Splash from '../screens/Splash';
/****/


const MainStack = createNativeStackNavigator();


export default ({ userLogged }) => {

  return(
  
    <MainStack.Navigator>
      
      {userLogged 
      ?
        <>
          <MainStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <MainStack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
          <MainStack.Screen name="Charts" component={Charts} options={{ headerShown: false }}/>
          <MainStack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
          <MainStack.Screen name="Credits" component={Credits} options={{ headerShown: false }}/>
          <MainStack.Screen name="MoneyJarOpened" component={MoneyJarOpened} options={{ headerShown: false }}/>
          <MainStack.Screen name="MoneyJar" component={MoneyJar} options={{ headerShown: false }}/>
        </>
      :
        <>
          <MainStack.Screen name="Splash" component={Splash} options={{gestureEnabled: false, headerShown: false }}/>
          <MainStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }}/>
        </>
      }
  
    </MainStack.Navigator>


  )
};
