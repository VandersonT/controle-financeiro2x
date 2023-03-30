import { StyleSheet } from "react-native";
import { Theme } from "../../global/theme";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        backgroundColor: Theme.colors.primary[300]
    },
    footerText: {
        color: Theme.colors.white[700],
        textAlign: 'center',
        lineHeight: 56
    }
});

export default styles;