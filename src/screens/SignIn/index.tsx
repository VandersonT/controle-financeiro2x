/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import React from "react";
import { View, Text, Button, Image } from 'react-native';
import styles from "./style";
import { LinearGradient } from "expo-linear-gradient";

//Components:
import ErrorFlash from "../../components/ErrorFlash";

/*-----------------------------------------*/

const SignIn = ({ navigation }: any) => {

    /*------------Functions----------------*/
    const handleSubmit = () => {
        navigation.push('Home');
    }
    /*-------------------------------------*/

    const teste = () => {
        
    }

    return (
        <LinearGradient colors={['rgba(234,234,234,1)', 'rgba(243,243,243,1)']} style={styles.container}>
        
            <ErrorFlash msg="Usuário e/ou senha incorreto(s)." closeFnc={teste}/>
            
            <Button title="Entrar" onPress={handleSubmit} />
        
        </LinearGradient>
    );
}

export default SignIn;