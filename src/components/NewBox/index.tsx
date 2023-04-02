import { ScrollView, Text, TextInput, TouchableOpacity, View, Platform, KeyboardAvoidingView, Alert, Image } from 'react-native';
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
    { id: '2', label: 'Imagem-1', value: 'Outros', image: 'https://contextoatual.com.br/wp-content/uploads/2020/10/Foto-Mulher-com-leque-de-dinheiro-e-celular-nas-m%C3%A3os.jpg'},
    { id: '1', label: 'Imagem-2', value: 'emergency', image: 'https://www.infomoney.com.br/wp-content/uploads/2019/06/dinheiro-emergencia.jpg?fit=900%2C600&quality=50&strip=all'},
    { id: '3', label: 'Imagem-3', value: 'Viagens', image: 'https://braziljournal.com/wp-content/uploads/2022/12/shutterstock_249702325.jpg'},
    { id: '3', label: 'Imagem-4', value: 'Viagens', image: 'https://braziljournal.com/wp-content/uploads/2022/12/shutterstock_249702325.jpg'},
];

const NewBox = ({ closeFnc, successFnc }: Props) => {

    const [boxName, setBoxName] = useState('');
    
    const buttonRef = useRef<TouchableOpacity>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);


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

    const createBox = () => {
        
        if(!boxName || !selectedOption.image){
            Alert.alert('Ocorreu um erro', 'Preencha todos os campos antes de continuar.');
            return;
        }

        let id = uuid.v4();
        successFnc({
            id,
            name: boxName,
            value: 0,
            user_id: '123',
            image: selectedOption.image
        });

        //successFnc({id: '346', name: 'novo', value: 3123.00, user_id: '123', image: 'https://www.infomoney.com.br/wp-content/uploads/2019/06/dinheiro-emergencia.jpg?fit=900%2C600&quality=50&strip=all'})

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
                    <Text style={styles.title}>Criar Caixinha</Text>

                    <View style={styles.form}>
                        
                        <TextInput style={styles.input} onChangeText={setBoxName} value={boxName} placeholder="Digite o nome da caixinha" />
                        
                        <View>
                            <TouchableOpacity style={styles.inputImage} onPress={() => setIsOpen(!isOpen)}>
                                <Image
                                    style={{width: 60, height: 60, borderRadius: 3}}
                                    source={{uri: selectedOption['image']}}
                                />
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
                                            <Image
                                                style={{width: 50, height: 50, borderRadius: 3}}
                                                source={{uri: option['image']}}
                                            />
                                            <Text style={[styles.optionSingle_title, (option.id == '0') ? styles.unSelected : null]}>{option.label}</Text>
                                        </TouchableOpacity>
                                    ))}

                                </View>
                            )}
                        </View>

                    </View>

                    <View style={styles.buttonBox}>
                        <CancelButton title="Cancelar" fnc={closeFnc} />
                        <Button1 title="Continuar" fnc={createBox} />
                    </View>
                    </ScrollView>
                </TouchableOpacity>

            </TouchableOpacity>
        </KeyboardAvoidingView>

    );
}

export default NewBox;