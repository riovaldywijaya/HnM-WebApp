// import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footerr.css';

function Footerr() {
  return (
    <footer className="bg-light text-center text-lg-start" style={{ bottom: 0, width: '100%', marginBottom: '-30px' }}>
      <div className="row" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <div className="text-center p-3">
            HENNES
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/640px-H%26M-Logo.svg.png" style={{ width: '50px', height: '30px', margin: 'auto 10px' }} />
            MAURITZ
          </div>
          <div className="text-center p-3" style={{ fontSize: '10px' }}>
            <p>
              H&M`s business concept is to offer fashion and quality at the best price in a sustainable way. H&M has since it was founded in 1947 grown into one of the world`s leading fashion companies. The content of this site is
              copyright-protected and is the property of H&M Hennes & Mauritz AB. Customers Complaint Service, Directorate General of Consumer Protection and Trade Compliance, Ministry of Trade of the Republic of Indonesia, 0853-1111-1010
              (WhatsApp)
            </p>
          </div>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </footer>
  );
}

export default Footerr;
