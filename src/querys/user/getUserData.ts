/*--------------------------------------------------------------------------*/
/*                                IMPORTS                                   */
/*--------------------------------------------------------------------------*/
import { doc, getDoc } from "firebase/firestore";
import db from "../../config/firebase";
/*--------------------------------------------------------------------------*/



const getUserData = async (user_id: string) => {
    
    const docRef = doc(db, "user", user_id);

    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
        return docSnap.data(); // We have the user's data here => docSnap.data()
    }

    return false; //We couldn't find this user
}



export default getUserData;