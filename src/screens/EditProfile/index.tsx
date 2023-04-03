import { View, Text, TextInput, ScrollView } from 'react-native';
import styles from './style';
import Header2 from '../../components/Header2';
import Button1 from '../../components/Button1';
import { useState } from 'react';
import { CheckBox } from 'react-native-elements';
import Footer from '../../components/Footer';

const EditProfile = ({ navigation }: any) => {

    const [ userName, setUserName ] = useState('Matheus Silva');
    const [ email, setEmail ] = useState('matheusilva12@gmail.com');
    const [ password, setPassword ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [checked, setChecked] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);

    const backToProfile = () => {
        navigation.push('Profile');
    }

    const saveInfo = () => {

        //edita no banco de dados

        navigation.push('Profile');
    }

    const handleCheck = () => {
        setChecked(!checked);
        setShowNewPass(!showNewPass);
    };

    return (
        <ScrollView style={styles.container}>

            <Header2 title='Editar Perfil' fnc={backToProfile} />

            <View style={styles.form}>
                <TextInput style={styles.inputSingle} value={userName} onChangeText={setUserName} placeholder="Digite seu nome" />
                <TextInput style={styles.inputSingle} value={email} onChangeText={setEmail} placeholder="Digite seu nome" />
                <TextInput style={styles.inputSingle} value={password} onChangeText={setPassword} placeholder="Digite sua senha atual" />
                <Text style={styles.note}>Só digite a senha se for colocar uma nova abaixo.</Text>
                <TextInput secureTextEntry={showNewPass ? false : true} style={styles.inputSingle} value={newPassword} onChangeText={setNewPassword} placeholder="Digite sua nova senha (Opcional)" />
                
                <CheckBox
                    title='Mostrar Senha'
                    checked={checked}
                    onPress={handleCheck}
                    containerStyle={styles.checkboxContainer}
                    textStyle={styles.checkboxText}
                    checkedColor="#000"
                />

                <Button1 title="Salvar" fnc={saveInfo} />
            </View>

            <Footer />

        </ScrollView>
    );
}

export default EditProfile;