/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '../../global/theme';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: screenHeight,
        backgroundColor: Theme.colors.gray[200],
        paddingBottom: 50
    },
    main: {
        position: 'relative',
        zIndex: -1,
        marginHorizontal: 20
    },
    newTransaction: {
        color: Theme.colors.primary[500],
        fontSize: Theme.fontSizes.md
    },
    transactionsBox: {
        marginTop: 20,
        width: '100%',
    },
    transactionSingle: {
        width: '100%',
        height: 63,
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
        borderColor: Theme.colors.gray[200],
        borderTopWidth: 1,
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