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
    { id: '10', label: 'Imagem-10', value: 'Aposentadoria', image: 'https://bramanteprevidencia.adv.br/wp-content/uploads/2019/07/como-saber-qual-regra-de-transicao-da-aposentadoria-e-melhor-para-voce.jpg'},
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