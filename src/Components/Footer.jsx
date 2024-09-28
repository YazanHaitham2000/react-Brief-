import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import '../assets/css/Footer.css';

const Footer = () => {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted myFooter'>
      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <img src="src/assets/img/logo/logo.png" alt="" />
                <div className="mt-5">
                  <a href='' className='me-4 text-reset'>
                    <MDBIcon fab icon='facebook-f' className="icon-size" />
                  </a>
                  <a href='' className='me-4 text-reset'>
                    <MDBIcon fab icon='twitter' className="icon-size" />
                  </a>
                  <a href='' className='me-4 text-reset'>
                    <MDBIcon fab icon='google' className="icon-size" />
                  </a>
                  <a href='' className='me-4 text-reset'>
                    <MDBIcon fab icon='instagram' className="icon-size" />
                  </a>
                </div>
              </h6>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ fontSize : "2rem" }}>Contact</h6>
              <p  style={{ color : "white" }}>
                <MDBIcon icon='home' className='me-2 icon-size'  style={{ color : "white" }}/>
                New York, NY 10012, US
              </p>
              <p  style={{ color : "white" }}>
                <MDBIcon icon='envelope' className='me-3 icon-size'  style={{ color : "white" }}/>
                info@example.com
              </p>
              <p  style={{ color : "white" }}>
                <MDBIcon icon='phone' className='me-3 icon-size' style={{ color : "white" }} /> + 01 234 567 88
              </p>
              <p  style={{ color : "white" }}>
                <MDBIcon icon='print' className='me-3 icon-size' style={{ color : "white" }} /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </MDBFooter>
  );
}

export default Footer;
