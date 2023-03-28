import { StyleSheet } from "react-native";
import { Theme } from "../../global/theme";

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 3,
        backgroundColor: Theme.colors.primary[300]
    },
    buttonText: {
        color: Theme.colors.white[700],
        fontSize: Theme.fontSizes.md
    }
});

export default styles;