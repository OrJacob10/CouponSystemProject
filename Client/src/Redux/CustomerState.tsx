import { createStore } from "redux";
import CustomerModel from "../Models/CustomerModel";

//1
export class CustomerState{
    customerList: CustomerModel[] = [];
}

//2
export enum CustomerActionType{

    FetchCustomers,
    AddCustomer,
    UpdateCustomer,
    DeleteCustomer,
}

//3
export interface CustomerAction{
    type: CustomerActionType;
    payload: any;
}

//4
export function getFetchAction(customerList: CustomerModel[]): CustomerAction{
    return {type: CustomerActionType.FetchCustomers, payload: customerList};
}

//5
export function customerReducer(currentState: CustomerState = new CustomerState, action: CustomerAction):CustomerState{
    const newState = {...currentState};
    
    switch(action.type){
        case CustomerActionType.FetchCustomers:
            newState.customerList = action.payload;
            break;

        case CustomerActionType.AddCustomer:
            newState.customerList.push(action.payload);
            break;

        case CustomerActionType.UpdateCustomer:
            // loop throgh to array when the id are equal return the index of the id
            const indexToUpdate = newState.customerList.findIndex(customer => customer.id === action.payload.id);
            newState.customerList[indexToUpdate] = action.payload;
            break;

        case CustomerActionType.DeleteCustomer:
            const indexToDelete = newState.customerList.findIndex(customer => customer.id === action.payload);
            newState.customerList.splice(indexToDelete, 1);
            break;
    }

    return newState;
}

//6
export const customerStore = createStore(customerReducer);

