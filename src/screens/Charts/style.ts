import { Theme } from "../../global/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    chartSingle: {
        width: '95%',
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.gray[400],
        marginBottom: 40,
        display: 'flex',
        alignItems: 'center'
    },
    chartsBox: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 50,
        paddingBottom: 70
    },
    chartTitle: {
        fontSize: Theme.fontSizes.xl,
        color: Theme.colors.gray[600],
        padding: 20,
        textAlign: 'center',
    },
    moneyjarsBox: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    moneyjarsBox_title: {
        color: Theme.colors.gray[600],
    },
    chartNote: {
        padding: 20,
        color: Theme.colors.gray[600],
        fontSize: Theme.fontSizes.md,
    },
    bold: {
        fontWeight: 'bold',
        color: Theme.colors.gray[600],
    }
});

export default styles;