import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, Alert } from 'react-native';
import Header from '../../components/Header';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './style';
import { useState, useRef, useEffect, useContext } from 'react';
import { MoneyJarT } from '../../Types/MoneyJarT';
import { Theme } from '../../global/theme';
import BrazilianRealFormat from '../../helpers/BrazilianRealFormat';
import NewBox from '../../components/NewBox';

//Firebase Imports
import { collection, doc, getDocs, limit, orderBy, query, startAfter, updateDoc, where } from 'firebase/firestore';
import db from '../../config/firebase';
import { Context } from '../../context/Context';
import Loading from '../../components/Loading';




/*let boxsSimulator = [
    {id: '0', title: 'none', created_at: 0, money: 0, user_id: '0', image: 'https://contextoatual.com.br/wp-content/uploads/2020/10/Foto-Mulher-com-leque-de-dinheiro-e-celular-nas-m%C3%A3os.jpg'},
]*/

const MoneyJar = ({ navigation }: any) => {

    /*----------------------------------------*/
    /*               STATE                    */
    /*----------------------------------------*/
    const [ moneyJars, setMoneyJars ] = useState<any>([]);
    const [lastVisible, setLastVisible] = useState<any>(null);
    const [ modalNewBox, setModalNewBox ] = useState(false);
    const [ scrollEnabled, setScrollEnabled ] = useState<boolean>(true);
    const [ loading, setLoading ] = useState(false);
    const [ moreTransactionsAvailable, setMoreTransactionsAvailable] = useState(true);
    const [ moneyJarsPerPage, setMoneyJarssPerPage ] = useState(10);

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

        setLoading(true);

         // Query the first page of docs
         const first = query(collection(db, "moneyJar"),
            where("user_id", "==", state.user.id),
            orderBy("created_at", "desc"),
            limit(moneyJarsPerPage)
        );
        
        const moneyJarsData:any = [];
        await getDocs(first).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                moneyJarsData.push(doc.data());
            });
            setMoneyJars(moneyJarsData);
            setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1]);
        });


        /*--------------Get MoneyJars values--------------*/
        for(let i = 0; i < moneyJarsData.length; i++){

            const q = query(collection(db, "transaction"), where("where", "==", moneyJarsData[i].title), where("user_id", "==", state.user.id));

            const querySnapshot = await getDocs(q);

            let transactionsAux = 0;

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                transactionsAux += doc.data().value;
            })
            
            moneyJarsData[i].money = transactionsAux;
        }

        setLoading(false);
    };

    const loadMore = async () => {
        const next = query(collection(db, "moneyJar"),
            where("user_id", "==", state.user.id),
            orderBy("created_at", "desc"),
            startAfter(lastVisible),
            limit(moneyJarsPerPage)
        );
        const querySnapshot = await getDocs(next);
        const moneyJarsData: any = [];
        await querySnapshot.forEach((doc) => {
            moneyJarsData.push(doc.data());
        });

        if(moneyJarsData.length != 0){
            //setMoneyJars(moneyJarsData);
            setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1]);
        }else{
            Alert.alert("Isso é tudo", "Essas são todas as transações que você já realizou nesta conta.");
            setMoreTransactionsAvailable(false);
        }

        
        /*--------------Get MoneyJars values--------------*/
        for(let i = 0; i < moneyJarsData.length; i++){

            const q = query(collection(db, "transaction"), where("where", "==", moneyJarsData[i].title), where("user_id", "==", state.user.id));

            const querySnapshot = await getDocs(q);

            let transactionsAux = 0;

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                transactionsAux += doc.data().value;
            })
            
            moneyJarsData[i].money = transactionsAux;
        }
        /*------------------------------------------------*/


        /*Update moneyJars state*/
        setMoneyJars([...moneyJars, ...moneyJarsData]);
        
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

    const boxCreatedSuccessfully = async (newMoneyJar: any) => {

        await updateDoc(doc(db, "user", state.user.id), {
            totalMoneyJars: state.user.totalMoneyJars + 1
        });
        dispatch({
            type: 'CHANGE_TOTALMONEYJARS',
            payload: {
                totalMoneyJars: state.user.totalMoneyJars + 1
            }
        });

        /****/
        let aux = moneyJars;

        //aux.push(newMoneyJar);
        aux.splice(0, 0,newMoneyJar);

        setMoneyJars([...aux]);

        /*Close transaction creation modal*/
        closeModal();
    }

    const openMoneyJar = (boxTitle: string, boxId: string, index: number) => {
        navigation.push('MoneyJarOpened', {boxTitle, boxId, totalMoney: moneyJars[index].money})
    }

    const renderItem = ({item, index}: any) => {

        return (
            <TouchableOpacity onPress={() => openMoneyJar(item.title, item.id, index)} style={styles.moneyJarsSingle}>
                <Image
                    style={{width: 84, height: 84, borderRadius: 4}}
                    source={{uri: item['image']}}
                />
                <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>{item['title']}</Text>
                    <Text  style={styles.infoValue}>
                        {(item['money'] > 99999999) ? 'R$ 99.999.999+' : null}
                        {(item['money'] < -99999999) ? '-R$ 99.999.999-' : null}
                        {(item['money'] < 99999999 && item['money'] > -99999999) ? BrazilianRealFormat(item['money']) : null}
                    </Text>
                </View>
                <MaterialIcons name="arrow-circle-up" size={35} color={Theme.colors.primary[500]} />
            </TouchableOpacity>
        )
    }

    return (
        <>
            {modalNewBox &&
                <NewBox userId={state.user.id} closeFnc={closeModal} successFnc={boxCreatedSuccessfully} />
            }
            <ScrollView ref={scrollViewRef} scrollEnabled={scrollEnabled} style={styles.container}>

                <Header nav={navigation} showMoney={false} />
                
                <View style={styles.topBarHeader}>
                    <TouchableOpacity onPress={() => navigation.push("Home")}>
                        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Caixinhas ({state.user.totalMoneyJars})</Text>
                    <Text></Text>
                </View>

                <View style={styles.content}>
                    
                    <TouchableOpacity onPress={openCreateNewBoxModal}>
                        <Text style={styles.link}>Criar caixinha</Text>
                    </TouchableOpacity>

                    {loading && moneyJars.length < 1 &&
                        <View style={{ marginTop: 55 }}>
                            <Loading />
                        </View>
                    }

                    <View style={styles.moneyJarsBox}>

                        <FlatList
                            scrollEnabled={false}/*Desabilita o scroll do flatlist deixando apenas o scrollview*/
                            data={moneyJars}
                            keyExtractor={item=>item.id}
                            renderItem={renderItem}/*A lista está sendo renderizada na função renderItem*/
                        />

                        {moneyJars.length >= moneyJarsPerPage && moreTransactionsAvailable &&
                            <TouchableOpacity onPress={loadMore}>
                                <Text style={styles.loadMore}>Carregar mais</Text>
                            </TouchableOpacity>
                        }

                    </View>

                </View>

            </ScrollView>
        </>
    );
}

export default MoneyJar;