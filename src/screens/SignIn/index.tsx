/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import React, { useContext, useState } from "react";
import { View, Text, Button, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from "./style";
import { CheckBox } from 'react-native-elements';

//Firebase Imports
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore"; 
import db from "../../config/firebase";

//Components:
import ErrorFlash from "../../components/ErrorFlash";
import Button1 from "../../components/Button1";
import { Theme } from "../../global/theme";

//Helpers
import firebaseErrorTranslate from "../../helpers/firebaseErrorTranslate";
import SuccessFlash from "../../components/SuccessFlash";
import { Context } from "../../context/Context";
/*----------------------------------------*/




const SignIn = ({ navigation }: any) => {

    /*-------------States------------------*/
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
    /*-------------------------------------*/
    
    //Getting user's context
    const { state, dispatch } = useContext(Context);

    /*------------Functions----------------*/
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
    }

    const getUserData = async (user_id: string) => {
        const docRef = doc(db, "user", user_id);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()){
            // We have the user's data here => docSnap.data()
            saveUserDataOnContext(docSnap.data()); //save data on the context.
            return true; 
        }else{
            // docSnap.data() will be undefined in this case
            return false; 
        }
    }

    const loginAction = () => {

        if(!email || !pass){
            setErrorMsg('Preencha todos os campos.')
            return;
        }

        const auth = getAuth();


        /*Check if the user want to stay logged in*/

        signInWithEmailAndPassword(auth, email, pass)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;

            /*Get user data*/
            let ready = await getUserData(user.uid);
            
            if(ready)
                navigation.push('Home'); //Send user to Home
            else
                setErrorMsg("Ocorreu um erro ao tentar logar, tente novamente.");
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMsg(firebaseErrorTranslate(errorCode) as string);
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
            setErrorMsg(firebaseErrorTranslate(errorCode) as string);
        });
       
    }
    const handleCheck = () => {
        setChecked(!checked);
    };

    const resetPassword = async () => {
        
        try {
            const auth = getAuth();
            // Enviar um e-mail de redefinição de senha para o endereço de e-mail fornecido
            await sendPasswordResetEmail(auth, emailReset);
        
            // Exibir uma mensagem de sucesso ao usuário
            setSuccessMsg("Email de redefinição enviado.");
        } catch (error: any) {
            // Exibir uma mensagem de erro ao usuário
            setErrorMsg(firebaseErrorTranslate(error.code));
        }

    }
    /*-------------------------------------*/
    

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
                                    <TextInput value={pass} onChangeText={setPass} style={[styles.input, {marginBottom: 20}]} placeholder="Digite sua senha" />

                                    {/*<CheckBox
                                        title='Lembre de mim'
                                        checked={checked}
                                        onPress={handleCheck}
                                        containerStyle={styles.checkboxContainer}
                                        textStyle={styles.checkboxText}
                                        checkedColor="#000"
                                    />*/}

                                    <Button1 title="Entrar" fnc={loginAction} />
                                    
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
                                        onPress={handleCheck}
                                        containerStyle={styles.checkboxContainer}
                                        textStyle={styles.checkboxText}
                                        checkedColor="#000"
                                    />

                                    <Button1 title="Cadastrar" fnc={registerAction} />
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


                                    <Button1 title="Recuperar" fnc={resetPassword} />
                                    
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