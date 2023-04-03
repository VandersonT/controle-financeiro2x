import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../global/theme";

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.colors.white[700],
        height: screenHeight
    },
    messageBox: {
        marginTop: 30,
        padding: 20,
        paddingBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.gray[300],
    },
    message: {
        color: Theme.colors.gray[500],
        fontSize: Theme.fontSizes.md,
    },
    infoBox: {
        padding: 20
    },
    infoSingle: {
        width: '100%',
        marginBottom: 20
    },
    infoTitle: {
        fontWeight: "700",
        color: Theme.colors.gray[600],
        fontSize: Theme.fontSizes.md
    },
    infoContent: {
        color: Theme.colors.black[200]
    }
});

export default styles;