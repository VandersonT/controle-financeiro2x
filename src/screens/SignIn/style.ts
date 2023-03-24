/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import { StyleSheet } from 'react-native';
import { Theme } from '../../global/theme';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        fontWeight: '400',
        fontSize: Theme.fontSizes.xxl,
        marginLeft: 15
    },
    loginBox: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    fieldSingle: {
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 30
    },
    label: {
        fontSize: Theme.fontSizes.md,
        marginBottom: 10
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