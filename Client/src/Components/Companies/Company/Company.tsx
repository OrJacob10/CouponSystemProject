import { useForm } from 'react-hook-form';
import CompanyModel from '../../../Models/CompanyModel';
import companyService from '../../../Services/CompanyService';
import './Company.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ErrorHandler from '../../HandleError/ErrorHandler';

function Company(): JSX.Element {

    const { register, handleSubmit, setValue, formState } = useForm<CompanyModel>();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {

        if (params.companyId) {
            companyService.getSingleCompany(+params.companyId).then((company) => {
                setValue('name', company.name, { shouldValidate: true });
                setValue('email', company.email, { shouldValidate: true });
            }).catch(error => {
                ErrorHandler.handleErrorResponse(error);
            });
        }
    }, []);

    function sendCompany(company: CompanyModel): void {
        console.log(company);
        if (params.companyId) {
            company.id = +params.companyId;
            companyService.updateCompany(company.id, company).then((companyResponse => {
                alert("Company Has Been Updated Successfully!")
                navigate('/company-details/' + company.id);

            })).catch(error => {
                ErrorHandler.handleErrorResponse(error);
            })
        }

        else {
            companyService.addCompany(company).then(company => {
                alert("Company Has Been Added Successfully!");
                navigate("/companies")
            }).catch(error => {
                ErrorHandler.handleErrorResponse(error);
            });
        }
    }

    return (
        <div className="Company">
            <h1>{params.companyId ? 'Edit Company' : 'Add Company'}</h1>
            <form onSubmit={handleSubmit(sendCompany)}>
                <div className="inputs">
                    <div className="coolinput">
                        <label htmlFor="input" className="text">Name:</label>
                        <input className= "input" type="text" placeholder="Name"{...register("name",{required: {value: true, message: "*Name Field Is Mandatory"}})} /> 
                    </div> 
                    {formState.errors.name?.message && (<span className='error_message'>{formState.errors.name?.message}</span>)}

                    <div className="coolinput">
                        <label htmlFor="input" className="text">Email:</label>
                        <input className='input' type="text" placeholder="Email" {...register("email",
                        {
                            required: { value: true, message: "*Email Field Is Mandatory" },
                            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "*Email Is Not Valid" }
                        })} />
                    </div> 
                    {formState.errors.email?.message && (<span className='error_message'>{formState.errors.email?.message}</span>)}

                    <div className="coolinput">
                        <label htmlFor="input" className="text">Password:</label>
                        {!params.companyId && (<input className='input' type="text" placeholder='Password' {...register("password", { required: { value: true, message: "*Password Field Is Mandatory" } })} />)}
                    </div> 
                    {formState.errors.password?.message && (<span className='error_message'>{formState.errors.password?.message}</span>)}
                    
                    <button type='submit'>{params.companyId ? 'Update Company' : 'Add Company'}</button>
                </div>
            </form>
        </div>
    );
}

export default Company