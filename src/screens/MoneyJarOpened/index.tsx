import { View, Text, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native";
import styles from './style';
import Header from "../../components/Header";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from "../../global/theme";
import { useState } from "react";
import { Transaction } from "../../Types/Transaction";
import BrazilianRealFormat from "../../helpers/BrazilianRealFormat";


/*Dados falsos, até a gente não conectar com  o banco de dados*/
let transactionsBancoSimulation:Transaction[] = [
    {id: '2334efsdfs-sd34r', title: 'Salário Mensal', value: 2450.00, description: 'Ganhei do meu Trabalho.', date: '28/03/2023', 'where': 'Disponível'},
    {id: '34esars-fdsfsf3', title: 'Divida de Jogo', value: -200.00, description: 'Pagamento da divida e eu estava sem dinheiro.', date: '27/03/2023', 'where': 'Emergência'},
    {id: '3243rew-sfrewrw', title: 'Deposito para viagem', value: 400.00, description: 'Ganhei por ajudar um amigo esse valor.', date: '26/03/2023', 'where': 'Viagem'},
];

const MoneyJarOpened = ({ navigation, route }: any) => {

    //const boxId = route.params.boxId;
    const [ transactions, setTransactions ] = useState<Transaction[]>(transactionsBancoSimulation);

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
            <Header nav={navigation} showMoney={false} />

            <View style={styles.topBarHeader}>
                <TouchableOpacity onPress={() => navigation.push('MoneyJar')}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Emergência</Text>
                <Text></Text>
            </View>

            <View style={styles.mainInfo}>
                <View>
                    <Text style={styles.value}>R$60,00</Text>
                    <Text>Saldo Atual</Text>
                </View>
                <TouchableOpacity onPress={deleteMoneyJar}>
                    <Text style={styles.delete}>Excluir</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.historic}>

                <Text style={styles.historicTitle}>Histórico</Text>

                <FlatList
                    scrollEnabled={false}/*Desabilita o scroll do flatlist deixando apenas o scrollview*/
                    data={transactions}
                    keyExtractor={item=>item.id}
                    renderItem={renderItem}/*A lista está sendo renderizada na função renderItem*/
                />

            </View>

        </ScrollView>
    );
}

export default MoneyJarOpened;