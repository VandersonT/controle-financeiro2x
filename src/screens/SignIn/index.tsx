import React from "react";
import { View, Text, StyleSheet, Button } from 'react-native';


const SignIn = ({ navigation }: any) => {

    const handleSubmit = () => {
        navigation.push('Home');
    }

    return (
        <View style={styles.container}>
            <Text>Tela Login</Text>
            <Button title="Entrar" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SignIn;