import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProfileOut from './ProfileOut';
import './navbar.css';
import { Link } from 'react-router-dom'; 



const HeaderLogged = ()=>{
  return (            <Navbar id="navigation" className="main-header d-flex align-items-center myNav">
        <Container className="d-flex align-items-center justify-content-between">
      <Navbar.Brand href="#home" className="d-flex align-items-center">
                <img src="src\assets\img\logo\logo.png" alt="" />
        
      </Navbar.Brand>
      
          <Nav className="d-flex align-items-center gap-4">
          <Nav.Link as={Link} to="/" className="d-flex align-items-center" style={{ fontSize: '15px' }}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/Courses" className="d-flex align-items-center" style={{ fontSize: '15px' }}>
            Courses
          </Nav.Link>
        <ProfileOut className="profile-out"/>

          </Nav>
        </Container>
      </Navbar>
  )
}

export default HeaderLogged;