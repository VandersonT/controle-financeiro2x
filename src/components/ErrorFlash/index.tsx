import { View, Text, Button, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styles from './style';
import {LinearGradient} from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 

type Props = {
    msg: String,
    closeFnc: () => void
}

const ErrorFlash = ({ msg, closeFnc }: Props) => {
    return (
        <LinearGradient colors={['#DD1E1E', '#A82626']} style={styles.errorBox}>
            <Text></Text>
            <Text style={styles.errorMsg}>{msg}</Text>
            <TouchableOpacity onPress={() => closeFnc()}>
                <AntDesign style={styles.closeButton} name="closecircleo" size={24} color="black" />
            </TouchableOpacity>
        </LinearGradient>
    );
}

export default ErrorFlash;