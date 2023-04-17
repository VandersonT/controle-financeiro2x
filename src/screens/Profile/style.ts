import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "../../global/theme";

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.colors.white[700]
    },
    info1Box: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 50
    },
    userName: {
        fontSize: Theme.fontSizes.xl,
        marginTop: 10,
        marginBottom: 20,
        color: Theme.colors.black[300]
    },
    info2Box: {
        marginTop: 60,
        paddingHorizontal: 40,
        height: 240,
    },
    infoSingle:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    infoContent: {
        fontSize: Theme.fontSizes.md,
        marginLeft: 15,
        color: Theme.colors.black[200]
    }
});

export default styles;