import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigators/MainStack";

import { Context, ContextProvider } from "./src/context/Context";

//Firebase Importas
import { getAuth, onAuthStateChanged } from "firebase/auth";
import db from "./src/config/firebase"; //Even if not using this, do not remove! Removing this will cause an options error.
import getUserData from "./src/querys/user/getUserData";


const App = () => {

  const [ userLogged, setUserLogged ] = useState(false);

  useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if(user){
              
            setUserLogged(true); //Defining the user as logged

          }else{
              setUserLogged(false); //Sets user as logged out.
          }
      });

      return unsubscribe; //When the screen is unmounted, remove the listener.
  });

  return (
    <ContextProvider>
      <NavigationContainer>
        <MainStack userLogged={userLogged} />
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;