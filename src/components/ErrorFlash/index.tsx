import { View, Text, Button } from 'react-native';
import styles from './style';
import {LinearGradient} from 'expo-linear-gradient';

type Props = {
    msg: String,
    closeFnc: () => void
}

const ErrorFlash = ({ msg, closeFnc }: Props) => {
    return (
        <LinearGradient colors={['#DD1E1E', '#A82626']} style={styles.errorBox}>
            <Text></Text>
            <Text style={styles.errorMsg}>{msg}</Text>
            <Text style={styles.closeButton}>X</Text>
        </LinearGradient>
    );
}

export default ErrorFlash;