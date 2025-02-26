import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LoginModel from '../../../Models/LoginModel';
import authService from '../../../Services/AuthService';
import './Login.css'
import { authStore } from '../../../Redux/AuthState';
import ErrorHandler from '../../HandleError/ErrorHandler';

function Login(): JSX.Element{

const {register, handleSubmit, formState, setError} = useForm<LoginModel>();
const navigate = useNavigate();


function login(loginModel: LoginModel): void{
    
    authService.login(loginModel)
    .then(response =>{
        console.log(authStore.getState().user?.id);
        alert("Login Successfull!");
        navigate('/home');

    }).catch((error) =>{
        ErrorHandler.handleErrorResponse(error);
    })
}

    return(
   <div className="Login">
            <form onSubmit={handleSubmit(login)}>
                    <h1>Login</h1>
                        <div className='inputs'>
                            <div className="coolinput">
                                <label htmlFor="input" className="text">Email:</label>
                                <input className= "input" type="text" placeholder="Email"{...register("email",
                            {required: {value: true, message: "*Email Field Is Mandatory"},
                            pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i ,message:"*Email Is Not Valid"}})} /> 
                            </div> 
                            {formState.errors.email?.message && (<span className='error_message'>{formState.errors.email?.message}</span>)}

                            <div className="coolinput">
                                <label htmlFor="input" className="text">Password:</label>
                                <input className= "input" type="text" placeholder='Password' {...register("password", {required: {value: true, message: "*Password Field Is Mandatory"}})}/>
                            </div>                       
                            {formState.errors.password?.message && (<span className='error_message'>{formState.errors.password?.message}</span>)}
                            
                            <div className="coolinput">
                                <label htmlFor="input" className="text">Client Type:</label>
                                <select className='input' {...register("clientType", {required:{value:true, message:"*Client Type Field Is Mandatory"}})}>
                                <option value="" disabled selected>Please Select Client Type</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="COMPANY">COMPANY</option>
                                <option value="CUSTOMER">CUSTOMER</option>
                            </select>
                            </div>   
                            
                            {formState.errors.clientType?.message && (<span className='error_message'>{formState.errors.clientType?.message}</span>)}

                            <button>Login</button>
                        </div>
            </form>
        </div>
    )
}
export default Login;