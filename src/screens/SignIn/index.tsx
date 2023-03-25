/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import React, { useState } from "react";
import { View, Text, Button, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from "./style";

//Components:
import ErrorFlash from "../../components/ErrorFlash";
import Button1 from "../../components/Button1";
/*----------------------------------------*/





const SignIn = ({ navigation }: any) => {

    /*-------------States------------------*/
    const [ errorMsg, setErrorMsg ] = useState<String>("");
    const [ register, setRegister ] = useState<boolean>(false);
    const [ user, setUser ] = useState<string>('');
    const [ pass, setPass ] = useState<string>('');
    const [ userRegister, setUserRegister ] = useState<string>('');
    const [ emailRegister, setEmailRegister ] = useState<string>('');
    const [ passRegister, setPassRegister ] = useState<string>('');
    const [ confirmPassRegister, setConfirmPassRegister ] = useState<string>('');
    /*-------------------------------------*/


    /*------------Functions----------------*/
    const closeFlash = () => {
        setErrorMsg("");
    }
    const loginAction = () => {

        if(!user || !pass){
            setErrorMsg('Preencha todos os campos.')
            return;
        }

        //navigation.push('Home');
    }
    const registerAction = () => {
        if(!userRegister || !emailRegister || !passRegister || !confirmPassRegister){
            setErrorMsg('Preencha todos os campos.')
            return;
        }
        //navigation.push('Home');
    }
    /*-------------------------------------*/

    

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={50} style={styles.container} behavior={(Platform.OS == "ios") ? "padding" : "height" }>
            
                <LinearGradient colors={['rgba(234,234,234,1)', 'rgba(243,243,243,1)']} style={styles.container}>

                
                    {errorMsg &&
                        <ErrorFlash msg={errorMsg} closeFnc={closeFlash}/>
                    }
                    
                    {!register &&
                        <View style={styles.mainBox}>
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

                            <Button1 title="Entrar" fnc={loginAction} />

                            <TouchableOpacity style={styles.link} onPress={() => setRegister(true)}>
                                <Text style={styles.linkText}>Não possui uma conta ainda?</Text>
                                <Text style={styles.linkText}>cadastra-se agora</Text>
                            </TouchableOpacity>

                        </View>
                    }

                    {register &&

                        <ScrollView style={{width: '100%', paddingTop: 100}}>
                            <View  style={styles.mainBox}>
                                <View style={styles.logoBox}>
                                    <Image
                                        style={{width: 85, height: 85}}
                                        source={require('../../../assets/images/logo.png')}
                                    />
                                    <Text style={styles.logoText}>Cadastre-se</Text>
                                </View>

                                <View style={styles.fieldSingle}>
                                    <Text style={styles.label}>Usuário:</Text>
                                    <TextInput value={userRegister} style={styles.input} onChangeText={(e)=>setUserRegister(e)} />
                                </View>
                                
                                <View style={styles.fieldSingle}>
                                    <Text style={styles.label}>Email:</Text>
                                    <TextInput value={emailRegister} style={styles.input} onChangeText={(e)=>setEmailRegister(e)} />
                                </View>

                                <View style={styles.fieldSingle}>
                                    <Text style={styles.label}>Senha:</Text>
                                    <TextInput secureTextEntry value={passRegister} style={styles.input} onChangeText={(e)=>setPassRegister(e)} />
                                </View>

                                <View style={styles.fieldSingle}>
                                    <Text style={styles.label}>Confirmar Senha:</Text>
                                    <TextInput secureTextEntry value={confirmPassRegister} style={styles.input} onChangeText={(e)=>setConfirmPassRegister(e)} />
                                </View>

                                <Button1 title="Cadastrar" fnc={registerAction} />

                                <TouchableOpacity style={styles.link} onPress={() => setRegister(false)}>
                                    <Text style={styles.linkText}>Já possui uma conta?</Text>
                                    <Text style={styles.linkText}>Entre agora</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    }
                
                </LinearGradient>
        </KeyboardAvoidingView>
    );
}

export default SignIn;