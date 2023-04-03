import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import styles from './style';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '../../global/theme';

type Props = {
    title: string,
    fnc: () => void
}

const Header2 = ({ title, fnc }: Props) => {
    return (
        <>
            {/*Define cor da barra de status*/}
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={styles.container}>
                <TouchableOpacity onPress={fnc}>
                    <MaterialIcons name="arrow-back-ios" size={30} color={Theme.colors.white[700]} />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <View></View>
            </View>
        </>
    );
}

export default Header2;