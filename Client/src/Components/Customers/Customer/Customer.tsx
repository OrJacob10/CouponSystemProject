import { useForm } from 'react-hook-form';
import './Customer.css'
import CustomerModel from '../../../Models/CustomerModel';
import customerService from '../../../Services/CustomerService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ErrorHandler from '../../HandleError/ErrorHandler';

function Customer(): JSX.Element {

    const { register, handleSubmit, setValue, formState } = useForm<CustomerModel>();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {

        if (params.customerId) {
            customerService.getSingleCustomer(+params.customerId).then((customer) => {
                setValue('firstName', customer.firstName, { shouldValidate: true });
                setValue('lastName', customer.lastName, { shouldValidate: true });
                setValue('email', customer.email, { shouldValidate: true });
            }).catch(error => {
                ErrorHandler.handleErrorResponse(error);
            })
        }
    }, []);

    function sendCustomer(customer: CustomerModel): void {
        console.log(customer);
        if (params.customerId) {
            customer.id = +params.customerId;
            customerService.updateCustomer(customer.id, customer).then((customerResponse => {
                alert("Customer Has Been Updated Successfully!")
                navigate('/customer-details/' + customer.id);

            })).catch(error => {
                ErrorHandler.handleErrorResponse(error);
            })
        }

        else {
            customerService.addCustomer(customer).then(coupon => {
                alert("Customer Has Been Added Successfully!");
                navigate("/customers")
            }).catch(error => {
                ErrorHandler.handleErrorResponse(error);
            });
        }
    }

    return (
        <div className="customer">
            <h1>{params.customerId ? 'Edit Customer' : 'Add Customer'}</h1>
            <form onSubmit={handleSubmit(sendCustomer)}>
                <div className="inputs">
                    <div className="coolinput">
                        <label htmlFor="input" className="text">First Name:</label>
                        <input className='input' type="text" placeholder="First Name" {...register("firstName", { required: { value: true, message: "*First Name Field Is Mandatory" } })} />
                    </div> 
                    {formState.errors.firstName?.message && (<span className='error_message'>{formState.errors.firstName?.message}</span>)}

                    <div className="coolinput">
                        <label htmlFor="input" className="text">Last Name:</label>
                        <input className='input' type="text" placeholder="Last Name" {...register("lastName", { required: { value: true, message: "*Last Name Field Is Mandatory" } })} />
                    </div> 
                    {formState.errors.lastName?.message && (<span className='error_message'>{formState.errors.lastName?.message}</span>)}
                    
                    <div className="coolinput">
                        <label htmlFor="input" className="text">Last Name:</label>
                        <input className='input' type="text" placeholder="Email" {...register("email",
                        {
                            required: { value: true, message: "*Email Field Is Mandatory" },
                            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "*Email Is Not Valid" }
                        })} />
                    </div> 
                    {formState.errors.email?.message && (<span className='error_message'>{formState.errors.email?.message}</span>)}

                    <div className="coolinput">
                        <label htmlFor="input" className="text">Password:</label>
                        {!params.customerId && (<input className='input' type="text" placeholder='Password' {...register("password", { required: { value: true, message: "*Password Field Is Mandatory" } })} />)}
                    </div> 
                    {formState.errors.password?.message && (<span className='error_message'>{formState.errors.password?.message}</span>)}
                    
                    <button type='submit'>{params.customerId ? 'Update Customer' : 'Add Customer'}</button>
                </div>
            </form>
        </div>
    );
}

export default Customer;