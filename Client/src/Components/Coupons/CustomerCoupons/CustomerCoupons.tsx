import { useEffect, useState } from 'react';
import './CustomerCoupons.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { authStore } from '../../../Redux/AuthState';
import CouponModel from '../../../Models/CouponModel';
import customerCouponService from '../../../Services/CustomerCouponService';
import CouponCard from '../CouponCard/CouponCard';
import { categoryStore } from '../../../Redux/CategoryState';
import { couponStore } from '../../../Redux/CouponState';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ReactPaginate from 'react-paginate';
import categoryService from '../../../Services/CategoryService';
import ErrorHandler from '../../HandleError/ErrorHandler';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

function CusotmerCoupons(): JSX.Element {

    const [couponsToShow, setCouponsToShow] = useState<CouponModel[]>([]);
    const [selectValue, setSelectValue] = useState<string>("Show All Coupons");
    const [page, setPage] = useState<number>(0); // current page
    const couponPerPage = 14; // coupons per page
    const numberOfRecordsVisited = page * couponPerPage;
    const totalPages = Math.ceil(couponsToShow.length / couponPerPage);
    const [loading, setLoading] = useState<boolean>(true);

    const changePage = ({ selected }: any) => {
        setPage(selected);
    };

    useEffect(() => {

        categoryService.getAllCategories().then((categoriesResponse) => {
        }).catch(error => {
            ErrorHandler.handleErrorResponse(error);
        });

        customerCouponService.getCouponsByCustomer(authStore.getState().user?.id!).then((response) => {
            setCouponsToShow(response);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }).catch(error => {
            setLoading(false);
            ErrorHandler.handleErrorResponse(error);
        });
    }, []);

    useEffect(() => {
        switch (selectValue) {
            case "Show Coupons By Max Price":
                handleOnChange("0") // price is 0
                break;
            case "Show Coupons By Category":
                handleOnChange("1"); // show the first category
                break;
            default:
                setCouponsToShow(couponStore.getState().couponList); // show all coupons by default
        }
    }, [selectValue]);

    const handleOnChange = (value: string) => {
        switch (selectValue) {
            case "Show Coupons By Max Price":
                setCouponsToShow(couponStore.getState().couponList.filter(coupon => coupon.price <= parseInt(value)));
                break;
            case "Show Coupons By Category":
                setCouponsToShow(couponStore.getState().couponList.filter(coupon => coupon.category?.id === parseInt(value)));
                break;
        }
    }

    return (
        <div className="CustomerCoupon">
            <h1>{authStore.getState().user?.firstName}'s Coupons</h1>

            {loading ? (<LoadingSpinner />) :
                <>
                    <div className='select_row'>
                        <select onClick={(e) => handleOnChange} onChange={(e) => setSelectValue(e.target.value)}>
                            <option value="Show All Coupons">Show All Coupons</option>
                            <option value="Show Coupons By Category">Show Coupons By Category</option>
                            <option value="Show Coupons By Max Price">Show Coupons By Max Price</option>
                        </select>
                        {selectValue === "Show Coupons By Category" && (
                            <select onChange={(e) => handleOnChange(e.target.value)}>
                                {categoryStore.getState().categoryList.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                            </select>
                        )}
                        {selectValue === "Show Coupons By Max Price" && (<input defaultValue={0} onChange={(e) => handleOnChange(e.target.value)} type='number' placeholder='Max Price' />)}
                    </div>

                    <div className='row'>
                        {couponsToShow.slice(numberOfRecordsVisited, numberOfRecordsVisited + couponPerPage).map(coupon =>
                            <CouponCard key={coupon.id} {...coupon} />
                        )}
                    </div>

                    <div className='pagination-container'>
                        <ReactPaginate
                            previousLabel={<ArrowBackIosIcon style={{ fontSize: 18, width: 150 }} />}
                            nextLabel={<ArrowForwardIosIcon style={{ fontSize: 18, width: 150 }} />}
                            pageCount={totalPages}
                            onPageChange={changePage}
                            containerClassName={"pagination"}
                            previousLinkClassName={"item previous"}
                            nextLinkClassName={"item next"}
                            disabledClassName={"disabled-page"}
                            activeClassName={"item active"}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={2}
                        />
                    </div>
                </>
            }
        </div>
    );
}

export default CusotmerCoupons