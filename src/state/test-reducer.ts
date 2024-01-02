import { TasksStateType } from "../App";

type Action1Type = {
    type: '1',
    id: string
}

type Action2Type = {
    type: '2',
    id: string
}

type ActionsType = Action1Type | Action2Type;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case '1': {
            return {...state};
        }
        case '2': {
            return {...state};
        } 
        default:
            throw new Error("I don't understand this action type");
    }
}

export const action1AC = (todolistId: string): Action1Type => {
    return {type: '1', id: todolistId};
}

export const action2AC = (title: string): Action2Type => {
    return {type: '2', id: title};
}
