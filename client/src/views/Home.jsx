/* eslint-disable no-unused-vars */
import Table from 'react-bootstrap/Table';
import TableRowProducts from '../components/TableRowProducts';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, fetchProducts } from '../../store/actions/actionCreator';
import Swal from 'sweetalert2';

function Home() {
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [userFormInput, setUserFormInput] = useState({
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
    mainImg: '',
    imgUrl1: '',
    imgUrl2: '',
    imgUrl3: '',
    imgUrl4: '',
    imgUrl5: '',
  });
  const products = useSelector((state) => {
    // console.log(state, '<<<<<<<<<< ini state');
    return state.productReducer.products;
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!products.length) {
      Swal.fire({
        title: 'Uploading...',
        html: 'Please wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      dispatch(fetchProducts())
        .then(() => {
          console.log('fetch products success!');
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

  const addProduct = (formData) => {
    dispatch(createProduct(formData))
      .then(() => {
        handleClose();
        setUserFormInput({
          name: '',
          description: '',
          price: 0,
          categoryId: 0,
          mainImg: '',
          imgUrl1: '',
          imgUrl2: '',
          imgUrl3: '',
          imgUrl4: '',
          imgUrl5: '',
        });
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <div className="container" style={{ marginTop: '30px' }}>
        <div className="text-center mb-4">
          <h1>PRODUCT LIST</h1>
          <Button variant="primary" onClick={handleShow}>
            + Add Product
          </Button>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <Table striped bordered hover style={{ width: '1300px' }}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Created By</th>
                  <th>Main Image</th>
                  <th>Images</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {!products ? (
                  <h1>Loading...</h1>
                ) : (
                  products.map((product, index) => {
                    return <TableRowProducts product={product} index={index} key={product.id} />;
                  })
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* modal add product */}
      <div className="modal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Product </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                addProduct(userFormInput);
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={userFormInput.name} name="name" onChange={inputHandler} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={userFormInput.description} name="description" onChange={inputHandler} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" value={userFormInput.price} name="price" onChange={inputHandler} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select name="categoryId" onChange={inputHandler}>
                  <option disabled selected>
                    --Select--
                  </option>
                  <option value="1">Hoodies & Sweatshirt</option>
                  <option value="2">Trousers</option>
                  <option value="3">Shirts</option>
                  <option value="4">Shorts</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Main Image</Form.Label>
                <Form.Control type="text" value={userFormInput.mainImg} name="mainImg" onChange={inputHandler} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Additional Image</Form.Label>
                <Form.Control type="text" value={userFormInput.imgUrl1} name="imgUrl1" onChange={inputHandler} style={{ marginBottom: '5px' }} />
                <Form.Control type="text" value={userFormInput.imgUrl2} name="imgUrl2" onChange={inputHandler} style={{ marginBottom: '5px' }} />
                <Form.Control type="text" value={userFormInput.imgUrl3} name="imgUrl3" onChange={inputHandler} style={{ marginBottom: '5px' }} />
                <Form.Control type="text" value={userFormInput.imgUrl4} name="imgUrl4" onChange={inputHandler} style={{ marginBottom: '5px' }} />
                <Form.Control type="text" value={userFormInput.imgUrl5} name="imgUrl5" onChange={inputHandler} style={{ marginBottom: '5px' }} />
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

export default Home;
