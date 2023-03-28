/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Header from '../../components/Header';
import { SimpleLineIcons } from '@expo/vector-icons';

//Functions Helpers
import BrazilianRealFormat from "../../helpers/BrazilianRealFormat";

//Css's
import { Theme } from "../../global/theme";
import styles from "./style";

//Types
import { Transaction } from "../../Types/Transaction";






const Home = ({ navigation }: any) => {

    /*Dados falsos, até a gente não conectar com  o banco de dados*/
    let transactions:Transaction[] = [
        {id: '0', title: 'Padaria do se Mané', value: 900.00, description: 'eu ganhei porque vendi latinha pro mané', date: '27/03/2023', 'where': 'disponível'},
        {id: '1', title: 'bet943', value: 100.00, description: 'Ganhei fazendo aposta na concorrente da bet', date: '28/03/2023', 'where': 'disponível'},
        {id: '2', title: 'Academia', value: -100.00, description: 'Paguei a academia', date: '30/03/2023', 'where': 'disponível'},
        {id: '3', title: 'Pedra', value: -200.00, description: 'Paguei a academia', date: '30/03/2023', 'where': 'disponível'},
        {id: '4', title: 'tesoura', value: -300.00, description: 'Paguei a academia', date: '30/03/2023', 'where': 'disponível'},
        {id: '5', title: 'rato', value: -400.00, description: 'Paguei a academia', date: '30/03/2023', 'where': 'disponível'},
        {id: '6', title: 'teste', value: -500.00, description: 'Paguei a academia', date: '30/03/2023', 'where': 'disponível'},
        {id: '7', title: 'tolino', value: -600.00, description: 'Paguei a academia', date: '30/03/2023', 'where': 'disponível'},
        {id: '8', title: 'test', value: -700.00, description: 'Paguei a academia', date: '30/03/2023', 'where': 'disponível'},
    ];

    /*----------------------------------------*/
    /*               STATES                   */
    /*----------------------------------------*/
        const [ seeMore, setSeeMore ] = useState<boolean[]>([false]);
        const [ transactionOpened, setTransactionOpened ] = useState<Number>(0);



    /*----------------------------------------*/
    /*             FUNCTIONS                  */
    /*----------------------------------------*/
        const openTransaction = (index: any) => {

            const aux = [];

            /*Close all transactions*/
            setTransactionOpened(-1);
            for(let i = 0; i < transactions.length; i++)
                aux[i] = false;
            
            /*Open transaction if not already opened, otherwise close it.*/
            if(transactionOpened != index){
                aux[index] = true;
                setTransactionOpened(index);
            }

            /*Set States*/
            setSeeMore(aux);
        }

        const renderItem = ({item}: any) => {
            
            return (
                <View key={item.id}>
                    <TouchableOpacity style={styles.transactionSingle} onPress={() => openTransaction(item.id)}>
                        <Text style={styles.transactionTitle}>{item['title']}</Text>
                        <View style={styles.leftSide}>
                            <Text style={[styles.transactionValue, (item['value'] >= 0) ? styles.positiveTransaction : styles.negativeTransaction]}>{BrazilianRealFormat(item?.value)}</Text>
                            {transactionOpened == Number(item.id)
                                ? <SimpleLineIcons name="arrow-down" size={15} color={Theme.colors.black[300]} />
                                : <SimpleLineIcons name="arrow-left" size={13} color={Theme.colors.black[300]} />
                            }
                            
                        </View>
                    </TouchableOpacity>

                    {seeMore[item.id] &&
                        <View style={styles.transactionSingle_detail}>
                            
                            <View style={styles.fieldSingle}>
                                <Text style={styles.fieldTitle}>Descrição:</Text>
                                <Text style={styles.description}>{item['description']}</Text>
                            </View>

                            <View style={styles.fieldSingle}>
                                <Text style={styles.fieldTitle}>Data:</Text>
                                <Text style={styles.description}>{item['date']}</Text>
                            </View>

                            <View style={styles.fieldSingle}>
                                <Text style={styles.fieldTitle}>Onde:</Text>
                                <Text style={styles.description}>{item['where']}</Text>
                            </View>

                            <View style={styles.fieldSingle}>
                                <Text style={styles.fieldTitle}>Valor:</Text>
                                <Text style={[styles.description, (item['value'] >= 0) ? styles.positiveTransaction : styles.negativeTransaction]}>{BrazilianRealFormat(item['value'])}</Text>
                            </View>

                        </View>
                    }
                </View>
            )
        }

    return (
        <ScrollView style={styles.container}>
            
            <Header nav={navigation} showMoney={true} />
            
            <View style={styles.main}>
                
                <TouchableOpacity>
                    <Text style={styles.newTransaction}>Nova Transação</Text>
                </TouchableOpacity>

                <View style={styles.transactionsBox}>

                    <FlatList
                        scrollEnabled={false}/*Desabilita o scroll do flatlist deixando apenas o scrollview*/
                        data={transactions}
                        keyExtractor={item=>item.id}
                        renderItem={renderItem}/*A lista está sendo renderizada na função renderItem*/
                    />

                </View>
            </View>
        
        </ScrollView>
    );
}

export default Home;