import { StyleSheet } from "react-native";
import { Theme } from "../../global/theme";

const styles = StyleSheet.create({
    container: {
        height: 170,
        backgroundColor: Theme.colors.primary[300],
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        color: Theme.colors.white[700],
        fontSize: Theme.fontSizes.xl,
        position: 'relative',
        right: 10
    }
});

export default styles;