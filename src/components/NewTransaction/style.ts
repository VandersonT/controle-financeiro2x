import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../global/theme";


const screenHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    bgDark: {
        width: '100%',
        height: screenHeight,
        position: 'absolute',
        top: 0,
        zIndex: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    t: {
        color: 'white'
    }
});

export default styles;