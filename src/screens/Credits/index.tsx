import { View, Text } from "react-native";
import Header2 from "../../components/Header2";
import styles from './style';

const Credits = ({ navigation }: any) => {

    const BackToHome = () => {
        navigation.push('Home');
    }

    return (
        <View style={styles.container}>
            <Header2 title="Créditos" fnc={BackToHome} />

            <View style={styles.messageBox}>
                <Text style={styles.message}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum consequat nisi, ut mollis magna porta vel. Integer ornare dolor et blandit venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum consequat nisi, ut mollis magna porta vel. Integer ornare dolor et blandit venenatis.</Text>
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
        </View>
    );
}

export default Credits;