import { View, Text, Button, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styles from './style';
import {LinearGradient} from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons'; 

type Props = {
    msg: String,
    closeFnc: () => void
}

const SuccessFlash = ({ msg, closeFnc }: Props) => {
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#00e600', '#00cc00']} style={styles.errorBox}>
                <Text></Text>
                <Text style={styles.errorMsg}>{msg}</Text>
                <TouchableOpacity onPress={() => closeFnc()}>
                    <AntDesign style={styles.closeButton} name="closecircleo" size={24} color="black" />
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

export default SuccessFlash;