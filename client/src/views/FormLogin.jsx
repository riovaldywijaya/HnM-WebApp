/* eslint-disable no-unused-vars */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../../store/actions/actionCreator';
import Swal from 'sweetalert2';

function FormLogin() {
  const dispatch = useDispatch();
  // const [error, setError] = useState('');
  const [userFormInput, setUserFormInput] = useState({
    email: '',
    password: '',
  });

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

  const inputHandler = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    setUserFormInput({
      ...userFormInput,
      [field]: value,
    });
  };

  const submitFormLogin = (formData) => {
    dispatch(handleLogin(formData))
      .then(() => {
        navigate('/');
        Toast.fire({
          icon: 'success',
          title: 'Log in successfully',
        });
      })
      .catch((err) => {
        // console.log(err, '<<<<<<<<<<<<<<<');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err,
        });
        // setError(err);
      });
  };

  return (
    <>
      <div className="container" style={{ marginTop: '100px' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/640px-H%26M-Logo.svg.png" style={{ width: '80px', height: '50px', marginLeft: '600px' }} />
        <h2 className="text-center" style={{ fontWeight: 'bold' }}>
          Sign in to your account{' '}
        </h2>
        <br />
        <br />
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                submitFormLogin(userFormInput);
              }}
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={userFormInput.email} name="email" onChange={inputHandler} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={userFormInput.password} name="password" onChange={inputHandler} />
              </Form.Group>
              <Button variant="primary" className="w-100" type="submit">
                Sign in
              </Button>
            </Form>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </>
  );
}

export default FormLogin;
