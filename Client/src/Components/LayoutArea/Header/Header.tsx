import { useEffect } from 'react';
import AuthMenu from '../../AuthArea/AuthMenu/AuthMenu';
import './Header.css'
import { authStore } from '../../../Redux/AuthState';
import { useNavigate } from 'react-router-dom';


function Header(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            if (authStore.getState().token === null) {
                alert("Your Session Has Expired, Please Login Again To Enjoy The Website!");
                navigate('/login');
            }
        })

        // when you return the component is ruined, so unsubscribe come right before the destruction of the component
        return () => unsubscribe();
    }, []);

    return (
        <div className="Header">

            <div className="container">
                <span className="react-logo">
                    <span className="nucleo"></span>
                </span>
            </div>
            <h1>Coupons System</h1>
            <AuthMenu />
        </div>
    );
}

export default Header

