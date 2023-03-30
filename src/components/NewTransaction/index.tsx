import { Text, TouchableOpacity, View } from 'react-native';
import styles from './style';

type Props = {
    closeFnc: () => void
}

const NewTransaction = ({ closeFnc }: Props) => {
    return (
        <View style={styles.bgDark}>
            <TouchableOpacity onPress={closeFnc}>
                <Text style={styles.t}>testeeeeeeeee</Text>
            </TouchableOpacity>
        </View>
    );
}

export default NewTransaction;