import { createStore } from "redux";
import CompanyModel from "../Models/CompanyModel";

//1
export class CompanyState{
    companyList: CompanyModel[] = [];
}

//2
export enum CompanyActionType{

    FetchCompanies,
    AddCompany,
    UpdateCompany,
    DeleteCompany,
}

//3
export interface CompanyAction{
    type: CompanyActionType;
    payload: any;
}

//4
export function getFetchAction(companyList: CompanyModel[]): CompanyAction{
    return {type: CompanyActionType.FetchCompanies, payload: companyList};
}

//5
export function companyReducer(currentState: CompanyState = new CompanyState, action: CompanyAction): CompanyState{
    const newState = {...currentState};
    
    switch(action.type){
        case CompanyActionType.FetchCompanies:
            newState.companyList = action.payload;
            break;

        case CompanyActionType.AddCompany:
            newState.companyList.push(action.payload);
            break;

        case CompanyActionType.UpdateCompany:
            // loop throgh to array when the id are equal return the index of the id
            const indexToUpdate = newState.companyList.findIndex(company => company.id === action.payload.id);
            newState.companyList[indexToUpdate] = action.payload;
            break;

        case CompanyActionType.DeleteCompany:
            const indexToDelete = newState.companyList.findIndex(company => company.id === action.payload);
            newState.companyList.splice(indexToDelete, 1);
            break;
    }

    return newState;
}

//6
export const companyStore = createStore(companyReducer);

