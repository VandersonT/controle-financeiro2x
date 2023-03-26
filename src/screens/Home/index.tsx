/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import React from "react";
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import styles from "./style";
import Header from '../../components/Header';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Theme } from "../../global/theme";


const Home = ({ navigation }: any) => {

    return (
        <ScrollView style={{flexGrow: 1}}>
        <View style={styles.container}>
            
            <Header nav={navigation} showMoney={true} />
            
            <View style={styles.main}>
                
                <TouchableOpacity>
                    <Text style={styles.newTransaction}>Nova Transação</Text>
                </TouchableOpacity>

                <View style={styles.transactionsBox}>

                        <View>
                            <View style={styles.transactionSingle}>
                                <Text style={styles.transactionTitle}>Padaria do seu Mané</Text>
                                <View style={styles.leftSide}>
                                    <Text style={[styles.transactionValue, styles.positiveTransaction]}>R$900,00</Text>
                                    <MaterialIcons name="arrow-back-ios" size={15} color={Theme.colors.black[300]} />
                                </View>
                            </View>
                            <View style={styles.transactionSingle_detail}>
                                
                                <View style={styles.fieldSingle}>
                                    <Text style={styles.fieldTitle}>Descrição:</Text>
                                    <Text style={styles.description}>Meu salário ganho do meu suor pingado.</Text>
                                </View>

                                <View style={styles.fieldSingle}>
                                    <Text style={styles.fieldTitle}>Data:</Text>
                                    <Text style={styles.description}>20/02/2023</Text>
                                </View>

                                <View style={styles.fieldSingle}>
                                    <Text style={styles.fieldTitle}>Onde:</Text>
                                    <Text style={styles.description}>Emergência</Text>
                                </View>

                                <View style={styles.fieldSingle}>
                                    <Text style={styles.fieldTitle}>Valor:</Text>
                                    <Text style={[styles.description, styles.positiveTransaction]}>R$900,00</Text>
                                </View>

                            </View>
                        </View>

                        <View>
                            <View style={styles.transactionSingle}>
                                <Text style={styles.transactionTitle}>Padaria do seu Mané</Text>
                                <View style={styles.leftSide}>
                                    <Text style={[styles.transactionValue, styles.negativeTransaction]}>-R$300,00</Text>
                                    <MaterialIcons name="keyboard-arrow-down" size={25} color={Theme.colors.black[300]} />
                                </View>
                            </View>
                            <View style={styles.transactionSingle_detail}>
                                
                                <View style={styles.fieldSingle}>
                                    <Text style={styles.fieldTitle}>Descrição:</Text>
                                    <Text style={styles.description}>Paguei um cursim bão</Text>
                                </View>

                                <View style={styles.fieldSingle}>
                                    <Text style={styles.fieldTitle}>Data:</Text>
                                    <Text style={styles.description}>20/02/2023</Text>
                                </View>

                                <View style={styles.fieldSingle}>
                                    <Text style={styles.fieldTitle}>Onde:</Text>
                                    <Text style={styles.description}>Disponível</Text>
                                </View>

                                <View style={styles.fieldSingle}>
                                    <Text style={styles.fieldTitle}>Valor:</Text>
                                    <Text style={[styles.description, styles.negativeTransaction]}>-R$300,00</Text>
                                </View>
                                
                            </View>
                        </View>

                </View>

            </View>
        
        </View>
        </ScrollView>
    );
}

export default Home;