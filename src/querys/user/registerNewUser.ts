/*--------------------------------------------------------------------------*/
/*                                IMPORTS                                   */
/*--------------------------------------------------------------------------*/
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import db from "../../config/firebase";
import { v4 as uuidv4 } from 'uuid';
import firebaseErrorTranslate from "../../helpers/firebaseErrorTranslate";
/*--------------------------------------------------------------------------*/




const registerNewUser = async (emailRegister: string, passRegister: string, userRegister: string) => {

    //Variables
    let errorMsg = "";
    let loggedUser = {};



    const auth = getAuth();
    
    await createUserWithEmailAndPassword(auth, emailRegister, passRegister)
        .then(async (userCredential) => {
            

            //Get user ID
            const userId = userCredential.user.uid;
            

            //Saving necessary user data to Firestore
            const userRef = await collection(db, "user");


            let userData = {
                id: userId,
                username: userRegister,
                email: emailRegister,
                avatar: "https://www.promoview.com.br/uploads/images/unnamed%2819%29.png",
                created_at: Math.floor(Date.now() / 1000),
                available_balance: 0,
                moneyJar_balance: 0,
                totalMoneyJars: 1
            }


            await setDoc(doc(userRef, userId), userData);
            
            

            /*----------Create-First-User-Cash-Box-----------*/
            const cashBoxRef = collection(db, "moneyJar");

            let randomId = uuidv4();
            await setDoc(doc(cashBoxRef, randomId), {
                id: randomId,
                user_id: userId,
                title: 'Disponível',
                money: 0,
                value: 0,
                image: 'https://contextoatual.com.br/wp-content/uploads/2020/10/Foto-Mulher-com-leque-de-dinheiro-e-celular-nas-m%C3%A3os.jpg',
                created_at: Math.floor(Date.now() / 1000)
            });
            /*-----------------------------------------------*/

            loggedUser = userData;

        })
        .catch((error) => {

            const errorCode = error.code;
            errorMsg = firebaseErrorTranslate(errorCode) as string;

        });

        
    return { errorMsg, loggedUser };
}



export default registerNewUser;