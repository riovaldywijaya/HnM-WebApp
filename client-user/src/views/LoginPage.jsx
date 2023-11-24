import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './LoginPage.css';
import { useNavigate } from 'react-router';

function LoginPage() {
  const navigate = useNavigate();
  const clickLogin = () => {
    navigate('/');
  };

  return (
    <div className="container" style={{ height: '750px', marginTop: '50px' }}>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <h3>SIGN IN</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email </Form.Label>
              <Form.Control type="email" style={{ borderRadius: '0px' }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" style={{ borderRadius: '0px' }} />
            </Form.Group>
            <Form.Label>
              <p>Forgot your password?</p>
            </Form.Label>
            <Button id="buttonSignin" onClick={clickLogin} variant="primary" type="submit">
              Sign in
            </Button>
            <p id="pOR">or</p>
            <Button id="buttonJoinus" disabled variant="primary" type="submit">
              Join us
            </Button>
          </Form>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
}

export default LoginPage;
