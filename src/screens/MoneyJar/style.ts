import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../global/theme";


const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.colors.white[700],
        minHeight: screenHeight,
    },
    content: {
        width: '100%',
        paddingHorizontal: 15,
    },
    topBarHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#fff",
        marginBottom: 40,
    },
    title: {
        fontSize: Theme.fontSizes.xl,
        fontWeight: "700",
        color: Theme.colors.secondary[200]
    },
    link: {
        color: Theme.colors.primary[500],
        fontSize: Theme.fontSizes.md,
        marginTop: 30,
        marginBottom: 15,
    },
    moneyJarsBox: {
        minHeight: screenHeight-440,
        marginTop: 15,
        marginBottom: 100
    },
    moneyJarsSingle: {
        height: 106,
        backgroundColor: Theme.colors.white[700],
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5
    },
    infoBox: {
        width: 170,
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    infoTitle: {
        fontSize: Theme.fontSizes.lg,
        fontWeight: "700",
        color: Theme.colors.secondary[200]
    },
    infoValue: {
        fontSize: Theme.fontSizes.lg,
        color: Theme.colors.secondary[200]
    }
});

export default styles;