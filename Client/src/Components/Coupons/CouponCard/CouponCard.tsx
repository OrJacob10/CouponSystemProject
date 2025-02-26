import { NavLink } from 'react-router-dom';
import './CouponCard.css'
import CouponModel from '../../../Models/CouponModel';
import couponImage from '../../../Images/couponImage.png';

function CouponCard(couponProps: CouponModel): JSX.Element{

    return(
        <div className='CouponCard'>
            <NavLink to={"/coupon-details/" + couponProps.id}>
                <div className="card">
                    <div className="card-img"><img src={couponImage}/></div>
                        <div className="card-info">
                            <p className="text-title">{couponProps.title.substring(0,21)}</p>
                            <p className="text-body">{couponProps.description.substring(0, 22)}</p>
                        </div>
                        <div className="card-footer">
                            <span className="text-footer">${couponProps.price}</span>
                           <span className='text-footer'>{couponProps.endDate.toString()}</span>
                        </div>
                </div>
            </NavLink>
        </div>
    );
}
export default CouponCard;