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
import { collection, deleteDoc, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
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
        const [ loading, setLoading ] = useState(false);

        const [ moreTransactionsAvailable, setMoreTransactionsAvailable] = useState(true);
        const [transactions, setTransactions] = useState<any>([]);
        const [lastVisible, setLastVisible] = useState<any>(null);
        const [ transactionsPerPage, setTransactionsPerPage ] = useState(15);

    /*----------------------------------------*/
    /*             USE EFFECT                  */
    /*----------------------------------------*/

        useEffect(() => {
            getTransactions();
        }, [])

        const getTransactions = async () => {
            setLoading(true);

             // Query the first page of docs
            const first = query(collection(db, "transaction"),
                where("user_id", "==", state.user.id),
                orderBy("created_at", "desc"),
                limit(transactionsPerPage)
            );
            
            getDocs(first).then((querySnapshot) => {
                const citiesData:any = [];
                querySnapshot.forEach((doc) => {
                    citiesData.push(doc.data());
                });
                setTransactions(citiesData);
                setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1]);
            });

            setLoading(false);
        };

        const loadMore = async () => {
            const next = query(collection(db, "transaction"),
                where("user_id", "==", state.user.id),
                orderBy("created_at", "desc"),
                startAfter(lastVisible),
                limit(transactionsPerPage)
            );
            const querySnapshot = await getDocs(next);
            const transactionsData: any = [];
            querySnapshot.forEach((doc) => {
                transactionsData.push(doc.data());
            });

            if(transactionsData.length != 0){
                setTransactions([...transactions, ...transactionsData]);
                setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1]);
            }else{
                Alert.alert("Isso é tudo", "Essas são todas as transações que você já realizou nesta conta.");
                setMoreTransactionsAvailable(false);
            }
            
        };


        
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

        const transactionSuccess = async(transaction: any) => {


            const transactionRef = collection(db, "transaction");

            await setDoc(doc(transactionRef, transaction.id), transaction);

            if(transaction.where == "Disponível"){//Edit in the firestore
                await updateDoc(doc(db, "user", state.user.id), {
                    available_balance: state.user.available_balance + transaction.value
                });
                dispatch({
                    type: 'CHANGE_AVAILABLEBALANCE',
                    payload: {
                        available_balance: state.user.available_balance + transaction.value
                    }
                });
                
            }else{
                await updateDoc(doc(db, "user", state.user.id), {
                    moneyJar_balance: state.user.moneyJar_balance + transaction.value
                });

                dispatch({
                    type: 'CHANGE_MONEYJARBALANCE',
                    payload: {
                        moneyJar_balance: state.user.moneyJar_balance + transaction.value
                    }
                });
            }


            /****/
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
                <NewTransaction successFnc={transactionSuccess} closeFnc={closeNewTransaction} />
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

                    {transactions.length >= transactionsPerPage && moreTransactionsAvailable &&
                        <TouchableOpacity onPress={loadMore}>
                            <Text style={styles.loadMore}>Carregar mais</Text>
                        </TouchableOpacity>
                    }

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