import axios from "axios";
import appConfig from "../Configuration/config";
import CompanyModel from "../Models/CompanyModel";
import { authStore } from "../Redux/AuthState";
import { CompanyActionType, companyStore } from "../Redux/CompanyState";
import tokenService from "./TokenService";

class CompanyService {

    async addCompany(company: CompanyModel): Promise<CompanyModel>  {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null
        const response = await axios.post<CompanyModel>(appConfig.apiAddress + "admin/company", company,
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        companyStore.dispatch({type: CompanyActionType.AddCompany, payload: response.data});
        return response.data
    }

    async deleteCompany(id: number): Promise<void>  {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null
        const response = await axios.delete<void>(appConfig.apiAddress + "admin/company/"+ id,
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        companyStore.dispatch({type: CompanyActionType.DeleteCompany, payload: id});
        return response.data;
    }

    async updateCompany(id: number, company: CompanyModel): Promise<void>  {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null
        const response = await axios.put<void>(appConfig.apiAddress + "admin/company/"+ id, company,
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        companyStore.dispatch({type: CompanyActionType.UpdateCompany, payload: company});
        return response.data;
    }

    async getCompanies(): Promise<CompanyModel[]> {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null
        if(companyStore.getState().companyList.length === 0){
            const response = await axios.get<CompanyModel[]>(appConfig.apiAddress + "admin/company",
            {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
            companyStore.dispatch({type: CompanyActionType.FetchCompanies, payload: response.data});
            return response.data;
        }
        return companyStore.getState().companyList;
    }

    async getSingleCompany(id: number): Promise<CompanyModel> {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null
        if(companyStore.getState().companyList.length === 0){
            const response = await axios.get<CompanyModel>(appConfig.apiAddress + "admin/company/" + id,
            {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
            return response.data;
        }
        
        const index = companyStore.getState().companyList.findIndex(company => company.id === id);
        return companyStore.getState().companyList[index];
    }

}

const companyService: CompanyService = new CompanyService();
export default companyService;