import { View, Text, ScrollView } from 'react-native';
import { VictoryPie, VictoryChart, VictoryTheme, VictoryBar } from "victory-native";
import styles from './style';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../../config/firebase';

const Charts = ({ navigation }: any) => {


    //Getting user's context
    const { state, dispatch } = useContext(Context);

    const [ movementsInMoneyJars, setMovementsInMoneyJars ] = useState<any>([{"amount": 0, "name": "Disponível"}]);
    const [ movementsMOneyJarChart, setMovementsMOneyJarChart ] = useState<any>([{ x: 1, y: 0, y0: 10 },]);
    const [ positiveMoneyJars, setPositivesMoneyJar ] = useState(0);
    const [ negativeMoneyJars, setnegativesMoneyJar ] = useState(0);

    useEffect(() => {
        getTransactions();
    }, []);

    interface Contagem {
        [animal: string]: number;
    }

    const group = (array: any) => {
        const agrupamento = array.reduce((agrupamento: Contagem, animal: string) => {
            if (animal in agrupamento) {
              agrupamento[animal]++;
            } else {
              agrupamento[animal] = 1;
            }
            return agrupamento;
          }, {});
          
          const resultado = Object.entries(agrupamento).map(([name, amount]) => ({
            name,
            amount,
          }));
          
          return resultado;
    }

    const getTransactions = async () => {
        
        /*Get all user transactions*/
        let transactions: any = [];
        
        let first = await query(collection(db, "transaction"),
            where("user_id", "==", state.user.id)
        );

        await getDocs(first).then((querySnapshot) => {
            const transactionsData:any = [];
            querySnapshot.forEach((doc) => {
                transactionsData.push(doc.data());
            });
            
            transactions = transactionsData;
        });
        /*****/


        /*Get the number of positive and negative transactions*/
        let positiveMoneyJarsAux = 0;
        let negativeMoneyJarsAux = 0;
        for(let i = 0; i < transactions.length; i++){
            if(transactions[i].value >= 0){
                positiveMoneyJarsAux += transactions[i].value;
            }else{
                negativeMoneyJarsAux += Math.abs(transactions[i].value);
            }
        }
        setPositivesMoneyJar(positiveMoneyJarsAux);
        setnegativesMoneyJar(negativeMoneyJarsAux);
        /*****/

        /*Group MoneyJars*/
        let moneyJarsFound = [];
        for(let i = 0; i < transactions.length; i++){
            moneyJarsFound.push(transactions[i].where);
        }
        
        let moneyJarsGrouped = await group(moneyJarsFound);

        setMovementsInMoneyJars(moneyJarsGrouped);
        /*****/


        /*Put moneyJars values into the chart data*/
        let aux = [];
        for(let i = 0; i < moneyJarsGrouped.length; i++){
            aux.push({ x: i+1, y: 0, y0: moneyJarsGrouped[i].amount });
        }

        setMovementsMOneyJarChart(aux);
        /*****/

    }

    return (
        <ScrollView style={{ backgroundColor: 'white'}}>

            <Header nav={navigation} showMoney={false} />

            <View style={styles.chartsBox}>

                    <View style={styles.chartSingle}>
                        <Text style={styles.chartTitle}>Valor Reservado X Valor Disponível</Text>
                        <VictoryPie
                            data={[
                                { x: "Disponível", y: state.user.available_balance },
                                { x: "Reservado", y: state.user.moneyJar_balance },
                            ]}
                            colorScale={["#FF5722", "#3C2CE2"]}
                            height={250}
                        />
                        <Text style={styles.chartNote}><Text style={styles.bold}>Nota:</Text> Confira a relação entre o seu dinheiro disponível e o valor reservado para fins específicos.</Text>
                    </View>
                    
                    <View style={styles.chartSingle}>
                        <Text style={styles.chartTitle}>Movimentação das Caixinhas</Text>

                        {movementsInMoneyJars &&
                            <View style={styles.moneyjarsBox}>
                                {movementsInMoneyJars.map((item: any, index: number) => (
                                    <Text key={index}><Text style={styles.bold}>{index+1}:</Text> {item.name}</Text>
                                ))}
                            </View>
                        }

                        <VictoryChart
                            theme={VictoryTheme.material}
                            domainPadding={{ x: 15 }}
                        >
                            <VictoryBar
                                style={{ data: { fill: "#3C2CE2" }, labels: { fill: "white" } }}
                                data={movementsMOneyJarChart}
                                labels={({ datum }) => datum.x}
                                animate
                            />
                        </VictoryChart>
                        <Text style={styles.chartNote}><Text style={styles.bold}>Nota:</Text> Acompanhe como anda as movimentações em cada uma das suas caixinhas.</Text>
                    </View>

                    <Text style={styles.chartTitle}>Entrada e Saida</Text>
                    <VictoryPie
                        data={[
                            { x: "Saida", y: negativeMoneyJars },
                            { x: "Entrada", y: positiveMoneyJars },
                        ]}
                        colorScale={["#D50000", "#00C853"]}
                        height={300}
                    />
                    <Text style={styles.chartNote}><Text style={styles.bold}>Nota:</Text> Confira como estão as relações entre as suas transações de entrada e saída.</Text>
            </View>

            <Footer/>

        </ScrollView>
    );
}

export default Charts;