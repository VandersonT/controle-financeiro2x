import { View, Text, TouchableOpacity } from "react-native";
import styles from './style';

type Props = {
    title: String,
    fnc: () => void
}

const Button1 = ({ title, fnc }: Props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => fnc()}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

export default Button1;