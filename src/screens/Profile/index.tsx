import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './style';
import Header2 from '../../components/Header2';
import Footer from '../../components/Footer';
import Button1 from '../../components/Button1';import { FontAwesome5 } from '@expo/vector-icons';
import { Theme } from '../../global/theme';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import dateFormat from '../../helpers/dateFormat';

const Profile = ({ navigation }: any) => {
    
    //Getting user's context
    const { state, dispatch } = useContext(Context);

    const backToHome = () => {
        navigation.push('Home');
    }

    const editProfile = () => {
        navigation.push('EditProfile');
    }

    return (
        <ScrollView>
            <Header2 title='Perfil' fnc={backToHome} />

            <View style={styles.info1Box}>

                <Image
                    style={{width: 100, height: 100, borderRadius: 100}}
                    source={{uri: 'https://focalizando.com.br/sites/default/files/inline-images/Fotos-para-perfil-do-Whatsapp-masculino-1170x700.webp'}}
                />
                <Text style={styles.userName}>{state.user.name}</Text>
                
                <Button1 title="Editar" fnc={editProfile} />
            </View>

            <View style={styles.info2Box}>
                <View style={styles.infoSingle}>
                <FontAwesome5 name="user-alt" size={24} color={Theme.colors.primary[300]} />
                    <Text style={styles.infoContent}>Nome: {state.user.name}</Text>
                </View>
                <View style={styles.infoSingle}>
                    
                <MaterialCommunityIcons name="email" size={24} color={Theme.colors.primary[300]} />
                    <Text style={styles.infoContent}>Email: {state.user.email}</Text>
                </View>
                <View style={styles.infoSingle}>
                    <MaterialCommunityIcons name="timer-sand-full" size={24} color={Theme.colors.primary[300]} />
                    <Text style={styles.infoContent}>Entrou: {dateFormat(state.user.created_at)}</Text>
                </View>
            </View>

            <Footer />
        </ScrollView>
    );
}

export default Profile;