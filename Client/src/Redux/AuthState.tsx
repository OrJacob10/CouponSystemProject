import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import UserModel from "../Models/UserModel";
import TokenModel from "../Models/TokenModel";

//1
export class AuthState{
    user: UserModel | null = null;
    token: string | null = null;
    exp: number | null = null; // expiration time (unix time)

    constructor(){
        const tokenFromlocalStorage: string|null = localStorage.getItem("token");

        if(tokenFromlocalStorage){
            const userFromToken: UserModel = jwtDecode(tokenFromlocalStorage);
            this.user = userFromToken;
            const tokenModel: TokenModel = jwtDecode(tokenFromlocalStorage);
            this.exp = tokenModel.exp;
            this.token = tokenFromlocalStorage;
            
        }
    }
}

//2
export enum AuthActionType{
    Login,  // fetch user
    Logout,
}

//3
export interface AuthAction{
    type: AuthActionType;
    payload?: any;
}

//4 - instead of doing it in the service

export function loginAction(token: TokenModel): AuthAction{
    return {type: AuthActionType.Login, payload: token};
}

export function logoutAction(): AuthAction{
    return {type: AuthActionType.Logout};
}

//5
export function authReducer(currentState: AuthState = new AuthState, action: AuthAction): AuthState{
    const newState: AuthState = {...currentState};
    
    switch(action.type){
        case AuthActionType.Login:
            newState.token = action.payload.token;
            newState.exp = action.payload.exp;
            const userFromToken: UserModel = jwtDecode(newState.token!);
            newState.user = userFromToken;
            localStorage.setItem("token", newState.token!);
            break;


        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            newState.exp = null;
            localStorage.removeItem("token");
            break;

    }
    return newState;
}

//6
export const authStore = createStore(authReducer);

