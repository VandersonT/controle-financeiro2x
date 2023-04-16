import { ScrollView, Text, TextInput, TouchableOpacity, View, Platform, KeyboardAvoidingView, Alert, Image } from 'react-native';
import Button1 from '../Button1';
import CancelButton from '../CancelButton';
import styles from './style';
import { useState, useRef, useEffect } from 'react';
import BrazillianDateFormat from '../../helpers/BrazillianDateFormat';
import uuid from 'react-native-uuid';
import { collection, doc, setDoc } from 'firebase/firestore';
import db from '../../config/firebase';
import { MoneyJarT } from '../../Types/MoneyJarT';

type Props = {
    closeFnc: () => void,
    successFnc: any,
    userId: string
}


const options = [
    { id: '2', label: 'Imagem-1', value: 'Outros', image: 'https://contextoatual.com.br/wp-content/uploads/2020/10/Foto-Mulher-com-leque-de-dinheiro-e-celular-nas-m%C3%A3os.jpg'},
    { id: '1', label: 'Imagem-2', value: 'emergência', image: 'https://www.infomoney.com.br/wp-content/uploads/2019/06/dinheiro-emergencia.jpg?fit=900%2C600&quality=50&strip=all'},
    { id: '3', label: 'Imagem-3', value: 'Viagens', image: 'https://braziljournal.com/wp-content/uploads/2022/12/shutterstock_249702325.jpg'},
    { id: '4', label: 'Imagem-4', value: 'Religião', image: 'https://img.cancaonova.com/cnimages/canais/uploads/sites/6/2009/05/formacao_por-que-desejar-o-batismo-no-espirito-santo.jpg'},
    { id: '5', label: 'Imagem-5', value: 'Perigo', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6RZjqjdkiIogp-kkjwInQVSBWO7pf1KTLpA&usqp=CAU'},
    { id: '6', label: 'Imagem-6', value: 'Dinheiro', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxLL-MSjil0dLZmHvJ5lICR9j6ipdgVKVa-g&usqp=CAU'},
    { id: '7', label: 'Imagem-7', value: 'Riquesa', image: 'https://media.istockphoto.com/id/1094827312/photo/young-rich-businessman-talking-on-a-mobile-phone-while-getting-out-of-a-luxurious-car-parked.jpg?s=612x612&w=0&k=20&c=2woZM6bO93jwiFi5RNnBg6JKSD6_NSSl5z4-R0yCvZM='},
    { id: '8', label: 'Imagem-8', value: 'Caridade', image: 'https://blog.avemaria.com.br/restrito/img/noticias/7d73f4c6f09079f60458b12e1b316d35.png'},
    { id: '9', label: 'Imagem-9', value: 'Caridade2', image: 'https://versiculoscomentados.com.br/estudos-biblicos/wp-content/uploads/2021/09/versiculos-sobre-caridade.jpg'},
    { id: '10', label: 'Imagem-10', value: 'Aposentadoria', image: 'data:image/jpeg;base64,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'},
    { id: '11', label: 'Imagem-11', value: 'Aposentadoria2', image: 'https://www.feebpr.org.br/images/media/7103082226218b69c1e691.jpg'},
    { id: '12', label: 'Imagem-12', value: 'Investimento', image: 'https://files.sunoresearch.com.br/p/uploads/2018/08/empresas-de-investimento-800x450.jpg'},
];

const NewBox = ({ closeFnc, successFnc, userId }: Props) => {

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

    const saveMoneyJar = async (newMoneyJar: MoneyJarT) => {
        const moneyJarRef = collection(db, "moneyJar");

        await setDoc(doc(moneyJarRef, newMoneyJar.id), newMoneyJar);
    }
    
    const createBox = () => {
        
        if(!boxName || !selectedOption.image){
            Alert.alert('Ocorreu um erro', 'Preencha todos os campos antes de continuar.');
            return;
        }

        let id = uuid.v4();
        let newMoneyJar: MoneyJarT = {
            id: id.toString(),
            title: boxName,
            money: 0,
            user_id: userId,
            image: selectedOption.image,
            created_at:  Math.floor(Date.now() / 1000)
        }

        /*Send this moneyJar to firebase*/
        saveMoneyJar(newMoneyJar);

        /*Return data to the main screen*/
        successFnc(newMoneyJar);

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