import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../../components/Header';
import { VictoryPie, VictoryChart, VictoryTheme, VictoryBar } from "victory-native";
import { Theme } from '../../global/theme';
import Footer from '../../components/Footer';

const Charts = ({ navigation }: any) => {

    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
    ];

    return (
        <ScrollView style={{ backgroundColor: 'white'}}>

            <Header nav={navigation} showMoney={false} />

            <View style={styles.chartsBox}>

                    <View style={styles.chartSingle}>
                        <Text style={styles.chartTitle}>Valor Reservado X Valor Disponível</Text>
                        <VictoryPie
                            data={[
                                { x: "Disponível", y: 35000 },
                                { x: "Reservado", y: 100000 },
                            ]}
                            colorScale={["#FF5722", "#3C2CE2"]}
                            height={250}
                        />
                        <Text style={styles.chartNote}><Text style={styles.bold}>Nota:</Text> Confira a relação entre o seu dinheiro disponível e o valor reservado para fins específicos.</Text>
                    </View>
                    
                    <View style={styles.chartSingle}>
                        <Text style={styles.chartTitle}>Movimentação das Caixinhas</Text>

                        <View style={styles.moneyjarsBox}>
                            <Text style={styles.moneyjarsBox_title}><Text style={styles.bold}>1:</Text> Disponível</Text>
                            <Text style={styles.moneyjarsBox_title}><Text style={styles.bold}>2:</Text> Emergência</Text>
                            <Text style={styles.moneyjarsBox_title}><Text style={styles.bold}>3:</Text> Viagens</Text>
                            <Text style={styles.moneyjarsBox_title}><Text style={styles.bold}>4:</Text> Obra</Text>
                            <Text style={styles.moneyjarsBox_title}><Text style={styles.bold}>5:</Text> Investimentos</Text>
                        </View>

                        <VictoryChart
                            theme={VictoryTheme.material}
                            domainPadding={{ x: 15 }}
                        >
                            <VictoryBar
                                style={{ data: { fill: "#3C2CE2" }, labels: { fill: "white" } }}
                                data={[
                                    { x: 1, y: 0, y0: 10 },
                                    { x: 2, y: 0, y0: 20 },
                                    { x: 3, y: 0, y0: 20 },
                                    { x: 4, y: 0, y0: 30 },
                                    { x: 5, y: 0, y0: 30 }
                                ]}
                                labels={({ datum }) => datum.x}
                                animate
                            />
                        </VictoryChart>
                        <Text style={styles.chartNote}><Text style={styles.bold}>Nota:</Text> Acompanhe como anda as movimentações em cada uma das suas caixinhas.</Text>
                    </View>

                    <Text style={styles.chartTitle}>Seu Controle Financeiro</Text>
                    <VictoryPie
                        data={[
                            { x: "Ruim", y: 1 },
                            { x: "Bom", y: 5 },
                        ]}
                        colorScale={["#D50000", "#00C853"]}
                        height={300}
                    />
                    <Text style={styles.chartNote}><Text style={styles.bold}>Julgamento:</Text> Seu controle financeiro está exelente, você possui o controle sobre suas finanças e não está devendo nada.</Text>
            </View>

            <Footer/>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    chartSingle: {
        width: '95%',
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.gray[400],
        marginBottom: 40,
        display: 'flex',
        alignItems: 'center'
    },
    chartsBox: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 50,
        paddingBottom: 70
    },
    chartTitle: {
        fontSize: Theme.fontSizes.xl,
        color: Theme.colors.gray[600],
        padding: 20,
        textAlign: 'center',
    },
    moneyjarsBox: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    moneyjarsBox_title: {
        color: Theme.colors.gray[600],
    },
    chartNote: {
        padding: 20,
        color: Theme.colors.gray[600],
        fontSize: Theme.fontSizes.md,
    },
    bold: {
        fontWeight: 'bold',
        color: Theme.colors.gray[600],
    }
});

export default Charts;