import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbarr.css';
import { BsPerson, BsHeart, BsHandbag } from 'react-icons/bs';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import { useNavigate } from 'react-router';

function Navbarr() {
  const navigate = useNavigate();
  const clickImageHNM = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const clickSignin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <>
      <Nav className="justify-content-start" style={{ marginTop: '30px' }}>
        <Nav.Item>
          <Nav.Link className="navbarLink" style={{ color: 'black', cursor: 'default' }}>
            Customer Service
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="navbarLink" style={{ color: 'black', cursor: 'default' }} eventKey="link-1">
            Store Locator
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav className="justify-content-end" style={{ marginTop: '-40px' }}>
        <Navbar.Brand>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/640px-H%26M-Logo.svg.png" style={{ cursor: 'pointer' }} onClick={clickImageHNM} className="imageHNM" />
        </Navbar.Brand>
        <Nav.Item>
          <Nav.Link to="/login" className="navbarLink" style={{ color: 'black' }} onClick={clickSignin}>
            <h5 className="h5navbar" style={{ display: 'inline' }}>
              <BsPerson />
            </h5>
            Sign in
          </Nav.Link>
        </Nav.Item>
        <Dropdown as={NavItem}>
          <Dropdown.Toggle as={NavLink} style={{ color: 'black', marginTop: '3px', cursor: 'default' }}>
            English
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Indonesian</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Nav.Item>
          <Nav.Link className="navbarLink" style={{ color: 'black', cursor: 'default' }} eventKey="link-1">
            <h5 className="h5navbar" style={{ display: 'inline' }}>
              <BsHeart />
            </h5>
            Favourites
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="navbarLink" style={{ color: 'black', cursor: 'default' }} eventKey="link-2">
            <h5 className="h5navbar" style={{ display: 'inline' }}>
              <BsHandbag />
            </h5>
            Bag
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav className="justify-content-center">
        <Nav.Item>
          <Nav.Link style={{ color: 'black', cursor: 'default' }}>Ladies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ color: 'black', cursor: 'default' }}>Men</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ color: 'black', cursor: 'default' }}>Divided</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ color: 'black', cursor: 'default' }}>Baby</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ color: 'black', cursor: 'default' }}>Kids</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ color: 'black', cursor: 'default' }}>Sport</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link style={{ color: 'black', cursor: 'default' }}>Sale</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Navbarr;
