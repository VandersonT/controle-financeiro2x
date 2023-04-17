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
    labelAvatar: {
        fontSize: Theme.fontSizes.lg,
        color: Theme.colors.gray[500],
    },
    selectAvatarBox: {
        marginBottom: 30,
        marginTop: 20
    },
    imageName: {
        textAlign: 'center',
        fontSize: Theme.fontSizes.md,
        borderWidth: 1,
        borderRadius: 2,
        marginTop: 2,
        borderColor: Theme.colors.gray[400],
        width: 100,
        backgroundColor: Theme.colors.gray[200],
        color: Theme.colors.black[300]
        
    },
    avatarSelected: {
        backgroundColor: Theme.colors.primary[300],
        color: Theme.colors.white[700]
    },
    avatarSingle: {
        margin: 4
    },
    boxAvatars: {
        borderWidth: 1,
        borderColor: Theme.colors.gray[400],
        paddingHorizontal: 15,
        paddingVertical: 6,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%'
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 80,
        marginBottom: 90,
        minHeight: screenHeight-396
    },
    selectBox: {
        display: 'flex',
        alignItems: 'center'
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
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
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