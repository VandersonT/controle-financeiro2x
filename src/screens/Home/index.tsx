/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import React, { useState, useRef, useEffect, useContext } from "react";
import { View, Text, Button, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
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
import Loading from "../../components/Loading";

//Context
import { Context } from "../../context/Context";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import db from "../../config/firebase";




const Home = ({ navigation }: any) => {

    //Getting user's context
    const { state, dispatch } = useContext(Context);

    /*----------------------------------------*/
    /*               STATES                   */
    /*----------------------------------------*/
        const [ seeMore, setSeeMore ] = useState<boolean[]>([false]);
        const [ transactionOpened, setTransactionOpened ] = useState<Number>(-1);
        const [ scrollEnabled, setScrollEnabled ] = useState<boolean>(true);
        const [ newTrasactionStatus, setNewTransactionStatus ] = useState<Boolean>(false);
        const [ transactions, setTransactions ] = useState<Transaction[]>([]);
        const [ totalMoneyAvailable, setTotalMoneyAvailable] = useState<number>(0);
        const [ stash, setStash ] = useState<number>(0);
        const [ loading, setLoading ] = useState(false);

    /*----------------------------------------*/
    /*             USE EFFECT                  */
    /*----------------------------------------*/

        
        useEffect(() => {
            getTransactions();
        }, [])

        const getTransactions = async () => {
            setLoading(true);

            const q = query(collection(db, "transaction"), where("user_id", "==", state.user.id));

            const querySnapshot = await getDocs(q);

            let transactionsAux:Transaction[]  = [];

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                
                transactionsAux.splice(0, 0, {
                    id: doc.data().id,
                    title: doc.data().title,
                    value: doc.data().value,
                    description: doc.data().description,
                    date: doc.data().date,
                    where: doc.data().where,
                    user_id: doc.data().user_id,
                    created_at: doc.data().created_at
                })
            });
            
            //Sorting transactions
            transactionsAux.sort((a, b) => {
                if (a.created_at < b.created_at) {
                    return 1;
                } else if (a.created_at > b.created_at) {
                    return -1;
                } else {
                    return 0;
                }
            });
            
            setTransactions(transactionsAux);
            setLoading(false);
        };

        useEffect(() => {

            let moneyAvailable = 0;
            let stashed = 0;
            for(let i = 0; i < transactions.length; i++) {
                if(transactions[i].where === 'Disponível' || transactions[i].where === 'disponível') {
                    moneyAvailable += transactions[i].value;
                }else{
                    stashed += transactions[i].value;
                }
            }

            setStash(stashed);
            setTotalMoneyAvailable(moneyAvailable);

        }, [transactions])

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
        }

        const transactionSuccess = (transaction: any) => {

            let aux = transactions;

            //aux.push(transaction);
            aux.splice(0, 0,transaction);

            setTransactions([...aux]);

            /*Close transaction creation modal*/
            closeNewTransaction();
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

        const deleteTransaction = (transactionId: string, index: number) => {
            
            Alert.alert(
                'Confirmação',
                'Tem certeza que deseja excluir essa transação?',
                [
                  {
                    text: 'Cancelar',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  { text: 'Excluir', onPress: async () => {
                    let aux = transactions;
                    //Remove deleted transaction from array
                    aux.splice(index, 1);
                    setTransactions([...aux]);

                    //Close all transactions
                    setTransactionOpened(-1);
                    setSeeMore([false]);

                    //Remove transaction from database
                    await deleteDoc(doc(db, "transaction", transactionId));

                  }},
                ],
                { cancelable: false }
            );
        }

        const renderItem = ({item, index}: any) => {
            
            return (
                <View key={index}>
                    <TouchableOpacity style={styles.transactionSingle} onPress={() => openTransaction(index)}>
                        <Text style={styles.transactionTitle}>{item['title']}</Text>
                        <View style={styles.leftSide}>
                            <Text style={[styles.transactionValue, (item['value'] >= 0) ? styles.positiveTransaction : styles.negativeTransaction]}>{BrazilianRealFormat(item?.value)}</Text>
                            {transactionOpened == Number(index)
                                ? <SimpleLineIcons name="arrow-down" size={15} color={Theme.colors.black[300]} />
                                : <SimpleLineIcons name="arrow-left" size={13} color={Theme.colors.black[300]} />
                            }
                            
                        </View>
                    </TouchableOpacity>

                    {seeMore[index] &&
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
                            
                            <TouchableOpacity onPress={() => deleteTransaction(item['id'], index)} style={styles.deleteTransactionBox}>
                                <Text style={styles.deleteTransaction}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            )
        }

    return (
        <ScrollView ref={scrollViewRef} scrollEnabled={scrollEnabled} style={styles.container} showsVerticalScrollIndicator={false}>
            
            {newTrasactionStatus &&
                <NewTransaction userId={state.user.id} successFnc={transactionSuccess} closeFnc={closeNewTransaction} />
            }
            
            <Header nav={navigation} showMoney={true} totalMoneyAvailable={totalMoneyAvailable} stash={stash}/>
            
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

                    {transactions.length < 1 && !loading &&
                        <Text style={styles.empty}>Nenhuma transação até o momento</Text>
                    }

                    {loading &&
                        <View style={{ marginTop: 50 }}>
                            <Loading />
                        </View>
                    }

                </View>
            </View>

            <Footer />
        
        </ScrollView>
    );
}

export default Home;