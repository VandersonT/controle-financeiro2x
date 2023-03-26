/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import { StyleSheet } from 'react-native';
import { Theme } from '../../global/theme';


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoBox: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 100
    },
    logoText: {
        fontWeight: '400',
        fontSize: Theme.fontSizes.xxl,
        marginLeft: 15,
        color: Theme.colors.black[500],
        marginTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 3,
        borderColor: Theme.colors.primary[700]
    },
    mainBox: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    margimBottom: {
        marginBottom: 50
    },
    fieldSingle: {
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 30
    },
    label: {
        fontSize: Theme.fontSizes.md,
        marginBottom: 10,
        color: Theme.colors.black[500]
    },
    input: {
        width: '100%',
        backgroundColor: Theme.colors.white[700],
        height: 40,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    link: {
        marginTop: 20
    },
    linkText: {
        color: Theme.colors.blue[300],
        textAlign: 'center'
    }
});

export default styles;