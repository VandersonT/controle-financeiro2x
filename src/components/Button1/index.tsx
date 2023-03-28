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
        <View style={styles.button}>
            <TouchableOpacity style={styles.button} onPress={() => fnc()}>
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Button1;