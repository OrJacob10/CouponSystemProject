import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserModel from '../../../Models/UserModel';
import { authStore } from '../../../Redux/AuthState';
import authService from '../../../Services/AuthService';
import './AuthMenu.css';


function AuthMenu(): JSX.Element {


    const [user, setUser] = useState<UserModel>();
    const navigate = useNavigate();


    useEffect(() => {

        setUser(authStore.getState().user!);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user!);
        })

        // when you return the component is ruined, so unsubscribe come right before the destruction of the component
        return () => unsubscribe();
    }, []);

    function helloUser() {
        if (user != null) {
            switch (user?.clientType) {
                case 'ADMIN': return <span className='logout'>Hello Admin <button onClick={logout}>logout</button></span>;
                case 'COMPANY': return <span className='logout'>Hello {user.name} <button onClick={logout}>logout</button></span>;
                case 'CUSTOMER': return <span className='logout'>Hello {user.firstName} <button onClick={logout}>logout</button></span>;
            }

        }
        return <span className='login'>Hello Guest <NavLink to="/login">login</NavLink></span>;
    }
    function logout() {
        authService.logout();
        navigate("/home");
    }

    return (
        <div className="AuthMenu">
            <>
                {helloUser()}
            </>
        </div>
    );
}

export default AuthMenu