import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity } from 'react-native';
import styles from './style';
import Header2 from '../../components/Header2';
import Button1 from '../../components/Button1';
import { useContext, useState } from 'react';
import Footer from '../../components/Footer';
import { getAuth, sendPasswordResetEmail, updateEmail } from 'firebase/auth';
import firebaseErrorTranslate from '../../helpers/firebaseErrorTranslate';
import CancelButton from '../../components/CancelButton';
import { Context } from '../../context/Context';
import db from '../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditProfile = ({ navigation }: any) => {


    //Getting user's context
    const { state, dispatch } = useContext(Context);

    const [ userName, setUserName ] = useState(state.user.name);
    const [ email, setEmail ] = useState(state.user.email);


    const backToProfile = () => {
        navigation.push('Profile');
    }

    const saveInfo = async () => {

        if(!email || !userName){
            Alert.alert("Um momento amigo", "Você não pode deixar campos vazios, faz o favor de preencher ai, amigão(ona).");
            return;
        }

        //Edit email auth
        const auth = getAuth();
        const currentUser = auth.currentUser ?? undefined;

        if(currentUser)
            updateEmail(currentUser, email);
        

        //Edit in the database
        await updateDoc(doc(db, "user", state.user.id), {
            username: userName,
            email: email
        });

        //Edit on Context
        dispatch({
            type: 'CHANGE_NAME',
            payload: {
                name: userName
            }
        });

        dispatch({
            type: 'CHANGE_EMAIL',
            payload: {
                email: email
            }
        });

        navigation.push('Profile');
    }

    const resetPassword = async () => {
        
        Alert.alert(
            'Confirmação',
            `Enviaremos um email para "${email}"" com as informações de redefinição. Deseja prosseguir?`,
            [
              {
                text: 'Cancelar',
                onPress: () => {},
                style: 'cancel',
              },
              { text: 'Continuar', onPress: async () => {
                try {
                    const auth = getAuth();
                    // Enviar um e-mail de redefinição de senha para o endereço de e-mail fornecido
                    await sendPasswordResetEmail(auth, email);
                
                    // Exibir uma mensagem de sucesso ao usuário
                    Alert.alert("Corre para trocar", "Acabamos de enviar um email de redefinição para o email informado.");
                } catch (error: any) {
                    // Exibir uma mensagem de erro ao usuário
                    Alert.alert("Oops! Ocorreu um erro", firebaseErrorTranslate(error.code));;
                }
              }},
            ],
            { cancelable: false }
          );

    }

    return (
        <ScrollView style={styles.container}>

            <Header2 title='Editar Perfil' fnc={backToProfile} />

            <View style={styles.form}>
                <TextInput style={styles.inputSingle} value={userName} onChangeText={setUserName} placeholder="Digite seu nome" />
                <TextInput style={styles.inputSingle} value={email} onChangeText={setEmail} placeholder="Digite seu nome" />

                <Text style={styles.note}>Nota: Se clicar para resetar senha o email será enviado para o email que está acima.</Text>
                <View style={styles.buttonGroup}>
                    <CancelButton title="Resetar Senha" fnc={resetPassword} />
                    <Button1 title="Salvar" fnc={saveInfo} />
                </View>
            </View>

            <Footer />

        </ScrollView>
    );
}

export default EditProfile;