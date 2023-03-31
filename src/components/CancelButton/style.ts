import { StyleSheet } from "react-native";
import { Theme } from "../../global/theme";

const styles = StyleSheet.create({
    button: {
        minWidth: 130,
        height: 45,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: Theme.colors.red[100],
        margin: 5
    },
    buttonText: {
        color: Theme.colors.red[100],
        fontSize: Theme.fontSizes.md,
        textAlign: 'center',
        lineHeight: 45,
    }
});

export default styles;