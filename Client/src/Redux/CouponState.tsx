import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";

//1
export class CouponState{
    couponList: CouponModel[] = [];
}

//2
export enum CouponActionType{

    FetchCoupons,
    AddCoupon,
    UpdateCoupon,
    DeleteCoupon,
}

//3
export interface CouponAction{
    type: CouponActionType;
    payload: any;
}

//4
export function getFetchAction(couponList: CouponModel[]): CouponAction{
    return {type: CouponActionType.FetchCoupons, payload: couponList};
}

//5
export function couponReducer(currentState: CouponState = new CouponState, action: CouponAction): CouponState{
    const newState = {...currentState};
    
    switch(action.type){
        case CouponActionType.FetchCoupons:
            newState.couponList = action.payload;
            break;

        case CouponActionType.AddCoupon:
            newState.couponList.push(action.payload);
            break;

        case CouponActionType.UpdateCoupon:
            // loop throgh to array when the id are equal return the index of the id
            const indexToUpdate = newState.couponList.findIndex(coupon => coupon.id === action.payload.id);
            newState.couponList[indexToUpdate] = action.payload;
            break;

        case CouponActionType.DeleteCoupon:
            const indexToDelete = newState.couponList.findIndex(coupon => coupon.id === action.payload);
            newState.couponList.splice(indexToDelete, 1);
            break;
    }

    return newState;
}

//6
export const couponStore = createStore(couponReducer);

