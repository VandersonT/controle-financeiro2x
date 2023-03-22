import React from "react";
import { View, Text, StyleSheet, Button } from 'react-native';

const Home = ({ navigation }: any) => {

    const handleSubmit = () => {
        navigation.push('SignIn');
    }

    return (
        <View style={styles.container}>
            <Text>Tela de Home - Seja bem vindo</Text>

            <Button title="Login" onPress={handleSubmit} />
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

export default Home;