import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css'
import { authStore } from '../../../Redux/AuthState';
import UserModel from '../../../Models/UserModel';

function Menu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();
    
    useEffect(() => {
        setUser(authStore.getState().user!);
        const unsubscribe = authStore.subscribe(() =>{
            setUser(authStore.getState().user!);
        })

        // when you return the component is ruined, so unsubscribe come right before the destruction of the component
        return ()=> unsubscribe();
    },[]);

    return (
        <div className="Menu">
           <NavLink to="/home">Home</NavLink>
           {user?.clientType ==='ADMIN' && (<NavLink to="/companies">Companies</NavLink>)}
           {user?.clientType ==='ADMIN' && (<NavLink to="/customers">Customers</NavLink>)}
           {user?.clientType ==='COMPANY' && (<NavLink to="/coupons">Coupons</NavLink>)}
           {user?.clientType ==='COMPANY' && (<NavLink to={"/company-details/"+ authStore.getState().user?.id}>Details</NavLink>)}
           {user?.clientType ==='CUSTOMER' && (<NavLink to="/customer/coupons">My Coupons</NavLink>)}
           {user?.clientType ==='CUSTOMER' && (<NavLink to="/coupons">Coupons Shop</NavLink>)}
           {user?.clientType ==='CUSTOMER' && (<NavLink to={"/customer-details/"+ authStore.getState().user?.id}>Details</NavLink>)}
        </div>
    );
}

export default Menu

