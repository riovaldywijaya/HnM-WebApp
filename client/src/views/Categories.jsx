/* eslint-disable no-unused-vars */
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, fetchCategories } from '../../store/actions/actionCreator';
import TableRowCategories from '../components/TableRowCategories';
import Swal from 'sweetalert2';

function Categories() {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [userFormInput, setUserFormInput] = useState({
    name: '',
  });
  const categories = useSelector((state) => state.categoryReducer.categories);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!categories.length) {
      Swal.fire({
        title: 'Uploading...',
        html: 'Please wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      dispatch(fetchCategories())
        .then(() => {
          console.log('fetch categories success!');
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          Swal.close();
        });
    }
  }, []);

  const inputHandler = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    setUserFormInput({
      ...userFormInput,
      [field]: value,
    });
  };

  const addCategory = (formData) => {
    dispatch(createCategory(formData))
      .then(() => {
        setUserFormInput({
          name: '',
        });
        handleClose();
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <div className="container" style={{ marginTop: '30px' }}>
        <div className="text-center mb-4">
          <h1>CATEGORY LIST</h1>
          <Button variant="primary" onClick={handleShow}>
            + Add Category
          </Button>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <Table striped bordered hover style={{ width: '1300px' }}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {!categories ? (
                  <h1>Loading...</h1>
                ) : (
                  categories.map((category, index) => {
                    return <TableRowCategories category={category} index={index} key={category.id} />;
                  })
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* modal add category */}
      <div className="modal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Category </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                addCategory(userFormInput);
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={userFormInput.name} name="name" onChange={inputHandler} />
              </Form.Group>
              <div style={{ float: 'right' }}>
                <Button variant="secondary" className="mx-2" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Categories;
