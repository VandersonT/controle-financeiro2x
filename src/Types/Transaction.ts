import { Double } from "react-native/Libraries/Types/CodegenTypes";

export type Transaction = {
    id: string,
    title: string,
    value: Double,
    description: string,
    date: string, //Facilitar pra não ter que ficar salvando em formato mm/dd/yy e depois trocando.
    where: string
}