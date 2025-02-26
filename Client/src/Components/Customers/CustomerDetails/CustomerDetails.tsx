import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './CustomerDetails.css'
import { useEffect, useState } from 'react';
import { authStore } from '../../../Redux/AuthState';
import CustomerModel from '../../../Models/CustomerModel';
import customerService from '../../../Services/CustomerService';
import ErrorHandler from '../../HandleError/ErrorHandler';


function CustomerDetails(): JSX.Element {

    const params = useParams();
    const navigator = useNavigate();
    const customerId = +params.customerId!;
    const [customer, setCustomer] = useState<CustomerModel>();

    useEffect(() => {
        if(authStore.getState().user?.clientType !== "CUSTOMER"){
            customerService.getSingleCustomer(customerId).then((response) => {
                setCustomer(response);
            }).catch(error => {
                ErrorHandler.handleErrorResponse(error);
            });
        }
    }, []);

    function deleteCustomer() {
        const isDelete = window.confirm("Would you like to delete this customer?");
        if (isDelete) {
            customerService.deleteCustomer(customerId).then((response) => {
                alert("Customer Has Been Deleted Successfully!");
                navigator('/customers')
            }).catch(error => {
                ErrorHandler.handleErrorResponse(error);
            });
        }
    }

    return (
        <div className="customer-details">
            {authStore.getState().user?.clientType === "CUSTOMER"? (<><h1>{authStore.getState().user?.firstName} {authStore.getState().user?.lastName}</h1>
                    <h2>Email: {authStore.getState().user?.email}</h2></>)
                    
            :
            <>
                <h1>{customer?.firstName} {customer?.lastName}</h1>
                <h2>Email: {customer?.email}</h2>
                <div className='action_row'>
                    {authStore.getState().user?.clientType == 'ADMIN' && (<NavLink to={'/customers/customer/' + customerId}>Edit Customer</NavLink>)}
                    {authStore.getState().user?.clientType == 'ADMIN' && (<button onClick={deleteCustomer}>Delete Customer</button>)}
                </div>
            </>
            }
        </div>
    );
}
export default CustomerDetails;
