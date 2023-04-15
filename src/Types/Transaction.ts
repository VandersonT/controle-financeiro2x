import { Double } from "react-native/Libraries/Types/CodegenTypes";

export type Transaction = {
    id: string,
    title: string,
    value: Double,
    description: string,
    date: string,
    where: string,
    user_id: string,
    created_at: string
}