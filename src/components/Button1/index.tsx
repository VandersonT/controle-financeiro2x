import { View, Text, TouchableOpacity } from "react-native";
import styles from './style';
import { LinearGradient } from "expo-linear-gradient";
import { Theme } from "../../global/theme";

type Props = {
    title: String,
    fnc: () => void
}

const Button1 = ({ title, fnc }: Props) => {
    return (
        <LinearGradient style={styles.button} colors={[Theme.colors.primary[300], Theme.colors.primary[700]]}>
            <TouchableOpacity style={styles.button} onPress={() => fnc}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

export default Button1;