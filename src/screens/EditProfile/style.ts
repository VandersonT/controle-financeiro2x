import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../global/theme";

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: '100%',
        flex: 1,
        backgroundColor: Theme.colors.white[700],
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 80,
        marginBottom: 90
    },
    inputSingle: {
        width: '70%',
        borderWidth: 1,
        borderColor: Theme.colors.gray[400],
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        marginTop: 25,
        textAlign: 'center'
    },
    note: {
        width: '70%',
        marginTop: 5,
        fontSize: Theme.fontSizes.sm,
        color: Theme.colors.yellow[200],
    },
    checkboxContainer: {
        backgroundColor: '#fff',
        borderWidth: 0,
        marginBottom: 20
    },
    checkboxText: {
        fontWeight: 'normal',
        color: Theme.colors.blue[300]
      },
});

export default styles;