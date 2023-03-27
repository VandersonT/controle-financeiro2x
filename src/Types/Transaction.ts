import { Double } from "react-native/Libraries/Types/CodegenTypes";

export type Transaction = {
    title: String,
    value: Double,
    description: String,
    date: String, //Facilitar pra não ter que ficar salvando em formato mm/dd/yy e depois trocando.
    where: String
}