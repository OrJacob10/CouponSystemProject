import { createStore } from "redux";
import CategoryModel from "../Models/CategoryModel";

//1
export class CategoryState{
    categoryList: CategoryModel[] = [];
}

//2
export enum CategoryActionType{

    FetchCategories,
    AddCategory,
    UpdateCategory,
    DeleteCategory,
}

//3
export interface CategoryAction{
    type: CategoryActionType;
    payload: any;
}

//4
export function getFetchAction(categoryList: CategoryModel[]): CategoryAction{
    return {type: CategoryActionType.FetchCategories, payload: categoryList};
}

//5
export function categoryReducer(currentState: CategoryState = new CategoryState, action: CategoryAction): CategoryState{
    const newState = {...currentState};
    
    switch(action.type){
        case CategoryActionType.FetchCategories:
            newState.categoryList = action.payload;
            break;

        case CategoryActionType.AddCategory:
            newState.categoryList.push(action.payload);
            break;

        case CategoryActionType.UpdateCategory:
            const indexToUpdate = newState.categoryList.findIndex(category => category.id === action.payload.id);
            newState.categoryList[indexToUpdate] = action.payload;
            break;

        case CategoryActionType.DeleteCategory:
            const indexToDelete = newState.categoryList.findIndex(category => category.id === action.payload);
            newState.categoryList.splice(indexToDelete, 1);
            break;
    }

    return newState;
}

//6
export const categoryStore = createStore(categoryReducer);

