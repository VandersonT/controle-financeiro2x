/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import React, { useState } from "react";
import { View, Text, Button, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from "./style";
import { CheckBox } from 'react-native-elements';

//Firebase Imports
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore"; 
import db from "../../config/firebase";

//Components:
import ErrorFlash from "../../components/ErrorFlash";
import Button1 from "../../components/Button1";
import { Theme } from "../../global/theme";

//Helpers
import errorTranslate from "../../helpers/firebaseErrorTranslate";
/*----------------------------------------*/





const SignIn = ({ navigation }: any) => {

    /*-------------States------------------*/
    const [ errorMsg, setErrorMsg ] = useState<String>("");
    const [ register, setRegister ] = useState<boolean>(false);
    const [ email, setEmail ] = useState<string>('');
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

        if(!email || !pass){
            setErrorMsg('Preencha todos os campos.')
            return;
        }

        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            //Send user to Home
            navigation.push('Home');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMsg(errorTranslate(errorCode) as string);
        });

    }

    const registerAction = async () => {
        if(!userRegister || !emailRegister || !passRegister || !confirmPassRegister){
            setErrorMsg('Preencha todos os campos.');
            return;
        }

        if(passRegister != confirmPassRegister){
            setErrorMsg('As senhas não coincidem.');
            return;
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, emailRegister, passRegister)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            
            /*Saving necessary user data to Firestore*/
            const userRef = collection(db, "user");

            await setDoc(doc(userRef, user.uid), {
                username: userRegister,
                email: emailRegister,
                avatar: "noPhoto.png"
            });
            /******/
            
            //Send user to Home
            navigation.push('Home');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMsg(errorTranslate(errorCode) as string);
        });
       
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

                                    <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Digite seu email" />
                                    <TextInput value={pass} onChangeText={setPass} style={[styles.input, {marginBottom: 0}]} placeholder="Digite sua senha" />

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

                                    <TextInput style={styles.input} placeholder="Digite seu usuário" value={userRegister} onChangeText={setUserRegister} />
                                    <TextInput style={styles.input} placeholder="Digite seu email" value={emailRegister} onChangeText={setEmailRegister} />
                                    <TextInput secureTextEntry={checked ? false : true} style={styles.input} value={passRegister} onChangeText={setPassRegister} placeholder="Digite sua senha" />
                                    <TextInput secureTextEntry={checked ? false : true} style={[styles.input, {marginBottom: 0}]} value={confirmPassRegister} onChangeText={setConfirmPassRegister} placeholder="Confirme sua senha" />

                                    <CheckBox
                                        title='Exibir senhas'
                                        checked={checked}
                                        onPress={handleCheck}
                                        containerStyle={styles.checkboxContainer}
                                        textStyle={styles.checkboxText}
                                        checkedColor="#000"
                                    />

                                    <Button1 title="Cadastrar" fnc={registerAction} />
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