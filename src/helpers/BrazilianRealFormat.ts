export default function BrazilianRealFormat(valor: any) {
    // Converte o valor para número e verifica se é negativo
    const negativo = Number(valor) < 0;
    
    // Formata o valor em reais com 2 casas decimais
    const valorFormatado = valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    
    return valorFormatado;
}