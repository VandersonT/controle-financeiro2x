/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '../../global/theme';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        //backgroundColor: Theme.colors.white[700],
        flex: 1
    },
    main: {
        position: 'relative',
        minHeight: screenHeight-411,
        zIndex: -1,
        marginHorizontal: 20,
        marginBottom: 60
    },
    newTransaction: {
        color: Theme.colors.primary[500],
        fontSize: Theme.fontSizes.md,
        marginTop: 30,
        marginBottom: 15,
    },
    transactionsBox: {
        marginTop: 6,
        width: '100%'
    },
    empty: {
        color: Theme.colors.gray[400],
        textAlign: 'center',
        fontSize: Theme.fontSizes.lg,
        marginTop: 50
    },
    transactionSingle: {
        width: '100%',
        height: 63,
        borderWidth: 1,
        borderColor: Theme.colors.white[500],
        borderRadius: 6,
        backgroundColor: Theme.colors.white[700],
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    transactionTitle: {
        color: Theme.colors.black[500],
        fontSize: Theme.fontSizes.md
    },
    leftSide: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    transactionValue: {
        fontSize: Theme.fontSizes.md,
        marginRight: 10
    },
    positiveTransaction: {
        color: Theme.colors.green[500]
    },
    negativeTransaction: {
        color: Theme.colors.red[500]
    },
    transactionSingle_detail: {
        backgroundColor: Theme.colors.white[700],
        position: 'relative',
        bottom: 3,
        borderColor: Theme.colors.white[500],
        borderWidth: 1,
        padding: 15,
        paddingTop: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    deleteTransactionBox: {
        borderTopWidth: 1,
        borderTopColor: Theme.colors.gray[400],
        marginTop: 20,
        paddingTop: 10
    },
    deleteTransaction: {
        color: Theme.colors.red[100],
        textAlign: 'center',
    },
    fieldSingle: {
        display: 'flex',
    },
    fieldTitle: {
        fontWeight: 'bold',
        fontSize: Theme.fontSizes.md,
        color: Theme.colors.black[300],
        marginTop: 20
    },
    description: {
        marginTop: 3,
        color: Theme.colors.black[300],
    }
});


export default styles;