import React from "react";
import { View, Text, Button } from 'react-native';
import styles from "./style";

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

export default Home;