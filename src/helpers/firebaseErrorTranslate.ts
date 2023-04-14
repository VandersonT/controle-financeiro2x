const firebaseErrorTranslate = (errorCode: string) => {

    if(errorCode == "auth/weak-password")
        return "A senha é muito fraca.";
    else if(errorCode == "auth/invalid-email")
        return "Este email não é válido.";
    else if(errorCode == "auth/operation-not-allowed")
        return "Desculpe! Registros desativados no momento.";
    else if(errorCode == "auth/email-already-in-use")
        return "Este email já pertence a outra conta.";
    else if(errorCode == "auth/user-disabled")
        return "O usuário está atualmente desativado.";
    else if(errorCode == "auth/user-not-found")
        return "O usuário não foi encontrado.";
    else if(errorCode == "auth/wrong-password")
        return "Senha e/ou email incorreto(s).";
    else if(errorCode == "auth/too-many-requests")
        return "Errou muitas vezes, espere um tempo agora."
    else
        return "Desculpe, mas ocorreu um erro.";
}

export default firebaseErrorTranslate;