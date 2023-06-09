import { View, Text, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native";
import styles from './style';
import Header from "../../components/Header";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from "../../global/theme";
import { useContext, useEffect, useState } from "react";
import { Transaction } from "../../Types/Transaction";
import BrazilianRealFormat from "../../helpers/BrazilianRealFormat";
import { Context } from "../../context/Context";

//Firebase Imports
import { collection, deleteDoc, doc, getDocs, limit, orderBy, query, startAfter, updateDoc, where } from "firebase/firestore";
import db from "../../config/firebase";
import Loading from "../../components/Loading";
import dateFormat from "../../helpers/dateFormat";



const MoneyJarOpened = ({ navigation, route }: any) => {

    //Getting user's context
    const { state, dispatch } = useContext(Context);

    /*----------------------------------------*/
    /*               STATES                   */
    /*----------------------------------------*/
    const boxTitle = route.params.boxTitle;
    const boxId = route.params.boxId;
    const totalMoney = route.params.totalMoney;

    const [ transactions, setTransactions ] = useState<Transaction[]>([]);
    const [ transactionsPerPage, setTransactionsPerPage ] = useState(10);
    const [lastVisible, setLastVisible] = useState<any>(null);
    const [ moreTransactionsAvailable, setMoreTransactionsAvailable] = useState(true);
    const [ loading, setLoading ] = useState(false);


    /*----------------------------------------*/
    /*               EFFECTS                  */
    /*----------------------------------------*/
    useEffect(()=>{
        getMoneyJarTransactions();
    }, []);

    const getMoneyJarTransactions = async () => {

        setLoading(true);

        // Query the first page of docs
        const first = query(collection(db, "transaction"),
            where("where", "==", boxTitle),
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
            setLoading(false);
        });

    }

    const loadMore = async () => {

        setLoading(true);

        const next = query(collection(db, "transaction"),
            where("where", "==", boxTitle),
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
            setLoading(false);
        }else{
            Alert.alert("Isso é tudo", "Essas são todas as transações que você já realizou nesta conta.");
            setMoreTransactionsAvailable(false);
        }
    };

    /*----------------------------------------*/
    /*              FUNCTIONS                 */
    /*----------------------------------------*/

    const deleteMoneyJar = () => {

        if(boxTitle === "Disponível"){
            Alert.alert("Um momento amigo", "Você não pode apagar essa caixinha, pois ela é padrão.");
            return;
        }

        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir essa caixinha? Todas as transações feito para ela serão deletadas também.',
            [
                {
                text: 'Cancelar',
                onPress: () => {},
                style: 'cancel',
                },
                { text: 'Excluir', onPress: async() => {
                    
                    //Verifica quanto essa caixinha tinha para subtrair do valor reservado
                    const res = query(collection(db, "transaction"), where("where", "==", boxTitle), where("user_id", "==", state.user.id));
                    const resquerySnapshot = await getDocs(res);
                    let totalValue = 0;
                    resquerySnapshot.forEach((doc) => {
                        totalValue += doc.data().value;
                    })
                    console.log('Essa caixinha tinha: '+totalValue);

                    //Subtrai do valor reservado no banco de dados
                    await updateDoc(doc(db, "user", state.user.id), {
                        moneyJar_balance: state.user.moneyJar_balance - totalValue
                    });

                    //Subtrai do valor reservado no contexto
                    dispatch({
                        type: 'CHANGE_MONEYJARBALANCE',
                        payload: {
                            moneyJar_balance: state.user.moneyJar_balance - totalValue
                        }
                    });

                    //Remove todas as transações que são desta caixinha
                    const q = query(collection(db, "transaction"), where("where", "==", boxTitle));

                    const querySnapshot = await getDocs(q);

                    querySnapshot.forEach((doc) => {
                        deleteDoc(doc.ref);
                    });                      

                    //Código remove esta caixinha do banco de dados
                    await deleteDoc(doc(db, "moneyJar", boxId));

                    //Altera a quantidade de caixinhas que o usuário possui no banco de dados
                    await updateDoc(doc(db, "user", state.user.id), {
                        totalMoneyJars: state.user.totalMoneyJars - 1
                    });

                    //Altera a quantidade de caixinha que o usuário possui no contexto
                    dispatch({
                        type: 'CHANGE_TOTALMONEYJARS',
                        payload: {
                            totalMoneyJars: state.user.totalMoneyJars - 1
                        }
                    });

                    /*Return to MoneyJars listing*/
                    navigation.push("MoneyJar");
                }},
            ],
            { cancelable: false }
        );
        
    }

    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.transactionSingle}>
                <View>
                    <Text style={styles.transactionDate}>{dateFormat(item.created_at)}</Text>
                    <View style={styles.info1}>
                        <Ionicons name={(item.value < 0) ? 'trending-down-outline' : 'trending-up-outline'} size={27} color={Theme.colors.primary[300]} />
                        <View style={styles.note}>
                            <Text style={styles.transactionTitle}>{(item.value < 0) ? "Retirada" : "Depósito" }</Text>
                            <Text style={styles.transactionInfo}>{item.description}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.transactionValue}>{BrazilianRealFormat(item.value)}</Text>
                </View>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Header nav={navigation} showMoney={false} />

            <View style={styles.topBarHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>{boxTitle}</Text>
                <Text></Text>
            </View>

            <View style={styles.mainInfo}>
                <View>
                    <Text style={styles.value}>{BrazilianRealFormat(totalMoney)}</Text>
                    <Text style={styles.text}>Saldo Atual</Text>
                </View>
                <TouchableOpacity onPress={deleteMoneyJar}>
                    <Text style={styles.delete}>Excluir</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.historic}>

                <Text style={styles.historicTitle}>Histórico</Text>

                {transactions.length > 0 &&
                    <>
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
                    </>
                }

                {loading &&
                    <View style={{ marginTop: 50 }}>
                        <Loading />
                    </View>
                }

                {transactions.length < 1 && !loading && 
                    <Text style={styles.empty}>Nenhuma transação nesta caixinha.</Text>
                }

            </View>

        </ScrollView>
    );
}

export default MoneyJarOpened;