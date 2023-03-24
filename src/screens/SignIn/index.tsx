/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import React, { useState } from "react";
import { View, Text, Button, Image, TextInput } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from "./style";

//Components:
import ErrorFlash from "../../components/ErrorFlash";
import Button1 from "../../components/Button1";
/*----------------------------------------*/





const SignIn = ({ navigation }: any) => {

    /*-------------States------------------*/
    const [ errorMsg, setErrorMsg ] = useState<String>("h");
    const [ register, setRegister ] = useState<boolean>(false);
    const [ user, setUser ] = useState<string>('');
    const [ pass, setPass ] = useState('');
    /*-------------------------------------*/


    /*------------Functions----------------*/
    const handleSubmit = () => {
        //navigation.push('Home');
    }
    const closeFlash = () => {
        setErrorMsg("");
    }
    const teste = () => {

    }
    /*-------------------------------------*/

    

    return (
        <LinearGradient colors={['rgba(234,234,234,1)', 'rgba(243,243,243,1)']} style={styles.container}>
            
            {errorMsg &&
                <ErrorFlash msg="Usuário e/ou senha incorreto(s)." closeFnc={closeFlash}/>
            }
            
            {!register &&
                <View style={styles.loginBox}>
                    <Image
                        style={{width: 131, height: 131, marginBottom: 40}}
                        source={require('../../../assets/images/logo.png')}
                    />
                    
                    <View style={styles.fieldSingle}>
                        <Text style={styles.label}>Usuário:</Text>
                        <TextInput value={user} style={styles.input} onChangeText={(changeUser)=>setUser(changeUser)} />
                    </View>

                    <View style={styles.fieldSingle}>
                        <Text style={styles.label}>Senha:</Text>
                        <TextInput secureTextEntry value={pass} style={styles.input} onChangeText={(changePass)=>setPass(changePass)} />
                    </View>

                    <Button1 title="Entrar" fnc={teste} />

                    <View style={styles.link}>
                        <Text style={styles.linkText}>Não possui uma conta ainda?</Text>
                        <Text style={styles.linkText}>cadastra-se agora</Text>
                    </View>

                </View>
            }

            {register &&
                <View>
                    <View style={styles.logoBox}>
                        <Image
                            style={{width: 85, height: 85}}
                            source={require('../../../assets/images/logo.png')}
                        />
                        <Text style={styles.logoText}>Cadastre-se</Text>
                    </View>
                </View>
            }
        
        </LinearGradient>
    );
}

export default SignIn;