/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import React, { useState, useRef } from "react";
import { View, Text, Button, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

//Functions Helpers
import BrazilianRealFormat from "../../helpers/BrazilianRealFormat";

//Css's
import { Theme } from "../../global/theme";
import styles from "./style";

//Types
import { Transaction } from "../../Types/Transaction";

//Components
import Header from '../../components/Header';
import Footer from "../../components/Footer";
import NewTransaction from "../../components/NewTransaction";



const Home = ({ navigation }: any) => {

    /*Dados falsos, até a gente não conectar com  o banco de dados*/
    let transactions:Transaction[] = [
        {id: '0', title: 'Salário Mensal', value: 2450.00, description: 'Ganhei do meu Trabalho.', date: '28/03/2023', 'where': 'disponível'},
        {id: '1', title: 'Divida de Jogo', value: -200.00, description: 'Pagamento da divida e eu estava sem dinheiro.', date: '27/03/2023', 'where': 'Emergência'},
        {id: '2', title: 'Deposito para viagem', value: 400.00, description: 'Ganhei por ajudar um amigo esse valor.', date: '26/03/2023', 'where': 'Viagem'},
        {id: '3', title: 'Salário Mensal', value: 2450.00, description: 'Ganhei do meu Trabalho.', date: '28/03/2023', 'where': 'disponível'},
        {id: '4', title: 'Divida de Jogo', value: -200.00, description: 'Pagamento da divida e eu estava sem dinheiro.', date: '27/03/2023', 'where': 'Emergência'},
        {id: '5', title: 'Deposito para viagem', value: 400.00, description: 'Ganhei por ajudar um amigo esse valor.', date: '26/03/2023', 'where': 'Viagem'},
        {id: '6', title: 'Salário Mensal', value: 2450.00, description: 'Ganhei do meu Trabalho.', date: '28/03/2023', 'where': 'disponível'},
        {id: '7', title: 'Divida de Jogo', value: -200.00, description: 'Pagamento da divida e eu estava sem dinheiro.', date: '27/03/2023', 'where': 'Emergência'},
        {id: '8', title: 'Deposito para viagem', value: 400.00, description: 'Ganhei por ajudar um amigo esse valor.', date: '26/03/2023', 'where': 'Viagem'},
        {id: '9', title: 'Salário Mensal', value: 2450.00, description: 'Ganhei do meu Trabalho.', date: '28/03/2023', 'where': 'disponível'},
        {id: '10', title: 'Divida de Jogo', value: -200.00, description: 'Pagamento da divida e eu estava sem dinheiro.', date: '27/03/2023', 'where': 'Emergência'},
        {id: '11', title: 'Deposito para viagem', value: 400.00, description: 'Ganhei por ajudar um amigo esse valor.', date: '26/03/2023', 'where': 'Viagem'},
        {id: '12', title: 'Salário Mensal', value: 2450.00, description: 'Ganhei do meu Trabalho.', date: '28/03/2023', 'where': 'disponível'},
        {id: '13', title: 'Divida de Jogo', value: -200.00, description: 'Pagamento da divida e eu estava sem dinheiro.', date: '27/03/2023', 'where': 'Emergência'},
        {id: '14', title: 'Deposito para viagem', value: 400.00, description: 'Ganhei por ajudar um amigo esse valor.', date: '26/03/2023', 'where': 'Viagem'},

    ];

    /*----------------------------------------*/
    /*               STATES                   */
    /*----------------------------------------*/
        const [ seeMore, setSeeMore ] = useState<boolean[]>([false]);
        const [ transactionOpened, setTransactionOpened ] = useState<Number>(-1);
        const [ scrollEnabled, setScrollEnabled ] = useState<boolean>(true);
        const [ newTrasactionStatus, setNewTransactionStatus ] = useState<Boolean>(false);

    /*----------------------------------------*/
    /*             FUNCTIONS                  */
    /*----------------------------------------*/

        const scrollViewRef = useRef<ScrollView>(null);

        const handleScrollToTop = () => {
            setScrollEnabled(false);
            setNewTransactionStatus(true);
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }

        const closeNewTransaction = () => {
            setScrollEnabled(true);
            setNewTransactionStatus(false);
            /*Limpa os campos também*/
        }

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
        <ScrollView ref={scrollViewRef} scrollEnabled={scrollEnabled} style={styles.container} showsVerticalScrollIndicator={false}>
            
            {newTrasactionStatus &&
                <NewTransaction closeFnc={closeNewTransaction} />
            }
            
            <Header nav={navigation} showMoney={true} />
            
            <View style={styles.main}>
                
                <TouchableOpacity onPress={handleScrollToTop}>
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

            <Footer />
        
        </ScrollView>
    );
}

export default Home;