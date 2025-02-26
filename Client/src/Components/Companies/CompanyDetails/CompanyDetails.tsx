import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './CompanyDetails.css'
import { useEffect, useState } from 'react';
import CompanyModel from '../../../Models/CompanyModel';
import companyService from '../../../Services/CompanyService';
import { authStore } from '../../../Redux/AuthState';
import ErrorHandler from '../../HandleError/ErrorHandler';
import { companyStore } from '../../../Redux/CompanyState';


function CompanyDetails(): JSX.Element {

    const params = useParams();
    const navigator = useNavigate();
    const companyId = +params.companyId!;

    const [company, setCompany] = useState<CompanyModel>();

    useEffect(() => {
        if(authStore.getState().user?.clientType !== "COMPANY"){
        companyService.getSingleCompany(companyId).then((company) => {
            setCompany(company);
        }).catch(error => {
            ErrorHandler.handleErrorResponse(error);
        });
        }
    }, []);

    function deleteCompany() {
        const isDelete = window.confirm("Would you like to delete this company?");
        if (isDelete) {
            companyService.deleteCompany(companyId).then((response) => {
                alert("Company Has Been Deleted Successfully");
                navigator('/companies')
            }).catch(error => {
                ErrorHandler.handleErrorResponse(error);
            });
        }
    }


    return (
        <div className="CompanyDetails">
            {authStore.getState().user?.clientType === "COMPANY"? (<><h1>{authStore.getState().user?.name}</h1>
                    <h2>Email: {authStore.getState().user?.email}</h2></>)
                    
            :
            <>
                <h1>{company?.name}</h1>
                <h2>Email: {company?.email}</h2>
                <div className='action_row'>
                    {authStore.getState().user?.clientType == 'ADMIN' && (<NavLink to={'/companies/company/' + companyId}>Edit Company</NavLink>)}
                    {authStore.getState().user?.clientType == 'ADMIN' && (<button onClick={deleteCompany}>Delete Company</button>)}
                </div>
            </>
            }
        
        </div>
    );
}
export default CompanyDetails;
