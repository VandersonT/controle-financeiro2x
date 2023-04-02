import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from './style';
import Header from "../../components/Header";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from "../../global/theme";

const MoneyJarOpened = ({ navigation, route }: any) => {

    //const boxId = route.params.boxId;

    const teste = () => {
        navigation.push('MoneyJar')
    }

    return (
        <ScrollView style={styles.container}>
            <Header nav={navigation} showMoney={false} />

            <View style={styles.topBarHeader}>
                <TouchableOpacity onPress={() => navigation.push('Home')}>
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
                <TouchableOpacity>
                    <Text style={styles.delete}>Excluir</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.historic}>

                <Text style={styles.historicTitle}>Histórico</Text>

                <View style={styles.transactionSingle}>
                    <View>
                        <Text style={styles.transactionDate}>02/03/2023</Text>
                        <View style={styles.info1}>
                            <Ionicons name="trending-up-outline" size={27} color={Theme.colors.primary[300]} />
                            <View style={styles.note}>
                                <Text style={styles.transactionTitle}>Depósito</Text>
                                <Text style={styles.transactionInfo}>Você colocou dinheiro nesta caixinha.</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.transactionValue}>R$100,00</Text>
                    </View>
                </View>

                <View style={styles.transactionSingle}>
                    <View>
                        <Text style={styles.transactionDate}>02/03/2023</Text>
                        <View style={styles.info1}>
                            <Ionicons name="trending-up-outline" size={27} color={Theme.colors.primary[300]} />
                            <View style={styles.note}>
                                <Text style={styles.transactionTitle}>Depósito</Text>
                                <Text style={styles.transactionInfo}>Você colocou dinheiro nesta caixinha.</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.transactionValue}>R$100,00</Text>
                    </View>
                </View>

                <View style={styles.transactionSingle}>
                    <View>
                        <Text style={styles.transactionDate}>02/03/2023</Text>
                        <View style={styles.info1}>
                            <Ionicons name="trending-up-outline" size={27} color={Theme.colors.primary[300]} />
                            <View style={styles.note}>
                                <Text style={styles.transactionTitle}>Depósito</Text>
                                <Text style={styles.transactionInfo}>Você colocou dinheiro nesta caixinha.</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.transactionValue}>R$100,00</Text>
                    </View>
                </View>

            </View>

        </ScrollView>
    );
}

export default MoneyJarOpened;