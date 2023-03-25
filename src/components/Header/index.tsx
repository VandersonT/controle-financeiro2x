import { View, Text, StatusBar, Image, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../../global/theme';
import { Feather } from '@expo/vector-icons';

const Header = () => {
    return (
        <View style={styles.container}>
            {/*Define cor da barra de status*/}
            <StatusBar backgroundColor={Theme.colors.secondary[700]} barStyle="light-content" />
            
            {/*Part One*/}
            <View style={styles.headerBox}>
                <View style={styles.headerInfo}>
                    <Image
                        resizeMode='contain'
                        source={require('../../../assets/images/photo1.jpg')}
                        style={{width: 57, height: 55, marginRight: 13, borderColor: '#5144DB', borderWidth: 2, borderRadius: 50}}
                    />
                    <Text style={styles.userName}>Matheus Silva</Text>
                </View>
                <Text style={styles.menuButton}>
                    <Feather name="menu" size={24} color={Theme.colors.white[700]} />
                </Text>
            </View>


            {/*Part Two*/}
            <View style={styles.infoBox}>
                <View style={styles.infoSingle}>
                    <Text style={styles.infoTitle}>Disponivel</Text>
                    <Text style={styles.money}>R$ 979.029,03</Text>
                </View>
                <LinearGradient colors={[Theme.colors.primary[300], Theme.colors.primary[700]]} style={styles.infoSingle}>
                    <View style={styles.infoTitleBox}>
                        <Text style={[styles.infoTitle, styles.infoTitle_white]}>
                            Caixinha
                        </Text>
                        <Text style={styles.infoTitle_alert}>[Clique]</Text>
                    </View>
                    <Text style={[styles.money, styles.money_white]}>R$ 709.012,00</Text>
                </LinearGradient>
            </View>
            
            <View style={styles.bgDark}>
                <View style={styles.menuBox}>
                    <ImageBackground
                        style={{width: '100%', height: 255}}
                        source={require('../../../assets/images/Landscape.png')}
                    >
                        <View style={styles.menuInfoBox}>
                            <Image 
                                source={require('../../../assets/images/photo1.jpg')}
                                style={{width: 100, height: 100, borderRadius: 50}}
                            />
                            <Text style={styles.menuTitle}>Matheus Silva</Text>
                        </View>
                    </ImageBackground>

                    <View>
                        <TouchableOpacity style={styles.optionSingle}>
                            <Text>Perfil</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionSingle}>
                            <Text>Créditos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionSingle}>
                            <Text>Sair</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        </View>
    );
}

export default Header;