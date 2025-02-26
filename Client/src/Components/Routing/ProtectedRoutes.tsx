import { Navigate, Outlet} from 'react-router-dom';
import { authStore } from '../../Redux/AuthState';

const PrivateRoutes = () => {
    console.log(authStore.getState().token);
    return(
        authStore.getState().token?
        <Outlet></Outlet>
        :
        <Navigate to={"/login"}/>
    )
    
}

export default PrivateRoutes;