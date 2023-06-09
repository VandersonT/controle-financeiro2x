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
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    newTransactionBox: {
        width: '90%',
        height: 460,
        backgroundColor: Theme.colors.white[700],
        padding: 20,
        borderRadius: 5
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
    optionsTransactionBox:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    unSelected: {
        color: Theme.colors.gray[400],
    },
    title: {
        fontSize: Theme.fontSizes.xl,
        color: Theme.colors.secondary[200],
        textAlign: 'center',
        borderBottomWidth: 1,
        borderColor: Theme.colors.gray[300],
    },
    form: {
        marginVertical: 20,
        display: 'flex',
        justifyContent: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: Theme.colors.gray[400],
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 20,
        position: 'relative',
    },
    selectTitle: {
        padding: 6,
    },
    optionsBox: {
        //height: 130,
        position: 'relative',
        bottom: 0,
        left: 0,
        borderWidth: 1,
        borderColor: Theme.colors.gray[400],
    },
    optionSingle: {
        height: 50,
        borderBottomWidth: 1,
        borderColor: Theme.colors.gray[400],
    },
    optionSingle_title: {
        lineHeight: 50,
        paddingHorizontal: 18
    },
    dateComponent: {

    },
    buttonBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: -1,
    }
});

export default styles;