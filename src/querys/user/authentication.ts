/*--------------------------------------------------------------------------*/
/*                                IMPORTS                                   */
/*--------------------------------------------------------------------------*/
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseErrorTranslate from "../../helpers/firebaseErrorTranslate";
/*--------------------------------------------------------------------------*/



const authentication = async (email: string, pass: string) => {

    let errorMsg;
    let loggedUserId;


    const auth = getAuth();

    //Note: If the login is successful, the user will be automatically redirected to the home page.
    await signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            loggedUserId = userCredential.user.uid;
        })
        .catch((error) => {
            const errorCode = error.code;
            errorMsg = firebaseErrorTranslate(errorCode) as string;
        });

    return { errorMsg, loggedUserId};
}



export default authentication;