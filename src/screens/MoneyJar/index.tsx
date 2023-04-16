import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './style';
import { useState, useRef, useEffect, useContext } from 'react';
import { MoneyJarT } from '../../Types/MoneyJarT';
import { Theme } from '../../global/theme';
import BrazilianRealFormat from '../../helpers/BrazilianRealFormat';
import NewBox from '../../components/NewBox';

//Firebase Imports
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../../config/firebase';
import { Context } from '../../context/Context';
import { Transaction } from '../../Types/Transaction';




/*let boxsSimulator = [
    {id: '0', title: 'none', created_at: 0, money: 0, user_id: '0', image: 'https://contextoatual.com.br/wp-content/uploads/2020/10/Foto-Mulher-com-leque-de-dinheiro-e-celular-nas-m%C3%A3os.jpg'},
]*/

const MoneyJar = ({ navigation }: any) => {

    /*----------------------------------------*/
    /*               STATE                    */
    /*----------------------------------------*/
    const [ MoneyJars, SetMoneyJars ] = useState<MoneyJarT[]>([]);
    const [ modalNewBox, setModalNewBox ] = useState(false);
    const [ scrollEnabled, setScrollEnabled ] = useState<boolean>(true);

    //Getting user's context
    const { state, dispatch } = useContext(Context);


    /*----------------------------------------*/
    /*              EFFECTS                   */
    /*----------------------------------------*/
    useEffect(() => {
        //get all user's moneyJars
        getMoneyJars();
    }, []);

    const getMoneyJars = async () => {

        const q = query(collection(db, "moneyJar"), where("user_id", "==", state.user.id));

        const querySnapshot = await getDocs(q);

        let moneyJarAux: MoneyJarT[] = [];

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            
            moneyJarAux.splice(0, 0, {
                id: doc.data().id,
                title: doc.data().title,
                money: doc.data().money,
                user_id: doc.data().user_id,
                image: doc.data().image,
                created_at: doc.data().created_at
            });
        })
        
        /*--------------Get MoneyJars values--------------*/
        for(let i = 0; i < moneyJarAux.length; i++){

            const q = query(collection(db, "transaction"), where("where", "==", moneyJarAux[i].title));

            const querySnapshot = await getDocs(q);

            let transactionsAux = 0;

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                transactionsAux += doc.data().value;
            })
            
            moneyJarAux[i].money = transactionsAux;
        }

        //
        SetMoneyJars(moneyJarAux);
    };


    /*----------------------------------------*/
    /*             FUNCTIONS                  */
    /*----------------------------------------*/
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

    const openMoneyJar = (boxId: string) => {

        navigation.push('MoneyJarOpened', {boxId})
    }

    const renderItem = ({item, index}: any) => {

        return (
            <TouchableOpacity onPress={() => openMoneyJar(item.id)} style={styles.moneyJarsSingle}>
                <Image
                    style={{width: 84, height: 84, borderRadius: 4}}
                    source={{uri: item['image']}}
                />
                <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>{item['title']}</Text>
                    <Text  style={styles.infoValue}>{BrazilianRealFormat(item['money'])}</Text>
                </View>
                <MaterialIcons name="arrow-circle-up" size={35} color={Theme.colors.primary[500]} />
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView ref={scrollViewRef} scrollEnabled={scrollEnabled} style={styles.container}>

            {modalNewBox &&
                <NewBox userId={state.user.id} closeFnc={closeModal} successFnc={boxCreatedSuccessfully} />
            }

            <Header username='coloca aqui tbem' nav={navigation} showMoney={false} />
            
            <View style={styles.topBarHeader}>
                <TouchableOpacity onPress={() => navigation.push('Home')}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Caixinhas ({MoneyJars.length})</Text>
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