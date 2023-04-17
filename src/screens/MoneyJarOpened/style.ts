import { StyleSheet } from "react-native";
import { Theme } from "../../global/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    empty:{
        color: Theme.colors.gray[500],
        fontSize: Theme.fontSizes.md
    },
    topBarHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: Theme.colors.white[600],
    },
    title: {
        fontSize: Theme.fontSizes.xl,
        fontWeight: "700",
        color: Theme.colors.secondary[200]
    },
    text: {
        color: Theme.colors.black[200]
    },
    mainInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        height: 132,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        padding: 20,

        
    },
    value: {
        fontSize: Theme.fontSizes.xl,
        color: Theme.colors.secondary[200],
        marginBottom: 5
    },
    delete: {
        color: Theme.colors.red[300],
        fontSize: Theme.fontSizes.md,
    },
    historic: {
        marginTop: 20,
        padding: 20
    },
    historicTitle: {
        fontSize: Theme.fontSizes.lg,
        fontWeight: "700",
        color: Theme.colors.secondary[200],
        marginBottom: 10,
    },
    transactionSingle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingVertical: 40
    },
    transactionDate: {
        color: Theme.colors.gray[500]
    },
    info1: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    transactionTitle: {
        fontSize: Theme.fontSizes.md,
        fontWeight: "700",
        color: Theme.colors.secondary[200]
    },
    transactionInfo: {
        color: Theme.colors.gray[500]
    },
    note: {
        maxWidth: 160,
        marginLeft: 20
    },
    transactionValue: {
        fontSize: Theme.fontSizes.md,
        fontWeight: "600",
        color: Theme.colors.secondary[200]
    }
});

export default styles;