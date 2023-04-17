import moment from 'moment';

const  dateFormat = (timestamp: number) => {
    const data = moment.unix(timestamp);
    const data_formatada = data.format('DD/MM/YYYY');
    return data_formatada;
}

export default dateFormat;