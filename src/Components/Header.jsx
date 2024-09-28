import { Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import RegButton from './RegButton';
import LogButton from './LogButton';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/Navbar.css';
import './navbar.css';

const Header = () => {
  return (
    <Navbar id="navigation" className="main-header d-flex align-items-center myNav">
      <Container className="d-flex align-items-center justify-content-between">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src="src/assets/img/logo/logo.png" alt="Logo" />
        </Navbar.Brand>

        <Nav className="d-flex align-items-center gap-4">
          <Nav.Link as={Link} to="/" className="d-flex align-items-center" style={{ fontSize: '15px' }}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/Courses" className="d-flex align-items-center" style={{ fontSize: '15px' }}>
            Courses
          </Nav.Link>
          <RegButton />
          <LogButton />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;