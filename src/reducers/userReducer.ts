import { reducerActionType } from "../Types/reducerActionType"

export type UserType = {
    id: string,
    name: string,
    email: string,
    photo: string,
    created_at: Date | null
}

export const userInitialState: UserType = {
    id: 'ewew',
    name: 'Vanderson',
    email: 'vandersontpaulo@gmail.com',
    photo: 'noPhoto.png',
    created_at: null
}

export const userReducer = (state: UserType, action: reducerActionType) => {

    switch(action.type){
        case 'CHANGE_ID':
            return {...state, id: action.payload.id};
            break;
        case 'CHANGE_NAME':
            return {...state, name: action.payload.name};
            break;
    }

    return state;
}

