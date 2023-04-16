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
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../../config/firebase";


/*Dados falsos, até a gente não conectar com  o banco de dados*/
let transactionsBancoSimulation:Transaction[] = [];

const MoneyJarOpened = ({ navigation, route }: any) => {

    //Getting user's context
    const { state, dispatch } = useContext(Context);

    /*----------------------------------------*/
    /*               STATES                   */
    /*----------------------------------------*/
    const boxTitle = route.params.boxId;
    const [ transactions, setTransactions ] = useState<Transaction[]>(transactionsBancoSimulation);
    const [ totalMoney, setTotalMoney ] = useState<number>(0);

    /*----------------------------------------*/
    /*               EFFECTS                  */
    /*----------------------------------------*/
    useEffect(()=>{
        getMoneyJarTransactions();
    }, []);

    const getMoneyJarTransactions = async () => {
        const q = query(collection(db, "transaction"), where("where", "==", boxTitle), where("user_id", "==", state.user.id));

        const querySnapshot = await getDocs(q);

        let transactionsAux: Transaction[] = [];

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
            });
        })

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

        //Getting total money
        let totalMoneyAux = 0;
        for(let i = 0; i < transactionsAux.length; i++)
            totalMoneyAux += transactionsAux[i].value;

        setTotalMoney(totalMoneyAux);
        
        setTransactions(transactionsAux);
    }

    /*----------------------------------------*/
    /*              FUNCTIONS                 */
    /*----------------------------------------*/
    const returnFnc = () => {
        navigation.push('MoneyJar')
    }

    const deleteMoneyJar = () => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir essa caixinha?',
            [
                {
                text: 'Cancelar',
                onPress: () => {},
                style: 'cancel',
                },
                { text: 'Excluir', onPress: () => {
                    
                    //Código remove esta caixinha do banco de dados

                    /*Return to MoneyJars listing*/
                    navigation.push('MoneyJar');
                }},
            ],
            { cancelable: false }
        );
        
    }

    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.transactionSingle}>
                <View>
                    <Text style={styles.transactionDate}>{item.date}</Text>
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
            <Header username={state.user.name} nav={navigation} showMoney={false} />

            <View style={styles.topBarHeader}>
                <TouchableOpacity onPress={() => navigation.push('MoneyJar')}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>{boxTitle}</Text>
                <Text></Text>
            </View>

            <View style={styles.mainInfo}>
                <View>
                    <Text style={styles.value}>{BrazilianRealFormat(totalMoney)}</Text>
                    <Text>Saldo Atual</Text>
                </View>
                <TouchableOpacity onPress={deleteMoneyJar}>
                    <Text style={styles.delete}>Excluir</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.historic}>

                <Text style={styles.historicTitle}>Histórico</Text>

                {transactions.length > 0 &&
                    <FlatList
                        scrollEnabled={false}/*Desabilita o scroll do flatlist deixando apenas o scrollview*/
                        data={transactions}
                        keyExtractor={item=>item.id}
                        renderItem={renderItem}/*A lista está sendo renderizada na função renderItem*/
                    />
                }

                {transactions.length < 1 && 
                    <Text style={styles.empty}>Nenhuma transação nesta caixinha.</Text>
                }

            </View>

        </ScrollView>
    );
}

export default MoneyJarOpened;