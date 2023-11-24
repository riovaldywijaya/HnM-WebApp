import { useNavigate } from 'react-router';
import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import image5 from '../assets/5.png';
import image6 from '../assets/6.png';
import image7 from '../assets/7.png';
import image8 from '../assets/8.png';

function LandingPage() {
  const navigate = useNavigate();

  const goToProducts = (e) => {
    e.preventDefault;
    navigate('/products');
  };

  return (
    <>
      <div className="row" style={{ marginTop: '50px', marginLeft: '50px' }}>
        <div className="col-lg-3"></div>
        <div className="col-lg-2">
          <p style={{ textAlign: 'center', float: 'left', fontSize: '12px', cursor: 'pointer' }} onClick={goToProducts}>
            Find H&M stores near you
          </p>
        </div>
        <div className="col-lg-2">
          <p style={{ textAlign: 'center', float: 'left', fontSize: '12px', marginRight: '80px', cursor: 'pointer' }} onClick={goToProducts}>
            Register & get 20% off your first purchase. Use code: NEW20
          </p>
        </div>
        <div className="col-lg-2">
          <p style={{ textAlign: 'center', float: 'left', fontSize: '12px', cursor: 'pointer' }} onClick={goToProducts}>
            Shop our Online e-Voucher
          </p>
        </div>
        <div className="col-lg-3"></div>
      </div>
      <br />
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-7">
          <img src={image1} onClick={goToProducts} style={{ cursor: 'pointer' }} />
        </div>
        <div className="col-lg-3"></div>
      </div>
      <br />

      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-7">
          <img src={image2} onClick={goToProducts} style={{ cursor: 'pointer' }} />
        </div>
        <div className="col-lg-3"></div>
      </div>
      <br />
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-7">
          <img src={image3} onClick={goToProducts} style={{ cursor: 'pointer' }} />
        </div>
        <div className="col-lg-3"></div>
      </div>
      <br />
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-7">
          <img src={image4} onClick={goToProducts} style={{ cursor: 'pointer' }} />
        </div>
        <div className="col-lg-3"></div>
      </div>
      <br />
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-7">
          <img src={image5} onClick={goToProducts} style={{ cursor: 'pointer' }} />
        </div>
        <div className="col-lg-3"></div>
      </div>
      <br />
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-7">
          <img src={image6} onClick={goToProducts} style={{ cursor: 'pointer' }} />
        </div>
        <div className="col-lg-3"></div>
      </div>
      <br />
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-7">
          <img src={image7} onClick={goToProducts} style={{ cursor: 'pointer' }} />
        </div>
        <div className="col-lg-3"></div>
      </div>
      <br />
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-7">
          <img src={image8} onClick={goToProducts} style={{ cursor: 'pointer' }} />
        </div>
        <div className="col-lg-3"></div>
      </div>
      <br />
    </>
  );
}

export default LandingPage;
