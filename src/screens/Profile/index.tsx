import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './style';
import Header2 from '../../components/Header2';
import Footer from '../../components/Footer';
import Button1 from '../../components/Button1';import { FontAwesome5 } from '@expo/vector-icons';
import { Theme } from '../../global/theme';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Profile = ({ navigation }: any) => {
    
    const backToHome = () => {
        navigation.push('Home');
    }

    const editProfile = () => {

    }

    return (
        <ScrollView>
            <Header2 title='Perfil' fnc={backToHome} />

            <View style={styles.info1Box}>

                <Image
                    style={{width: 100, height: 100, borderRadius: 100}}
                    source={{uri: 'https://focalizando.com.br/sites/default/files/inline-images/Fotos-para-perfil-do-Whatsapp-masculino-1170x700.webp'}}
                />
                <Text style={styles.userName}>Matheus Silva</Text>
                
                <Button1 title="Editar" fnc={editProfile} />
            </View>

            <View style={styles.info2Box}>
                <View style={styles.infoSingle}>
                <FontAwesome5 name="user-alt" size={24} color={Theme.colors.primary[300]} />
                    <Text style={styles.infoContent}>Nome: Matheus Silva</Text>
                </View>
                <View style={styles.infoSingle}>
                    
                <MaterialCommunityIcons name="email" size={24} color={Theme.colors.primary[300]} />
                    <Text style={styles.infoContent}>Email: matheussilva12@gmail.com</Text>
                </View>
                <View style={styles.infoSingle}>
                    <MaterialCommunityIcons name="timer-sand-full" size={24} color={Theme.colors.primary[300]} />
                    <Text style={styles.infoContent}>Entrou: 12/02/2023</Text>
                </View>
            </View>

            <Footer />
        </ScrollView>
    );
}

export default Profile;