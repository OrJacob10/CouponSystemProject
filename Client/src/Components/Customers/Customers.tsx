import { useEffect, useState } from 'react';
import './Customers.css';
import CustomerModel from '../../Models/CustomerModel';
import customerService from '../../Services/CustomerService';
import CustomerCard from './CustomerCard/CustomerCard';
import { customerStore } from '../../Redux/CustomerState';
import ReactPaginate from 'react-paginate';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ErrorHandler from '../HandleError/ErrorHandler';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';


function Customers(): JSX.Element{

    const [customers, setCustomers] = useState<CustomerModel[]>([]);

    const [page, setPage] = useState<number>(0); // current page
    const customersPerPage = 14; // customers per page
    const numberOfRecordsVisited = page * customersPerPage; 
    const totalPages = Math.ceil(customers.length / customersPerPage);

    const [loading, setLoading] = useState<boolean>(true);

    const changePage = ({selected}: any) =>{
        setPage(selected);
    };

    useEffect(() => {
        console.log(customerStore.getState().customerList);
        customerService.getCustomers().then((response) =>{
            console.log(response);
            setCustomers(response);
            setTimeout(() => {
                setLoading(false); 
              }, 1000); 
        }).catch(error =>{
            setLoading(false);
            console.log(error);
            ErrorHandler.handleErrorResponse(error);
        });
    }, []);

    return (
        <div className="customers">
            <h1>Customers</h1>
            {loading? (<LoadingSpinner />): 
            <>
            <br/>
            <div className="addButton"><NavLink to="/customers/customer">Add Customer</NavLink></div>
            <br/>
            <br/>
            <div className='row'>
                {customers.slice(numberOfRecordsVisited, numberOfRecordsVisited+customersPerPage).map(customer => 
                <CustomerCard key={customer.id} {...customer} />
                )}
            </div>

            <div className='pagination-container'>
                <ReactPaginate 
                        previousLabel = {<ArrowBackIosIcon style={{ fontSize: 18, width: 150 }}/>}
                        nextLabel={<ArrowForwardIosIcon style={{ fontSize: 18, width: 150 }}/>}
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
            </>}
            
        </div>
    );
}

export default Customers;