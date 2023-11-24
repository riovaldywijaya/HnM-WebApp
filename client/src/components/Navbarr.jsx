/* eslint-disable no-unused-vars */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Navbarr() {
  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    Toast.fire({
      icon: 'success',
      title: 'Log out successfully',
    });
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/640px-H%26M-Logo.svg.png" style={{ width: '80px', height: '50px' }} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/640px-H%26M-Logo.svg.png" style={{ width: '80px', height: '50px' }} />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavLink to="/" style={{ textDecoration: 'none', color: 'black', marginBottom: '10px' }}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/categories" style={{ textDecoration: 'none', color: 'black', marginBottom: '10px' }}>
                    Categories
                  </NavLink>
                  <NavLink to="/admin" style={{ textDecoration: 'none', color: 'black', marginBottom: '10px' }}>
                    Register Admin
                  </NavLink>
                  <NavLink onClick={handleLogout} style={{ textDecoration: 'none', color: 'black', marginBottom: '10px' }}>
                    Sign Out
                  </NavLink>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Navbarr;
