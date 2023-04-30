/*--------------------------------------------------------------------------*/
/*                                IMPORTS                                   */
/*--------------------------------------------------------------------------*/
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, BackHandler } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from "./style";
import { CheckBox } from 'react-native-elements';
import { v4 as uuidv4 } from 'uuid';

//Firebase Imports
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore"; 
import db from "../../config/firebase";

//Components:
import ErrorFlash from "../../components/ErrorFlash";
import Button2 from "../../components/Button2";

//Helpers
import firebaseErrorTranslate from "../../helpers/firebaseErrorTranslate";
import SuccessFlash from "../../components/SuccessFlash";
import { Context } from "../../context/Context";
import authentication from "../../querys/user/authentication";

//Querys
import getUserData from "../../querys/user/getUserData";
import registerNewUser from "../../querys/user/registerNewUser";
/*--------------------------------------------------------------------------*/




const SignIn = ({ navigation }: any) => {


    //Getting user's context
    const { state, dispatch } = useContext(Context);


    /*----------------------------------------*/
    /*               STATES                   */
    /*----------------------------------------*/
    const [ errorMsg, setErrorMsg ] = useState<string>("");
    const [ successMsg, setSuccessMsg ] = useState<string>("");
    const [ currentScreen, setCurrentScreen ] = useState<number>(1);/*1: Login | 2: Register | 3: Reset Password*/
    const [ emailReset, setEmailReset ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ pass, setPass ] = useState<string>('');
    const [ userRegister, setUserRegister ] = useState<string>('');
    const [ emailRegister, setEmailRegister ] = useState<string>('');
    const [ passRegister, setPassRegister ] = useState<string>('');
    const [ confirmPassRegister, setConfirmPassRegister ] = useState<string>('');
    const [checked, setChecked] = useState(false);
    /*----------------------------------------*/
    

    
    /*----------------------------------------*/
    /*            USER-EFFECTS                */
    /*----------------------------------------*/
    useEffect(() => {
        //Preventing the user from returning to the splash screen
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
    }, []);
    /*----------------------------------------*/



    /*----------------------------------------*/
    /*             FUNCTIONS                  */
    /*----------------------------------------*/
    const closeFlash = () => {
        setErrorMsg("");
        setSuccessMsg("");
    }


    const saveUserDataOnContext = (user: any) => {

        dispatch({
            type: 'CHANGE_NAME',
            payload: {
                name: user.username
            }
        });

        dispatch({
            type: 'CHANGE_ID',
            payload: {
                id: user.id
            }
        });

        dispatch({
            type: 'CHANGE_EMAIL',
            payload: {
                email: user.email
            }
        });

        dispatch({
            type: 'CHANGE_AVATAR',
            payload: {
                avatar: user.avatar
            }
        });

        dispatch({
            type: 'CHANGE_CREATEDAT',
            payload: {
                created_at: user.created_at
            }
        });

        dispatch({
            type: 'CHANGE_AVAILABLEBALANCE',
            payload: {
                available_balance: user.available_balance
            }
        });

        dispatch({
            type: 'CHANGE_MONEYJARBALANCE',
            payload: {
                moneyJar_balance: user.moneyJar_balance
            }
        });

        dispatch({
            type: 'CHANGE_TOTALMONEYJARS',
            payload: {
                totalMoneyJars: user.totalMoneyJars
            }
        });
    }


    const loginAction = async () => {
        
        //Check empty fields
        if(!email || !pass){
            setErrorMsg('Preencha todos os campos.')
            return;
        }

        //Log in user
        let res = await authentication(email, pass);

        
        //Authenticated user, now let's try their data in context.
        if(res.loggedUserId){
            
            let loggedUser = await getUserData(res.loggedUserId); /*Get logged user data*/
            
            if(loggedUser){
                
                saveUserDataOnContext(loggedUser); //Save user data on Context

            }else{
                /*Se entrou aqui, a autenticação foi bem sucedida, o problema aqui é que este usuário
                apesar de ter uma conta no firebase authenticate, não possui seus dados no firebase
                firestore. É praticamente raro isso acontecer, pois, ao registrar o usuário o código
                já cria automaticamente uma conta no firestore. Mas caso entre aqui, você saberá o porque. ;)*/
                setErrorMsg("Ocorreu um erro ao tentar logar, tente novamente.");
                console.log("Erro! Leia o comentario do arquivo SignIn > index.js linha 143.");
            }

            return;

        }else if(res.errorMsg){
            setErrorMsg(res.errorMsg);
        }
        
    }

    
    const registerAction = async () => {

        //Check empty Fields
        if(!userRegister || !emailRegister || !passRegister || !confirmPassRegister){
            setErrorMsg('Preencha todos os campos.');
            return;
        }

        //Check if the passwords match.
        if(passRegister != confirmPassRegister){
            setErrorMsg('As senhas não coincidem.');
            return;
        }

        //Try to create a new user
        let res = await registerNewUser(emailRegister, passRegister, userRegister);

        
        //If the user was registered successfully, save the data in the context;
        //otherwise, return an error message.
        if(res.loggedUser)
            saveUserDataOnContext(res.loggedUser);
        else if(res.errorMsg)
            setErrorMsg(res.errorMsg);
        
    }


    const resetPassword = async () => {
        
        try{

            const auth = getAuth();

            //Send a password reset email to the provided email address.
            await sendPasswordResetEmail(auth, emailReset);
        
            //Display a success message to the user.
            setSuccessMsg("Email de redefinição enviado.");

        }catch(error: any){

            //Display an error message to the user.
            setErrorMsg(firebaseErrorTranslate(error.code));
            
        }

    }
    /*----------------------------------------*/
    

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={100} style={styles.container} behavior={(Platform.OS == "ios") ? "padding" : "height" }>
            
                <View style={styles.container}>

                    {errorMsg &&
                        <ErrorFlash msg={errorMsg} closeFnc={closeFlash}/>
                    }

                    {successMsg &&
                        <SuccessFlash msg={successMsg} closeFnc={closeFlash} />
                    }

                    {currentScreen === 1 &&
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
                                    <TextInput secureTextEntry value={pass} onChangeText={setPass} style={[styles.input, {marginBottom: 20}]} placeholder="Digite sua senha" />


                                    <Button2 title="Entrar" fnc={loginAction} />
                                    
                                    <TouchableOpacity onPress={() => setCurrentScreen(3)}>
                                        <Text style={[styles.link, {marginTop: 20}]}>Esqueci minha senha</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => setCurrentScreen(2)}>
                                        <Text style={[styles.link, {marginTop: 10}]}>Não possuo uma conta</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    }

                    {currentScreen === 2 &&
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
                                        onPress={() => setChecked(!checked)}
                                        containerStyle={styles.checkboxContainer}
                                        textStyle={styles.checkboxText}
                                        checkedColor="#000"
                                    />

                                    <Button2 title="Cadastrar" fnc={registerAction} />
                                    <TouchableOpacity onPress={() => setCurrentScreen(1)}>
                                        <Text style={[styles.link, {marginTop: 20}]}>Já possuo uma conta</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    }

                    {currentScreen === 3 &&
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
                                        <Text style={styles.title1}>Resetar</Text>
                                        <Text  style={styles.title2}>Senha</Text>
                                    </View>

                                    <TextInput value={emailReset} onChangeText={setEmailReset} style={styles.input} placeholder="Digite o email da conta" />


                                    <Button2 title="Recuperar" fnc={resetPassword} />
                                    
                                    <TouchableOpacity onPress={() => setCurrentScreen(1)}>
                                        <Text style={[styles.link, {marginTop: 20}]}>Lembro a senha</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => setCurrentScreen(2)}>
                                        <Text style={[styles.link, {marginTop: 10}]}>Não possuo uma conta</Text>
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