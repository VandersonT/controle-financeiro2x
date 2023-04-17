import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
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

const avatarsAvailable = [
    {id: '1', name: 'Hacker', image: 'https://pbs.twimg.com/media/FK_euX0WYAQW5fv.jpg'},
    {id: '2', name: 'Leão', image: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80'},
    {id: '3', name: 'Lobo', image: 'https://t4.ftcdn.net/jpg/05/64/10/99/360_F_564109909_5G38uqAWzT9U3seGi6IKcNjOtTJFfdPG.jpg'},
]

const currentUserAvatarName = 'Leão';


const EditProfile = ({ navigation }: any) => {

    //Getting user's context
    const { state, dispatch } = useContext(Context);

    //Getting user avatar to set as a default value in selectedOption state
    let selectedIndex = avatarsAvailable.findIndex(avatar => avatar.image === state.user.avatar);
    if(selectedIndex === -1) selectedIndex = 0; //ant-crash

    /*----------------------------------------*/
    /*               STATES                   */
    /*----------------------------------------*/
    const [ userName, setUserName ] = useState(state.user.name);
    const [ email, setEmail ] = useState(state.user.email);
    const [selectedOption, setSelectedOption] = useState(avatarsAvailable[selectedIndex]);
    const [isOpen, setIsOpen] = useState(false);


    /*----------------------------------------*/
    /*             FUNCTIONS                  */
    /*----------------------------------------*/
    const backToProfile = () => {
        navigation.push('Profile');
    }

    const saveInfo = async () => {
        
        if(email == state.user.email && userName == state.user.name && selectedOption.image == state.user.avatar){
            Alert.alert("Um momento amigo", "Você não fez nenhuma alteração para que possa salvar.");
            return;
        }
        
        if(!email || !userName || !selectedOption.image){
            Alert.alert("Um momento amigo", "Você não pode deixar campos vazios, faz o favor de preencher ai, amigão(ona).");
            return;
        }

        //Edit email auth
        const auth = getAuth();
        const currentUser = auth.currentUser ?? undefined;

        if(email != state.user.email && currentUser)
            updateEmail(currentUser, email);
        

        //Edit in the database
        await updateDoc(doc(db, "user", state.user.id), {
            username: userName,
            email: email,
            avatar: selectedOption.image
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

    const handleOptionPress = (option:any) => {

        if(option.id == '0')
            return;

        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <ScrollView style={styles.container}>

            <Header2 title='Editar Perfil' fnc={backToProfile} />

            <View style={styles.form}>

                <Text style={styles.labelAvatar}>Escolha um Avatar:</Text>
                <View style={styles.selectAvatarBox}>
                    <TouchableOpacity style={[styles.selectBox, {marginBottom: 10}]} onPress={() => setIsOpen(!isOpen)}>
                        <Image
                            style={{width: 100, height: 100, borderRadius: 3}}
                            source={{uri: selectedOption['image']}}
                        />
                        <Text style={[styles.imageName, styles.avatarSelected]}>{selectedOption.name}</Text>
                    </TouchableOpacity>
                    {isOpen && (
                        <View style={styles.boxAvatars}>

                            {avatarsAvailable.map((option) => (
                                <TouchableOpacity
                                    key={option.id}
                                    onPress={() => handleOptionPress(option)}
                                    style={styles.avatarSingle}
                                >
                                    <Image
                                        style={{width: 100, height: 100, borderRadius: 3}}
                                        source={{uri: option['image']}}
                                    />
                                    <Text style={[styles.imageName, option.id == selectedOption.id ? styles.avatarSelected : null]}>{option.name}</Text>
                                </TouchableOpacity>
                            ))}

                        </View>
                    )}
                </View>
                
                <Text style={styles.labelAvatar}>Suas Informações:</Text>

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