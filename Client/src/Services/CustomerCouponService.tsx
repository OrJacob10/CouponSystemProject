import axios from "axios";
import appConfig from "../Configuration/config";
import { authStore } from "../Redux/AuthState";
import CouponModel from "../Models/CouponModel";
import { CouponActionType, couponStore } from "../Redux/CouponState";
import tokenService from "./TokenService";
import authService from "./AuthService";

class CustomerCouponService {

    async purchaseCoupon(customerId:number, couponId: number): Promise<void> {
         // in order to prevent an error, logout if the token expired or null
        if(tokenService.TokenExpiredHandler(authStore.getState()?.token!)){
            authService.logout();
        } 
        const response = await axios.post<void>(appConfig.apiAddress + "company/customer_coupon/"+customerId+"/"+couponId, null,
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        
        return response.data;
    }

    async getCouponsByCustomer(customerId: number): Promise<CouponModel[]> {
        // in order to prevent an error, logout if the token expired or null
        if(tokenService.TokenExpiredHandler(authStore.getState()?.token!)){
            return [];
        }
        else{
        const response = await axios.get<CouponModel[]>(appConfig.apiAddress + "company/customer_coupon/byCustomer/" + customerId,
        {headers: {"Authorization" : "Bearer " + authStore.getState().token}});
        couponStore.dispatch({type:CouponActionType.FetchCoupons, payload:response.data});
        return response.data;
        }
    }
}

const customerCouponService: CustomerCouponService = new CustomerCouponService();
export default customerCouponService;