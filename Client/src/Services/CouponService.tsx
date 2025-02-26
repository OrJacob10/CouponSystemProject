import axios from "axios";
import appConfig from "../Configuration/config";
import { authStore } from "../Redux/AuthState";
import CouponModel from "../Models/CouponModel";
import { CouponActionType, couponStore } from "../Redux/CouponState";
import tokenService from "./TokenService";

class CouponService {

    async addCoupon(coupon: CouponModel): Promise<CouponModel>  {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null

        const response = await axios.post<CouponModel>(appConfig.apiAddress + "company/coupon/" + authStore.getState().user?.id, coupon,
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        couponStore.dispatch({type:CouponActionType.AddCoupon, payload:response.data});
        return response.data
        
    }

    async deleteCoupon(id: number): Promise<void>  {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null

        const response = await axios.delete<void>(appConfig.apiAddress + "company/coupon/" + id,
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        couponStore.dispatch({type:CouponActionType.DeleteCoupon, payload: id});
        return response.data
    }

    async updateCoupon(id: number, coupon: CouponModel): Promise<void>  {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null

        const response = await axios.put<void>(appConfig.apiAddress + "company/coupon/" + id, coupon,
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        couponStore.dispatch({type:CouponActionType.UpdateCoupon, payload: coupon});
        return response.data;
    }

    async getCoupons(): Promise<CouponModel[]> {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null

        const response = await axios.get<CouponModel[]>(appConfig.apiAddress + "company/coupon",
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        couponStore.dispatch({type:CouponActionType.FetchCoupons, payload:response.data});
        return response.data;
    }

    async getCouponsByCategory(categoryId: number): Promise<CouponModel[]> {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null

        const response = await axios.get<CouponModel[]>(appConfig.apiAddress + "company/coupon/byCompanyAndCategory/" +authStore.getState().user?.id+"/"+categoryId,
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        couponStore.dispatch({type:CouponActionType.FetchCoupons, payload:response.data});
        return response.data;
    }

    async getSingleCoupon(id: number): Promise<CouponModel> {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null

        const response = await axios.get<CouponModel>(appConfig.apiAddress + "company/coupon/" + id,
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        return response.data;
    }

    async getCouponsByCompany(companyId: number): Promise<CouponModel[]> {
        tokenService.TokenExpiredHandler(authStore.getState()?.token!); // in order to prevent an error, logout if the token expired or null

        const response = await axios.get<CouponModel[]>(appConfig.apiAddress + "company/coupon/byCompany/" + companyId,
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        couponStore.dispatch({type:CouponActionType.FetchCoupons, payload:response.data});
        return response.data;
    }
}

const couponService: CouponService = new CouponService();
export default couponService;