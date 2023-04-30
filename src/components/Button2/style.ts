import { StyleSheet } from "react-native";
import { Theme } from "../../global/theme";

const styles = StyleSheet.create({
    button: {
        minWidth: 250,
        height: 45,
        borderRadius: 40,
        backgroundColor: Theme.colors.primary[300],
        margin: 5,
    },
    buttonText: {
        color: Theme.colors.white[700],
        fontSize: Theme.fontSizes.md,
        textAlign: 'center',
        lineHeight: 45,
    }
});

export default styles;