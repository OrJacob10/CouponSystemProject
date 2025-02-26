import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Coupons.css';
import { authStore } from '../../Redux/AuthState';
import CouponModel from '../../Models/CouponModel';
import couponService from '../../Services/CouponService';
import CouponCard from './CouponCard/CouponCard';
import { categoryStore } from '../../Redux/CategoryState';
import { couponStore } from '../../Redux/CouponState';
import ReactPaginate from 'react-paginate';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ErrorHandler from '../HandleError/ErrorHandler';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import categoryService from '../../Services/CategoryService';


function Coupons(): JSX.Element {

    const [selectValue, setSelectValue] = useState<string>("Show All Coupons");
    const [couponsToShow, setCouponsToShow] = useState<CouponModel[]>([]);
    const [page, setPage] = useState<number>(0); // current page
    const couponPerPage = 14; // coupons per page
    const numberOfRecordsVisited = page * couponPerPage;
    const totalPages = Math.ceil(couponsToShow.length / couponPerPage);
    const [loading, setLoading] = useState<boolean>(true);

    const changePage = ({ selected }: any) => {
        setPage(selected);
    };

    useEffect(() => {
        categoryService.getAllCategories().then(response => {

        }).catch(error => {
            ErrorHandler.handleErrorResponse(error);
        });

        // return all coupons of the company if the user is a company
        if (authStore.getState().user?.clientType === 'COMPANY') {
            couponService.getCouponsByCompany(authStore.getState().user?.id!)
                .then((response) => {
                    setCouponsToShow(response);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                })
                .catch((error) => {
                    setLoading(false);
                    ErrorHandler.handleErrorResponse(error);
                });

            // return all coupons if the user is a customer in order of him being able to purchase
        } else {
            couponService.getCoupons()
                .then((response) => {
                    setCouponsToShow(response);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000);
                })
                .catch((error) => {
                    setLoading(false);
                    ErrorHandler.handleErrorResponse(error);
                });
        }
    }, []);

    // when the selected filter changes,Im setting default values to the coupon list according to the filter type.
    useEffect(() => {
        switch (selectValue) {
            case "Show Coupons By Max Price":
                handleOnChange("0") // price is 0 at first
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
        <div className="coupons">
            <h1>Coupons</h1>

            {loading ? (<LoadingSpinner />) :
                <>
                    {authStore.getState().user?.clientType === 'COMPANY' && (<>
                        <div className="addButton"><NavLink to="/coupons/coupon">Add Coupon</NavLink></div>
                        <br />
                        <br />
                    </>)}

                    <div className='select_row'>
                        <select className='select-show' onClick={(e) => handleOnChange} onChange={(e) => setSelectValue(e.target.value)}>
                            <option value="Show All Coupons">Show All Coupons</option>
                            <option value="Show Coupons By Category">Show Coupons By Category</option>
                            <option value="Show Coupons By Max Price">Show Coupons By Max Price</option>
                        </select>
                        {selectValue === "Show Coupons By Category" && (
                            <select className='select-category' onChange={(e) => handleOnChange(e.target.value)}>
                                {categoryStore.getState().categoryList.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                            </select>
                        )}
                        {selectValue === "Show Coupons By Max Price" && (<input defaultValue={0} onChange={(e) => handleOnChange(e.target.value)} type='number' placeholder='Max Price' />)}
                    </div>

                    <div className='row'>
                        {couponsToShow.slice(numberOfRecordsVisited, numberOfRecordsVisited + couponPerPage).map(coupon =>
                            <CouponCard key={coupon.id} {...coupon} />)}
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

export default Coupons;