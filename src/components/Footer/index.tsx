import { View, Text } from "react-native";
import styles from './style';

const Footer = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.footerText}>Controle Financeiro 2023</Text>
        </View>
    );
}

export default Footer;