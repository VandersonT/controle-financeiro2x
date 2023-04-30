import { View, Text, TouchableOpacity } from "react-native";
import styles from './style';

type Props = {
    title: String,
    fnc: () => void,
    color?: string
}

const Button2 = ({ title, fnc, color }: Props) => {
    return (
        <TouchableOpacity style={[styles.button, color ? { backgroundColor: color } : null]} onPress={() => fnc()}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

export default Button2;