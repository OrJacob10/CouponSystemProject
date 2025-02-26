import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CompanyModel from '../../Models/CompanyModel';
import companyService from '../../Services/CompanyService';
import './Companies.css';
import CompanyCard from './CompanyCard/CompanyCard';
import ReactPaginate from 'react-paginate';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ErrorHandler from '../HandleError/ErrorHandler';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

// Import the loading animation component

function Companies(): JSX.Element {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const [page, setPage] = useState<number>(0); // current page
  const companiesPerPage = 14; // companies per page
  const numberOfRecordsVisited = page * companiesPerPage;
  const totalPages = Math.ceil(companies.length / companiesPerPage);
  const [loading, setLoading] = useState<boolean>(true);

  const changePage = ({ selected }: any) => {
    setPage(selected);
  };

  useEffect(() => {
    companyService
      .getCompanies()
      .then((response) => {
        setCompanies(response);
        console.log(response);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler.handleErrorResponse(error);
      });

  }, []);

  return (
    <div className="companies">
      <h1>Companies</h1>
      <br />
      {loading ? (<LoadingSpinner />) :
        <>
          <div className="addButton">
            <NavLink to="/companies/company">Add Company</NavLink>
          </div>
          <br />
          <br />

          <div className="row">
            {companies
              .slice(numberOfRecordsVisited, numberOfRecordsVisited + companiesPerPage)
              .map((company) => (
                <CompanyCard key={company.id} {...company} />
              ))}
          </div>

          <div className="pagination-container">
            <ReactPaginate
              previousLabel={<ArrowBackIosIcon style={{ fontSize: 18, width: 150 }} />}
              nextLabel={<ArrowForwardIosIcon style={{ fontSize: 18, width: 150 }} />}
              pageCount={totalPages}
              onPageChange={changePage}
              containerClassName={'pagination'}
              previousLinkClassName={'item previous'}
              nextLinkClassName={'item next'}
              disabledClassName={'disabled-page'}
              activeClassName={'item active'}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
            />
          </div>
        </>
      }
    </div>
  );
}

export default Companies;
