import { NavLink } from 'react-router-dom';
import CustomerModel from '../../../Models/CustomerModel';
import './CustomerCard.css'; 

function CustomerCard(customerProps: CustomerModel): JSX.Element{

    return(
        <div className='customer-card'>
                <div className="card">
                    <div className="card__image">
                        
                    </div>
                    <div className="card__content">
                        <p className="card__title">{customerProps.firstName.substring(0,8) +" "+customerProps.lastName.substring(0,8)}</p>
                        <p className="card__text">{customerProps.email}</p>
                        <NavLink className="card__button" to={"/customer-details/" + customerProps.id}>Read More</NavLink>
                    </div>
                </div>
        </div>
    );
}
export default CustomerCard;