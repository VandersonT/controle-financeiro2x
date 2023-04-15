import { reducerActionType } from "../Types/reducerActionType"

export type UserType = {
    id: string,
    name: string,
    email: string,
    avatar: string,
    created_at: number
}

export const userInitialState: UserType = {
    id: '',
    name: '',
    email: '',
    avatar: '',
    created_at: 0
}

export const userReducer = (state: UserType, action: reducerActionType) => {

    switch(action.type){
        case 'CHANGE_ID':
            return {...state, id: action.payload.id};
            break;
        case 'CHANGE_NAME':
            return {...state, name: action.payload.name};
            break;
        case 'CHANGE_EMAIL':
            return {...state, email: action.payload.email};
            break;
        case 'CHANGE_AVATAR':
            return {...state, avatar: action.payload.avatar};
            break;
        case 'CHANGE_CREATEDAT':
            return {...state, created_at: action.payload.created_at};
            break;
    }

    return state;
}

