import { useForm } from 'react-hook-form';
import './CouponForm.css'
import { useNavigate, useParams } from 'react-router-dom';
import CouponModel from '../../../Models/CouponModel';
import couponService from '../../../Services/CouponService';
import { useEffect, useState } from 'react';
import categoryService from '../../../Services/CategoryService';
import CategoryModel from '../../../Models/CategoryModel';
import { categoryStore } from '../../../Redux/CategoryState';
import { couponStore } from '../../../Redux/CouponState';
import ErrorHandler from '../../HandleError/ErrorHandler';

function Coupon(): JSX.Element {

    const { register, handleSubmit, setValue, formState } = useForm<CouponModel>();
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [categorySelected, setCategorySelected] = useState<string>("");
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {

        categoryService.getAllCategories().then((categoriesResponse) => {
            setCategories(categoriesResponse);
        }).catch(error =>{
            ErrorHandler.handleErrorResponse(error);
        })        
    },[]);

    useEffect(()=>{
        if(params.couponId){
            const couponId = +params.couponId;
            const couponFromState: CouponModel = couponStore.getState().couponList.find(coupon => coupon.id === couponId)!;
            setValue('title', couponFromState.title, {shouldValidate: true});
            setValue('description', couponFromState.description, {shouldValidate: true}); 
            setValue('category.name', couponFromState.category.name, { shouldValidate: false });   
            setValue('startDate', couponFromState.startDate, {shouldValidate: true});
            setValue('endDate', couponFromState.endDate, {shouldValidate: true});
            setValue('amount', couponFromState.amount, {shouldValidate: true});
            setValue('price', couponFromState.price, {shouldValidate: true});
            setValue('image', couponFromState.image, {shouldValidate: true});
            console.log(couponFromState.category.name);
            console.log(categories);
        }
    },[categories])


    function sendCoupon(coupon: CouponModel): void {
        console.log(coupon);
        if(params.couponId){
            coupon.id = +params.couponId;
            if((categoryStore.getState().categoryList.filter(category => category.name === coupon.category.name)).at(0) !== undefined){
                const category: CategoryModel = categoryStore.getState().categoryList.filter(category => category.name === coupon.category.name).at(0)!;
                coupon.category = category;
            }

            console.log(coupon);
            couponService.updateCoupon(coupon.id, coupon).then(response => {
                alert("The Coupon Has Been Updated Successfully");
                navigate('/coupon-details/'+ coupon.id);

            }).catch(error =>{
                ErrorHandler.handleErrorResponse(error);
            })
        }

        else{
           if((categoryStore.getState().categoryList.filter(category => category.name === coupon.category.name)).at(0) !== undefined ){
            const category: CategoryModel = categoryStore.getState().categoryList.filter(category => category.name === coupon.category.name).at(0)!;
            coupon.category = category;
           }
           else{
           const category: CategoryModel = categoryStore.getState().categoryList.at(0)!;
           coupon.category = category;
           }
            couponService.addCoupon(coupon).then(resopnse => {  
                alert("The Coupon Has Been Added Successfully");
                navigate("/coupons")
            }).catch(error =>{
                ErrorHandler.handleErrorResponse(error);
            });
        }
}
    return (
        <div className="coupon-form">
            <h1>{params.couponId? 'Edit Coupon':'Add Coupon'}</h1>
            <form onSubmit={handleSubmit(sendCoupon)}>
                <div className="inputs">

                    <div className="coolinput">
                        <label htmlFor="input" className="text">Title:</label>
                        <input type="text" placeholder="Title" className='input' {...register("title", {required: {value: true, message: "*Title Field Is Mandatory"}})} />
                    </div> 
                    {formState.errors.title?.message && (<span className='error_message'>{formState.errors.title?.message}</span>)}

                    <div className="coolinput">
                        <label htmlFor="input" className="text">Description:</label>
                        <input type="text" placeholder="Description" className='input' {...register("description", {required: {value: true, message: "*Description Field Is Mandatory"}})} />
                    </div> 
                    {formState.errors.description?.message && (<span className='error_message'>{formState.errors.description?.message}</span>)}

                    <div className="coolinput">
                    <label htmlFor="input" className="text">Category:</label>
                        <select className='input' {...register("category.name", { required: {value: true, message: '*Category Field Is Mandatory'} })}>
                            <option selected disabled value="">Choose Category</option>
                            {
                                categories.map((category) => <option key={category.id}>{category.name}</option>)
                            }
                        </select>
                    </div>
                    {formState.errors.category?.name && (<span className='error_message'>{formState.errors.category.name.message}</span>)}

                    <div className="coolinput">
                        <label htmlFor="input" className="text">Start Date:</label>
                        <input type="date" placeholder="Start Date" className='input' {...register("startDate", {required: {value: true, message: "*Start Date Field Is Mandatory"}})} />
                    </div> 
                    {formState.errors.startDate?.message &&(<span className='error_message'>{formState.errors.startDate?.message}</span>)}

                    <div className="coolinput">
                        <label htmlFor="input" className="text">End Date:</label>
                        <input type="date" placeholder="End Date" className='input'{...register("endDate", {required: {value: true, message: "*End Date Field Is Mandatory"}})} />
                    </div> 
                    {formState.errors.endDate?.message &&(<span className='error_message'>{formState.errors.endDate?.message}</span>)}

                    <div className="coolinput">
                        <label htmlFor="input" className="text">Amount:</label>
                        <input type="number" placeholder="Amount" className='input'{...register("amount", {required: {value: true, message: "*Amount Field Is Mandatory"}})} />
                    </div> 
                    {formState.errors.amount?.message &&(<span className='error_message'>{formState.errors.amount?.message}</span>)}

                    <div className="coolinput">
                        <label htmlFor="input" className="text">Price:</label>
                        <input type="number" placeholder="Price" className='input'{...register("price", {required: {value: true, message: "*Price Field Is Mandatory"}})} />
                    </div> 
                    {formState.errors.price?.message &&(<span className='error_message'>{formState.errors.price?.message}</span>)}

                    <div className="coolinput">
                        <label htmlFor="input" className="text">Image:</label>
                        <input type="text" placeholder="Image" className='input'{...register("image", {required: {value: true, message: "*Image Field Is Mandatory"}})} />
                    </div> 
                    {formState.errors.image?.message &&(<span className='error_message'>{formState.errors.image?.message}</span>)}
                    <button className='btn' type="submit">{params.couponId? 'Update Coupon':'Add Coupon'}</button>
                </div>
            </form>
        </div>
    );
}

export default Coupon