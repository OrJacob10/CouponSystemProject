import './Home.css';
import couponSystemOnline from "../../../Images/coupon-system-online.png"
import couponImage2 from "../../../Images/couponImage2.png";
import shoppingImage from "../../../Images/shoppingImage.png";
function Home(): JSX.Element {  

    return(
        <div className="home">
          <h2 className="title">Welcome To Our Coupon System!!!</h2>
          <p className="description">
            Our Coupon System allows companies to create coupons as part of their promotional and marketing campaigns.
            <br />
            The system also has registered customers. Customers can purchase coupons, which are limited in quantity and validity.
            <br />
            Each customer is limited to one coupon per type. The system keeps track of the purchased coupons for each customer.
            <br />
            The system generates revenue from the customers' coupon purchases and the creation and updating of new coupons by the companies.
          </p>

          <div className='images-container'>
              <img src={shoppingImage}/>
              <img src={couponSystemOnline}/>
              <img src={couponImage2}/>
          </div>
      </div>
    );
}

export default Home 