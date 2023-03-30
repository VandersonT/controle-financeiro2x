/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import React, { useState } from "react";
import { View, Text, Button, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from "./style";
import { CheckBox } from 'react-native-elements';

//Components:
import ErrorFlash from "../../components/ErrorFlash";
import Button1 from "../../components/Button1";
import { Theme } from "../../global/theme";
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
    const [checked, setChecked] = useState(false);
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

        navigation.push('Home');
    }
    const registerAction = () => {
        if(!userRegister || !emailRegister || !passRegister || !confirmPassRegister){
            setErrorMsg('Preencha todos os campos.')
            return;
        }
        navigation.push('Home');
    }
    const handleCheck = () => {
        setChecked(!checked);
    };
    /*-------------------------------------*/

    

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.container} behavior={(Platform.OS == "ios") ? "padding" : "height" }>
            
                <View style={styles.container}>

                
                    {errorMsg &&
                        <ErrorFlash msg={errorMsg} closeFnc={closeFlash}/>
                    }
                    
                    {!register &&
                        <View style={styles.mainBox}>
                            <ScrollView style={{width: '100%', flexGrow: 1}}>
                                <Image
                                    style={{width: '100%'}}
                                    source={require('../../../assets/images/topDetail2.png')}
                                />

                                <View style={styles.formBox}>
                                    <Image
                                        style={{width: 104, height: 104, borderRadius: 60}}
                                        source={require('../../../assets/images/logo.jpg')}
                                    />
                                    <View style={styles.titleBox}>
                                        <Text style={styles.title1}>Controle</Text>
                                        <Text  style={styles.title2}>Financeiro</Text>
                                    </View>

                                    <TextInput value={user} onChangeText={setUser} style={styles.input} placeholder="Digete seu email" />
                                    <TextInput value={pass} onChangeText={setPass} style={[styles.input, {marginBottom: 0}]} placeholder="Digete sua senha" />

                                    <CheckBox
                                        title='Lembre de mim'
                                        checked={checked}
                                        onPress={handleCheck}
                                        containerStyle={styles.checkboxContainer}
                                        textStyle={styles.checkboxText}
                                        checkedColor="#000"
                                    />

                                    <Button1 title="Entrar" fnc={loginAction} />
                                    <TouchableOpacity onPress={() => setRegister(true)}>
                                        <Text style={styles.link}>Não possuo uma conta</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    }

                    {register &&
                        <View style={styles.mainBox}>
                            <ScrollView style={{width: '100%', flexGrow: 1}}>
                                <Image
                                    style={{width: '100%'}}
                                    source={require('../../../assets/images/topDetail2.png')}
                                />

                                <View style={styles.formBox}>
                                    <Image
                                        style={{width: 104, height: 104, borderRadius: 60}}
                                        source={require('../../../assets/images/logo.jpg')}
                                    />
                                    <View style={styles.titleBox}>
                                        <Text style={styles.title1}>Controle</Text>
                                        <Text  style={styles.title2}>Financeiro</Text>
                                    </View>

                                    <TextInput style={styles.input} placeholder="Digete seu usuário" />
                                    <TextInput style={styles.input} placeholder="Digete seu email" />
                                    <TextInput secureTextEntry={checked ? false : true} style={styles.input} placeholder="Digete sua senha" />
                                    <TextInput secureTextEntry={checked ? false : true} style={[styles.input, {marginBottom: 0}]} placeholder="Confirme sua senha" />

                                    <CheckBox
                                        title='Exibir senhas'
                                        checked={checked}
                                        onPress={handleCheck}
                                        containerStyle={styles.checkboxContainer}
                                        textStyle={styles.checkboxText}
                                        checkedColor="#000"
                                    />

                                    <Button1 title="Entrar" fnc={registerAction} />
                                    <TouchableOpacity onPress={() => setRegister(false)}>
                                        <Text style={styles.link}>Já possuo uma conta</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    }
                
                </View>
        </KeyboardAvoidingView>
    );
}

export default SignIn;