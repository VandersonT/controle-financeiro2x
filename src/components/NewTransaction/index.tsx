import { ScrollView, Text, TextInput, TouchableOpacity, View, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import Button1 from '../Button1';
import CancelButton from '../CancelButton';
import styles from './style';
import { useState, useRef, useEffect } from 'react';
import BrazillianDateFormat from '../../helpers/BrazillianDateFormat';
import uuid from 'react-native-uuid';

type Props = {
    closeFnc: () => void,
    successFnc: any
}


const options = [
    { id: '1', label: 'Emergência', value: 'Emergência'},
    { id: '2', label: 'Disponível', value: 'Disponível'},
    { id: '3', label: 'Viagens', value: 'Viagens'},
    { id: '4', label: 'Obra', value: 'Obra'},
    { id: '5', label: 'Investimentos', value: 'Investimentos'},
  ];

const NewTransaction = ({ closeFnc, successFnc }: Props) => {

    const [inputDate, setInputDate] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [inputTransactionTitle, setInputTransactionTitle] = useState('');
    const buttonRef = useRef<TouchableOpacity>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handlePress = (event: any) => {
        if (event.target === buttonRef.current) {
            console.log('Button clicked!');
            // Execute a ação desejada quando o botão é clicado diretamente
        }
    };

    const handleInputDate = (date: string) => {
        
        let formattedDate = BrazillianDateFormat(date);

        setInputDate(formattedDate);
    };

    const handleOptionPress = (option:any) => {

        if(option.id == '0')
            return;

        setSelectedOption(option);
        setIsOpen(false);
    };

    const createTransaction = () => {
        if(!inputTransactionTitle || !inputValue || !selectedOption.id || !inputDate){
            Alert.alert('Ocorreu um erro', 'Preencha todos os campos antes de continuar.');
            return;
        }

        //Manda para o banco de dados a nova transação
        
        let id = uuid.v4();
        successFnc({
            id,
            title: inputTransactionTitle,
            value: parseInt(inputValue),
            description: 'esqueci do input disso',
            date: inputDate,
            where: selectedOption.value
        });
    }

    const renderItem = ({ item }:any) => (
        <TouchableOpacity style={styles.optionSingle}>
            <Text>{item.label}</Text>
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
                        <TextInput style={styles.input} onChangeText={setInputValue} value={inputValue} keyboardType="numeric" placeholder="Digite o Valor" />
                        
                        <View>
                            <TouchableOpacity style={styles.input} onPress={() => setIsOpen(!isOpen)}>
                                <Text style={styles.selectTitle}>{selectedOption.label}</Text>
                            </TouchableOpacity>
                            {isOpen && (
                                <View style={styles.optionsBox}>

                                    {options.map((option) => (
                                        <TouchableOpacity
                                            key={option.id}
                                            onPress={() => handleOptionPress(option)}
                                            style={styles.optionSingle}
                                        >
                                            <Text style={[styles.optionSingle_title, (option.id == '0') ? styles.unSelected : null]}>{option.label}</Text>
                                        </TouchableOpacity>
                                    ))}

                                </View>
                            )}
                        </View>

                        <TextInput value={inputDate} onChangeText={handleInputDate} style={styles.input} placeholder="dd/mm/yyyy" />

                    </View>

                    <View style={styles.buttonBox}>
                        <CancelButton title="Cancelar" fnc={closeFnc} />
                        <Button1 title="Continuar" fnc={createTransaction} />
                    </View>
                    </ScrollView>
                </TouchableOpacity>

            </TouchableOpacity>
        </KeyboardAvoidingView>

    );
}

export default NewTransaction;