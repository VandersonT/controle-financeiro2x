/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import { View, Text, StatusBar, Image, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import styles from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../../global/theme';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import BrazilianRealFormat from '../../helpers/BrazilianRealFormat';
import { AntDesign } from '@expo/vector-icons';

type Props = {
    nav: any,
    showMoney?: boolean,
    totalMoneyAvailable?: number,
    stash?: number
}


const Header = ({ nav, showMoney = true, totalMoneyAvailable = 0, stash = 0 }: Props) => {
    /*----------------------------------------*/
    /*               STATES                   */
    /*----------------------------------------*/
    const [ menuOpened, setMenuOpened] = useState(false);

    /*----------------------------------------*/
    /*             FUNCTIONS                  */
    /*----------------------------------------*/
    
    const logOut = () => {

        //Desloga o cara aqui

        nav.push('SignIn');
    }

    const moneyJar = () => {

        //Se quiser fazer uma verificação futura pedindo senha, coloque aqui

        nav.push('MoneyJar');
    }
    
    return (
        <View style={showMoney && styles.margimBottom}>
            
            <View style={styles.container}>
                
                {/*Define cor da barra de status*/}
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
                
                {/*Part One*/}
                <View style={styles.headerBox}>
                    <View style={styles.headerInfo}>
                        <Image
                            resizeMode='contain'
                            source={require('../../../assets/images/noPhoto.png')}
                            style={{width: 57, height: 55, marginRight: 13, borderColor: '#5144DB', borderWidth: 2, borderRadius: 50}}
                        />
                        <Text style={styles.userName}>Matheus Silva</Text>
                    </View>
                    <TouchableOpacity onPress={() => setMenuOpened(true)}>
                        <Text style={styles.menuButton}>
                            <Feather name="menu" size={24} color={Theme.colors.white[700]} />
                        </Text>
                    </TouchableOpacity>
                </View>


                {/*Part Two*/}
                {showMoney &&
                    <View style={styles.infoBox}>
                        <View style={styles.infoSingle}>
                            <Text style={styles.infoTitle}>Disponivel</Text>
                            <Text style={styles.money}>{BrazilianRealFormat(totalMoneyAvailable)}</Text>
                        </View>
                        <View style={styles.infoSingle}>
                            <TouchableOpacity style={styles.infoTitleBox} onPress={moneyJar}>
                                <Text style={styles.infoTitle}>
                                    Caixinha
                                </Text>
                                <Text style={styles.infoTitle_alert}>[Clique]</Text>
                            </TouchableOpacity>
                            <Text style={styles.money}>{BrazilianRealFormat(stash)}</Text>
                        </View>
                    </View>
                }
                
                {menuOpened &&
                    <Modal>
                        <View style={styles.menuBox}>
                            <ImageBackground
                                style={{width: '100%', height: 255}}
                                source={require('../../../assets/images/Landscape.png')}
                            >
                                <View style={styles.menuInfoBox}>

                                    <TouchableOpacity style={styles.closeMenu} onPress={() => setMenuOpened(false)}>
                                        <AntDesign name="close" size={30} color={Theme.colors.white[700]} />
                                    </TouchableOpacity>

                                    <Image 
                                        source={require('../../../assets/images/noPhoto.png')}
                                        style={{width: 100, height: 100, borderRadius: 50}}
                                    />
                                    <Text style={styles.menuTitle}>Matheus Silva</Text>
                                </View>
                            </ImageBackground>

                            <View>
                                <TouchableOpacity style={styles.optionSingle} onPress={() => nav.push('Profile')}>
                                    <Text style={styles.optionTitle}>Perfil</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.optionSingle} onPress={() => nav.push('Credits')}>
                                    <Text style={styles.optionTitle}>Créditos</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.optionSingle} onPress={logOut}>
                                    <Text style={styles.optionTitle}>Sair</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                }
            </View>

        </View>
    );
}

export default Header;