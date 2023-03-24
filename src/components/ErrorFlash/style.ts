import { StyleSheet } from "react-native"
import { Theme } from "../../global/theme";

const styles = StyleSheet.create({
    errorBox: {
        width: '90%',
        position: 'absolute',
        zIndex: 2,
        top: 62,
        borderRadius: 3,
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14
    },
    errorMsg: {
        color: '#FFFFFF',
        fontSize: Theme.fontSizes.md
    },
    closeButton: {
        color: Theme.colors.white[700],
        fontSize: Theme.fontSizes.md
    }
});

export default styles;