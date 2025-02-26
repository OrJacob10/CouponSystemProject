import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../AuthArea/Login/Login";
import Companies from "../Companies/Companies";
import Company from "../Companies/Company/Company";
import Home from "../LayoutArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Customers from "../Customers/Customers";
import Customer from "../Customers/Customer/Customer";
import Coupons from "../Coupons/Coupons";
import Coupon from "../Coupons/Coupon/CouponForm";
import CustomerCoupons from "../Coupons/CustomerCoupons/CustomerCoupons";
import ProtectedRoutes from "./ProtectedRoutes";
import CouponDetails from "../Coupons/CouponDetails/CouponDetails";
import CustomerDetails from "../Customers/CustomerDetails/CustomerDetails";
import CompanyDetails from "../Companies/CompanyDetails/CompanyDetails";
import { authStore } from "../../Redux/AuthState";

function Routing(): JSX.Element{
    return(
        <div className="Routing">
            <Routes>
                {/*Login*/}
                <Route path="/login" element = {<Login />}/>
                {/*Home*/}
                <Route path="/home" element = {<Home />}/>
                
                <Route element = {<ProtectedRoutes />}>
                    {/*Companies*/}
                    {(<Route path="/companies" element = {<Companies/>}/>)}
                    {/*Company*/}
                    <Route path="/companies/company/:companyId?" element = {<Company/>}/>
                    {/*Company Details*/}
                    <Route path = "/company-details/:companyId" element={<CompanyDetails />}/>
                    {/*Customers*/}
                    <Route path="/customers" element = {<Customers/>}/>
                    {/*Customer*/}
                    <Route path="/customers/customer/:customerId?" element = {<Customer/>}/>
                    {/*Customer Details*/}
                    <Route path = "/customer-details/:customerId" element={<CustomerDetails />}/>
                    {/*Coupons*/}
                    <Route path="/coupons" element = {<Coupons />}/>
                    {/*Coupon*/}
                    <Route path="/coupons/coupon/:couponId?" element = {<Coupon/>}/>
                    {/*CustomerCoupons*/}
                    <Route path="/customer/coupons" element = {<CustomerCoupons/>}/>
                    {/*Coupon Details*/}
                    <Route path = "/coupon-details/:couponId/:customerId?" element={<CouponDetails />}/>
                </Route>
                
                {/*PageNotFound*/}
                <Route path="*" element = {<PageNotFound/>}/>

                <Route path="/" element={<Navigate to="/home" />} />

            </Routes>
        </div>
    )
}
export default Routing;