/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import { StyleSheet, Dimensions } from 'react-native';
import { Theme } from '../../global/theme';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: '100%',
        flex: 1,
        backgroundColor: Theme.colors.white[700],
    },
    mainBox: {
        display: 'flex',
        alignItems: 'center'
    },
    formBox: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 50
    },
    titleBox: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 17,
        marginBottom: 40
    },
    title1: {
        color: Theme.colors.black[700],
        fontSize: Theme.fontSizes.xxl
    },
    title2: {
        fontSize: Theme.fontSizes.xxl,
        marginLeft: 10,
        color: Theme.colors.primary[300]
    },
    input: {
        width: 250,
        borderWidth: 1,
        borderColor: Theme.colors.gray[400],
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 40,
        fontSize: Theme.fontSizes.md,
        textAlign: 'center',
        marginBottom: 20,
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
    link: {
        color: Theme.colors.blue[300],
    }
});

export default styles;