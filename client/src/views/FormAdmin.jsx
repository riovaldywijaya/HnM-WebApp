/* eslint-disable no-unused-vars */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAdmin } from '../../store/actions/actionCreator';
import { useDispatch } from 'react-redux';

function FormAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [userFormInput, setUserFormInput] = useState({
    email: '',
    password: '',
    role: 'admin',
  });

  const inputHandler = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    setUserFormInput({
      ...userFormInput,
      [field]: value,
    });
  };

  const submitFormAdmin = (formData) => {
    dispatch(createAdmin(formData))
      .then(() => {
        console.log('Create admin success!');
        navigate('/');
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <div className="container" style={{ marginTop: '100px' }}>
        <h2 className="text-center" style={{ fontWeight: 'bold' }}>
          Register New Admin
        </h2>
        <br />
        <br />
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                submitFormAdmin(userFormInput);
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={userFormInput.username} name="username" onChange={inputHandler} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" value={userFormInput.email} name="email" onChange={inputHandler} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={userFormInput.password} name="password" onChange={inputHandler} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="number" value={userFormInput.phoneNumber} name="phoneNumber" onChange={inputHandler} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={userFormInput.address} name="address" onChange={inputHandler} />
              </Form.Group>

              <Button variant="primary" className="w-100" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </>
  );
}

export default FormAdmin;
