import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './CouponDetails.css'
import CouponModel from '../../../Models/CouponModel';
import { useEffect, useState } from 'react';
import couponService from '../../../Services/CouponService';
import { authStore } from '../../../Redux/AuthState';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import customerCouponService from '../../../Services/CustomerCouponService';
import ErrorHandler from '../../HandleError/ErrorHandler';


function CouponDetails(): JSX.Element {

    const params = useParams();
    const navigator = useNavigate();
    const couponId = +params.couponId!;
    const [coupon, setCoupon] = useState<CouponModel>();

    useEffect(() => {
        
        couponService.getSingleCoupon(couponId).then((response) => {
            setCoupon(response);
        }).catch(error => {
            ErrorHandler.handleErrorResponse(error);
        });
    }, []);

    function deleteCoupon() {
        const isDelete = window.confirm("Would you like to delete this coupon?");
        if (isDelete) {
            couponService.deleteCoupon(couponId).then((response) => {
                navigator('/coupons')
            }).catch(error => {
                ErrorHandler.handleErrorResponse(error);
            });
        }
    }
    function buyCoupon() {
        const isBuy = window.confirm("To buy this coupon press OK");
        if (isBuy) {
            customerCouponService.purchaseCoupon(authStore.getState().user!.id, couponId).then(response => {
                alert("The Coupon Has Been Purchased Successfully");
                navigator('/customer/coupons')
            }).catch(error => {
                ErrorHandler.handleErrorResponse(error);
            });
        }
    }

    return (
        <div className="coupon-details">
            {coupon &&
                <>
                    <h1>{coupon?.title}</h1>
                    <div className='details'>
                        <h3>Description: {coupon?.description}</h3>
                        <h3>Category: {coupon.category?.name}</h3>
                        <h3>Price: {coupon?.price}</h3>
                        <h3>Amount Left: {coupon?.amount}</h3>
                        <h3>Start Date: {coupon?.startDate.toString()}</h3>
                        <h3>End Date: {coupon?.endDate.toString()}</h3>

                        <div className='action_row'>
                            {authStore.getState().user?.clientType === 'COMPANY' && (<NavLink to={'/coupons/coupon/' + coupon.id}>Edit Coupon</NavLink>)}
                            {authStore.getState().user?.clientType === 'COMPANY' && (<button onClick={deleteCoupon}>Delete Coupon</button>)}
                            {authStore.getState().user?.clientType === 'CUSTOMER' && (<div>To Buy Press:<IconButton onClick={buyCoupon} className="buyIcon" aria-label="add to shopping cart"><AddShoppingCartIcon /></IconButton></div>)}
                        </div>
                    </div>
                </>
            }
        </div>
    );
}
export default CouponDetails;
