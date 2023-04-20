import { ScrollView, Text, TextInput, TouchableOpacity, View, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import Button1 from '../Button1';
import CancelButton from '../CancelButton';
import styles from './style';
import { useState, useRef, useEffect, useContext } from 'react';
import BrazillianDateFormat from '../../helpers/BrazillianDateFormat';
import uuid from 'react-native-uuid';

//Firebase Imports
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import db from '../../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../context/Context';

type Props = {
    closeFnc: () => void,
    successFnc: any
}

const initialOptions = [
    { id: '1', label: 'none', title: 'Selecione uma caixinha'},
];

type optionsType = {
    id: string,
    label: string,
    title: string,
}

const NewTransaction = ({ closeFnc, successFnc }: Props) => {


    //Getting user's context
    const { state, dispatch } = useContext(Context);

    /*----------------------------------------*/
    /*               STATE                    */
    /*----------------------------------------*/
    const [inputValue, setInputValue] = useState('');
    const [inputDescription, setInputDescription] = useState(''); 
    const [inputTransactionTitle, setInputTransactionTitle] = useState('');
    const buttonRef = useRef<TouchableOpacity>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [ options, setOptions ] = useState<optionsType[]>(initialOptions);
    const [selectedOption, setSelectedOption] = useState<optionsType>(options[0]);
    const [ transactionLoad, setTransactionLoad ] = useState(false);


    /*----------------------------------------*/
    /*              EFFECTS                   */
    /*----------------------------------------*/
    useEffect(() => {
        //get all user's moneyJars
        getMoneyJars();
        setTransactionLoad(false);
    }, []);


    /*----------------------------------------*/
    /*             FUNCTIONS                  */
    /*----------------------------------------*/
    const getMoneyJars = async () => {

        const q = query(collection(db, "moneyJar"), where("user_id", "==", state.user.id));

        const querySnapshot = await getDocs(q);

        let optionsAux: optionsType[] = [];

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            
            optionsAux.splice(0, 0, {
                id: doc.data().id,
                label: doc.data().title,
                title: doc.data().title
            });
        })
        
        setOptions(optionsAux);
    };


    const handlePress = (event: any) => {
        if (event.target === buttonRef.current) {
            console.log('Button clicked!');
            // Execute a ação desejada quando o botão é clicado diretamente
        }
    };

    const handleOptionPress = (option:any) => {

        if(option.id == '0')
            return;

        setSelectedOption(option);
        setIsOpen(false);
    };

    const createTransaction = async () => {
        
        if(!inputTransactionTitle || !inputValue || !selectedOption.id || !inputDescription){
            Alert.alert('Ocorreu um erro', 'Preencha todos os campos antes de continuar.');
            return;
        }

        if(selectedOption['label'] == 'none'){
            Alert.alert('Espere um momento', 'Antes de continuarmos, você deve escolher uma caixinha.');
            return;
        }
        
        
        let value = parseFloat(inputValue.replace(',', '.')); //Convert string value to float value
        
        if(value == 0){
            Alert.alert('Espere um momento', 'Para que você fará uma transação em que não perdeu nem ganhou nada?');
            return;
        }

        setTransactionLoad(true);

        /*------------Create transaction array-----------*/
        let randomId = uuidv4();
        let transaction = {
            id: randomId,
            title: inputTransactionTitle,
            description: inputDescription,
            value: value,
            where: selectedOption.title,
            user_id: state.user.id,
            created_at: Math.floor(Date.now() / 1000)
        }
        /*-----------------------------------------------*/
        
        //return this new function to this function
        successFnc(transaction);
    }

    const renderItem = ({ item }:any) => (
        <TouchableOpacity style={styles.optionSingle}>
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView style={styles.bgDark} keyboardVerticalOffset={0} behavior={(Platform.OS == "ios") ? "padding" : "height" }>
            <TouchableOpacity ref={buttonRef} onPress={closeFnc} style={styles.container}>
                
                <TouchableOpacity activeOpacity={1} style={styles.newTransactionBox}>

                    <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Nova Transação</Text>

                    <View style={styles.form}>
                        
                        <TextInput style={styles.input} onChangeText={setInputTransactionTitle} value={inputTransactionTitle} placeholder="Titulo da Transação" />
                        <TextInput style={styles.input} onChangeText={setInputDescription} value={inputDescription} placeholder="Digite uma descrição" />
                        <TextInput style={styles.input} onChangeText={setInputValue} value={inputValue} keyboardType="numeric" placeholder="Digite o Valor" />
                        
                        <View>
                            <TouchableOpacity style={styles.input} onPress={() => setIsOpen(!isOpen)}>
                                <Text style={styles.selectTitle}>{selectedOption.title}</Text>
                            </TouchableOpacity>
                            {isOpen && (
                                <View style={styles.optionsBox}>
                                    {options.map((option) => (
                                        <TouchableOpacity
                                            key={option.id}
                                            onPress={() => handleOptionPress(option)}
                                            style={styles.optionSingle}
                                        >
                                            <Text style={[styles.optionSingle_title, (option.id == '0') ? styles.unSelected : null]}>{option.title}</Text>
                                        </TouchableOpacity>
                                    ))}

                                </View>
                            )}
                        </View>

                    </View>

                    <View style={styles.buttonBox}>
                        <CancelButton title="Cancelar" fnc={closeFnc} />
                        <Button1 title={(transactionLoad) ? 'Criando...' : 'Continuar'} fnc={createTransaction} />
                    </View>
                    </ScrollView>
                </TouchableOpacity>

            </TouchableOpacity>
        </KeyboardAvoidingView>

    );
}

export default NewTransaction;