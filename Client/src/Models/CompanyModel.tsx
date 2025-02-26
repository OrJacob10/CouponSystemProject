import CouponModel from "./CouponModel";

interface CompanyModel{
    id: number;
    name: string;
    email: string;
    password: string;
    coupons: CouponModel[];
}

export default CompanyModel;