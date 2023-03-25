import { StyleSheet } from "react-native";
import { Theme } from "../../global/theme";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 171,
        backgroundColor: Theme.colors.secondary[700],
        marginBottom: 80
    },
    userName: {
        color: Theme.colors.white[700],
        fontSize: Theme.fontSizes.lg
    },
    headerBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 50
    },
    headerInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuButton: {
        color: Theme.colors.white[700]
    },
    infoBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'relative',
        top: 10
    },
    infoSingle: {
        width: 160,
        height: 83,
        position: 'relative',
        top: 25,
        backgroundColor: Theme.colors.white[700],
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        padding: 12,
    },
    infoTitleBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoTitle: {
        fontSize: Theme.fontSizes.md
    },
    infoTitle_white: {
        color: Theme.colors.white[700],
    },
    infoTitle_alert: {
        fontSize: Theme.fontSizes.sm,
        marginLeft: 5,
        color: Theme.colors.white[700],
    },
    money: {
        fontSize: Theme.fontSizes.lg,
        color: Theme.colors.black[300],
        marginTop: 10
    },
    money_white: {
        color: Theme.colors.white[700]
    }
});

export default styles;