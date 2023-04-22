import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import db from "../../config/firebase";
import { useContext } from "react";
import { Context } from "../../context/Context";



const getTransaction = async (transactionsPerPage: number, userId: string, lastVisible?: any) => {


    let transactions: any = [];
    let currentLastVisible;

    // Query the first page of docs
    let  first;
    if(lastVisible){
        first = await query(collection(db, "transaction"),
            where("user_id", "==", userId),
            orderBy("created_at", "desc"),
            limit(transactionsPerPage),
            startAfter(lastVisible),
        );
    }else{
        first = await query(collection(db, "transaction"),
            where("user_id", "==", userId),
            orderBy("created_at", "desc"),
            limit(transactionsPerPage),
        );
    }
        

    await getDocs(first).then((querySnapshot) => {
        const citiesData:any = [];
        querySnapshot.forEach((doc) => {
            citiesData.push(doc.data());
        });
        
        transactions = citiesData;
        currentLastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
    });

    if(transactions.length === 0)
        return { transactions, currentLastVisible };
    

    return { transactions, currentLastVisible }
}

export default getTransaction;