const errorTranslate = (errorCode: string) => {

    if(errorCode == "auth/weak-password")
        return "A senha é muito fraca.";
    
    if(errorCode == "auth/invalid-email")
        return "Este email não é válido.";
        
    if(errorCode == "auth/operation-not-allowed")
        return "Desculpe! Registros desativados no momento.";

    if(errorCode == "auth/email-already-in-use")
        return "Este email já pertence a outra conta.";

}

export default errorTranslate;