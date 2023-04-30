/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import { View, Text, StatusBar, Image, ImageBackground, TouchableOpacity, Modal, Alert } from 'react-native';
import styles from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../../global/theme';
import { Feather } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import BrazilianRealFormat from '../../helpers/BrazilianRealFormat';
import { AntDesign } from '@expo/vector-icons';


//Firebase imports
import { getAuth, signOut } from "firebase/auth";
import { Context } from '../../context/Context';


type Props = {
    nav: any,
    showMoney?: boolean,
}


const Header = ({ nav, showMoney = true }: Props) => {

    /*----------------------------------------*/
    /*               STATES                   */
    /*----------------------------------------*/
    const [ menuOpened, setMenuOpened] = useState(false);


    //Getting user's context
    const { state, dispatch } = useContext(Context);

    useEffect(() => {
        setMenuOpened(false)
    }, [])

    /*----------------------------------------*/
    /*             FUNCTIONS                  */
    /*----------------------------------------*/
    
    const logOut = () => {

        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja sair do aplicativo?',
            [
              {
                text: 'Cancelar',
                onPress: () => {},
                style: 'cancel',
              },
              { text: 'Sair', onPress: async () => {
                
                /*Try logout*/
                const auth = getAuth();
                signOut(auth).then(() => {
                    //Logged out successfully
                    nav.push('SignIn');
                }).catch((error) => {
                    //Could not log out
                    //console.log("Error: ", error);
                });

              }},
            ],
            { cancelable: false }
        );

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
                            source={{ uri: (state.user.avatar) ? state.user.avatar : '../../../assets/images/noPhoto.png'}}
                            style={{width: 57, height: 55, marginRight: 13, borderColor: '#5144DB', borderWidth: 2, borderRadius: 50}}
                        />
                        <Text style={styles.userName}>{state.user.name}</Text>
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
                            <Text style={styles.infoTitle}>Disponível</Text>
                            <Text style={styles.money}>
                                {(state.user.available_balance > 999999) ? 'R$ 999.999+' : null}
                                {(state.user.available_balance < -999999) ? '-R$ 999.999-' : null}
                                {(state.user.available_balance < 999999 && state.user.available_balance > -999999) ? BrazilianRealFormat(state.user.available_balance) : null}
                            </Text>
                        </View>
                        <View style={styles.infoSingle}>
                            <TouchableOpacity style={styles.infoTitleBox} onPress={moneyJar}>
                                <Text style={styles.infoTitle}>
                                    Caixinha
                                </Text>
                                <Text style={styles.infoTitle_alert}>[Clique]</Text>
                            </TouchableOpacity>
                            <Text style={styles.money}>
                                {(state.user.moneyJar_balance > 999999) ? 'R$ 999.999+' : null}
                                {(state.user.moneyJar_balance < -999999) ? '-R$ 999.999-' : null}
                                {(state.user.moneyJar_balance < 999999 && state.user.moneyJar_balance > -999999) ? BrazilianRealFormat(state.user.moneyJar_balance) : null}
                            </Text>
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
                                        source={{ uri: (state.user.avatar) ? state.user.avatar : '../../../assets/images/noPhoto.png'}}
                                        style={{width: 100, height: 100, borderRadius: 50}}
                                    />
                                    <Text style={styles.menuTitle}>{state.user.name}</Text>
                                </View>
                            </ImageBackground>

                            <View>

                                <TouchableOpacity style={styles.optionSingle} onPress={() => {
                                    nav.push('Profile')
                                    setMenuOpened(false);
                                }}>
                                    <Text style={styles.optionTitle}>Perfil</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.optionSingle} onPress={() => nav.push('Charts')}>
                                    <Text style={styles.optionTitle}>Gráficos</Text>
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