const DateFormat = (text: string) => {
    // Remove qualquer caractere que não seja número
    const numericText = text.replace(/\D/g, '');

    // Insere barras automaticamente após o segundo e quarto caracteres
    const formattedText = `${numericText.slice(0, 2)}/${numericText.slice(2, 4)}/${numericText.slice(4, 8)}`;

    return formattedText;
};

export default DateFormat;