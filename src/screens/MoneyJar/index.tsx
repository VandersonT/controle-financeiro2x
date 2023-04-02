import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './style';
import { useState, useRef, useEffect } from 'react';
import { MoneyJarT } from '../../Types/MoneyJarT';
import { Theme } from '../../global/theme';
import BrazilianRealFormat from '../../helpers/BrazilianRealFormat';
import NewBox from '../../components/NewBox';

let boxsSimulator = [
    {id: '232', name: 'Disponível', value: 123.00, user_id: '123', image: 'https://contextoatual.com.br/wp-content/uploads/2020/10/Foto-Mulher-com-leque-de-dinheiro-e-celular-nas-m%C3%A3os.jpg'},
]


const MoneyJar = ({ navigation }: any) => {

    const [ MoneyJars, SetMoneyJars ] = useState<MoneyJarT[]>(boxsSimulator);
    const [ modalNewBox, setModalNewBox ] = useState(false);
    const [ scrollEnabled, setScrollEnabled ] = useState<boolean>(true);

    const scrollViewRef = useRef<ScrollView>(null);
    const openCreateNewBoxModal = () => {
        setScrollEnabled(false);
        setModalNewBox(true);
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }

    const closeModal = () => {
        setScrollEnabled(true);
        setModalNewBox(false);
    }

    const boxCreatedSuccessfully = (newMoneyJar: any) => {

        let aux = MoneyJars;

        //aux.push(newMoneyJar);
        aux.splice(0, 0,newMoneyJar);

        SetMoneyJars([...aux]);

        /*Close transaction creation modal*/
        closeModal();
    }

    const renderItem = ({item, index}: any) => {

        const images = {
            travel: require('../../../assets/images/moneyJarCovers/travel.jpg'),
            disponivel: require('../../../assets/images/moneyJarCovers/freeMoney.jpeg'),
        };

        return (
            <TouchableOpacity style={styles.moneyJarsSingle}>
                <Image
                    style={{width: 84, height: 84, borderRadius: 4}}
                    source={{uri: item['image']}}
                />
                <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>{item['name']}</Text>
                    <Text  style={styles.infoValue}>{BrazilianRealFormat(item['value'])}</Text>
                </View>
                <MaterialIcons name="arrow-circle-up" size={35} color={Theme.colors.primary[500]} />
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView ref={scrollViewRef} scrollEnabled={scrollEnabled} style={styles.container}>

            {modalNewBox &&
                <NewBox closeFnc={closeModal} successFnc={boxCreatedSuccessfully} />
            }

            <Header nav={navigation} showMoney={false} />
            
            <View style={styles.topBarHeader}>
                <TouchableOpacity onPress={() => navigation.push('Home')}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Caixinhas [{MoneyJars.length}]</Text>
                <Text></Text>
            </View>

            <View style={styles.content}>
                
                <TouchableOpacity onPress={openCreateNewBoxModal}>
                    <Text style={styles.link}>Criar caixinha</Text>
                </TouchableOpacity>

                <View style={styles.moneyJarsBox}>

                    <FlatList
                        scrollEnabled={false}/*Desabilita o scroll do flatlist deixando apenas o scrollview*/
                        data={MoneyJars}
                        keyExtractor={item=>item.id}
                        renderItem={renderItem}/*A lista está sendo renderizada na função renderItem*/
                    />

                </View>

            </View>

        </ScrollView>
    );
}

export default MoneyJar;