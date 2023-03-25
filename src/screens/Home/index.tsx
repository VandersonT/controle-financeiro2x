/*----------------------------------------*/
/*              IMPORTS                   */
/*----------------------------------------*/
import React from "react";
import { View, Text, Button } from 'react-native';
import styles from "./style";
import Header from '../../components/Header';


const Home = ({ navigation }: any) => {

    return (
        <View style={styles.container}>
            
            <Header nav={navigation} />
            
            <View style={styles.main}>
                <Text>Conteudo</Text>        
            </View>
        
        </View>
    );
}

export default Home;