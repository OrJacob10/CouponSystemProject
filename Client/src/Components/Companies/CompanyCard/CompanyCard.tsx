import { NavLink } from 'react-router-dom';
import './CompanyCard.css'
import CompanyModel from '../../../Models/CompanyModel';

function CompanyCard(companyProps: CompanyModel): JSX.Element{

    return(
        <div className='company-card'>
                <div className="card">
                    <div className="card__image">
                        
                    </div>
                    <div className="card__content">
                        <p className="card__title">{companyProps.name.substring(0,16)}</p>
                        <p className="card__text">{companyProps.email}</p>
                        <NavLink className="card__button" to={"/company-details/" + companyProps.id}>Read More </NavLink>
                    </div>
                </div>
        </div>
    );
}
export default CompanyCard;