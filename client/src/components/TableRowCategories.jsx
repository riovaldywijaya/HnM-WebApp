/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/esm/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailCategory, handleDeleteCategory, updateCategory } from '../../store/actions/actionCreator';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';

export default function TableRowCategories({ category, index }) {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const categoryDetail = useSelector((state) => {
    return state.categoryReducer.category;
  });

  const [userFormInput, setUserFormInput] = useState({
    name: categoryDetail.name,
  });

  const inputHandler = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    setUserFormInput({
      ...userFormInput,
      [field]: value,
    });
  };

  const getDetailCategory = () => {
    dispatch(fetchDetailCategory(category.id))
      .then((result) => {
        // console.log(result, 'aaaaaaaaaaaaaaaa');
        console.log('fetch category success!');
        setUserFormInput({ name: result.name });
      })
      .catch((error) => {
        setError(error);
      });
  };

  const deleteCategory = () => {
    dispatch(handleDeleteCategory(category.id))
      .then(() => {
        console.log('delete category success!');
      })
      .catch((error) => {
        setError(error);
      });
  };

  const clickEditCategory = (formData) => {
    dispatch(updateCategory({ formData, id: category.id }))
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        setError(error);
      });
  };

  function getDate(date) {
    return date.split('T')[0];
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    getDetailCategory();
    setShow(true);
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{category.name}</td>
        <td>{getDate(category.createdAt)}</td>
        <td>{getDate(category.updatedAt)}</td>
        <td>
          <Button style={{ marginRight: '5px' }} type="button" className="btn btn-primary" onClick={handleShow}>
            Edit
          </Button>
          <Button type="button" className="btn btn-danger" onClick={deleteCategory}>
            Delete
          </Button>
        </td>
      </tr>

      {/* modal add category */}
      <div className="modal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Category </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                clickEditCategory(userFormInput);
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
