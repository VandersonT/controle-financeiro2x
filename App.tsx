import React, { createContext, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigators/MainStack";

import { ContextProvider } from "./src/context/Context";

//Firebase Importas
import { getAuth, onAuthStateChanged } from "firebase/auth";
import db from "./src/config/firebase"; //Even if not using this, do not remove! Removing this will cause an options error.


const App = () => {

  const [ userLogged, setUserLogged ] = useState(false);
  const [ userTeste, setUserTeste ] = useState('teste');

  useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
              // user is logged
              setUserLogged(true);
          } else {
              // user isn't logged
              setUserLogged(false);
          }
      });

      // quando a tela for desmontada, remove o ouvinte
      return unsubscribe;
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