import axios from "axios";
import appConfig from "../Configuration/config";
import { authStore } from "../Redux/AuthState";
import CategoryModel from "../Models/CategoryModel";
import { CategoryActionType, categoryStore } from "../Redux/CategoryState";
import tokenService from "./TokenService";

class CategoryService {

    async getSingleCategory(cateogryId: number): Promise<CategoryModel> {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null
        const response = await axios.get<CategoryModel>(appConfig.apiAddress + "category/" +cateogryId,
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        return response.data;
    }

    async getAllCategories(): Promise<CategoryModel[]> {
        // in order to prevent an error, logout if the token expired or null
        if(tokenService.isTokenExpired()){
            return [];
        }
        const response = await axios.get<CategoryModel[]>(appConfig.apiAddress + "category",
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        categoryStore.dispatch({type: CategoryActionType.FetchCategories, payload: response.data});
        return response.data;
    }
}

const categoryService: CategoryService = new CategoryService();
export default categoryService;