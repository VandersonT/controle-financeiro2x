import { View, Text, ScrollView } from "react-native";
import Header2 from "../../components/Header2";
import styles from './style';

const Credits = ({ navigation }: any) => {

    const BackToHome = () => {
        navigation.push('Home');
    }

    return (
        <ScrollView style={styles.container}>
            <Header2 title="Créditos" fnc={BackToHome} />

            <View style={styles.messageBox}>
                <Text style={styles.message}>Com o objetivo de facilitar o controle das suas finanças pessoais, este aplicativo oferece uma interface intuitiva e descomplicada. Uma das principais características do aplicativo é a capacidade de separar seu dinheiro em várias categorias, ou "caixinhas", como emergência, aluguel, dentre outras. Isso ajuda a manter um controle mais organizado e detalhado das suas despesas, possibilitando uma identificação mais precisa de onde o dinheiro está sendo gasto e onde é possível economizar.</Text>
            </View>
            <View style={styles.infoBox}>
                <View style={styles.infoSingle}>
                    <Text style={styles.infoTitle}>Desenvolvido por: </Text>
                    <Text style={styles.infoContent}>Bruno, Enzo, Eduardo, Vanderson.</Text>
                </View>
                <View style={styles.infoSingle}>
                    <Text style={styles.infoTitle}>Desenvolvido em: </Text>
                    <Text style={styles.infoContent}>17/02/2023</Text>
                </View>
            </View>
        </ScrollView>
    );
}

export default Credits;