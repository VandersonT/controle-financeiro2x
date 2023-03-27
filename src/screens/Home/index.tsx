/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import React from "react";
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import styles from "./style";
import Header from '../../components/Header';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Theme } from "../../global/theme";
import BrazilianRealFormat from "../../helpers/BrazilianRealFormat";
import { Transaction } from "../../Types/Transaction";

const Home = ({ navigation }: any) => {

    /*Dados falsos, até a gente não conectar com  o banco de dados*/
    let fakeTrasanction:Transaction[] = [
        {title: 'Padaria do se Mané', value: 900.00, description: 'eu ganhei porque vendi latinha pro mané', date: '27/03/2023', 'where': 'disponível'},
        {title: 'bet943', value: 100.00, description: 'Ganhei fazendo aposta na concorrente da bet', date: '28/03/2023', 'where': 'disponível'},
        {title: 'Academia', value: -500.00, description: 'Paguei a academia', date: '30/03/2023', 'where': 'disponível'}
    ];

    return (
        <ScrollView style={{flexGrow: 1}}>
        <View style={styles.container}>
            
            <Header nav={navigation} showMoney={true} />
            
            <View style={styles.main}>
                
                <TouchableOpacity>
                    <Text style={styles.newTransaction}>Nova Transação</Text>
                </TouchableOpacity>

                <View style={styles.transactionsBox}>

                    {fakeTrasanction.map((transaction, index)=>(
                        <View key={index}>
                            <View style={styles.transactionSingle}>
                                <Text style={styles.transactionTitle}>{transaction['title']}</Text>
                                <View style={styles.leftSide}>
                                    <Text style={[styles.transactionValue, (transaction['value'] >= 0) ? styles.positiveTransaction : styles.negativeTransaction]}>{BrazilianRealFormat(transaction['value'])}</Text>
                                    <MaterialIcons name="arrow-back-ios" size={15} color={Theme.colors.black[300]} />
                                </View>
                            </View>
                            <View style={styles.transactionSingle_detail}>
                                
                                <View style={styles.fieldSingle}>
                                    <Text style={styles.fieldTitle}>Descrição:</Text>
                                    <Text style={styles.description}>{transaction['description']}</Text>
                                </View>

                                <View style={styles.fieldSingle}>
                                    <Text style={styles.fieldTitle}>Data:</Text>
                                    <Text style={styles.description}>{transaction['date']}</Text>
                                </View>

                                <View style={styles.fieldSingle}>
                                    <Text style={styles.fieldTitle}>Onde:</Text>
                                    <Text style={styles.description}>{transaction['where']}</Text>
                                </View>

                                <View style={styles.fieldSingle}>
                                    <Text style={styles.fieldTitle}>Valor:</Text>
                                    <Text style={[styles.description, (transaction['value'] >= 0) ? styles.positiveTransaction : styles.negativeTransaction]}>{BrazilianRealFormat(transaction['value'])}</Text>
                                </View>

                            </View>
                        </View>
                    ))}

                </View>

            </View>
        
        </View>
        </ScrollView>
    );
}

export default Home;