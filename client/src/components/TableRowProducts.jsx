/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleDeleteProduct } from '../../store/actions/actionCreator';

export default function TableRowProducts({ product, index }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const deleteProduct = () => {
    dispatch(handleDeleteProduct(product.id))
      .then(() => {
        console.log('delete product success!');
      })
      .catch((error) => {
        setError(error);
      });
  };

  const rupiahFormat = (number) => {
    const result = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
    return result;
  };

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{product.name}</td>
        <td>{product.Category.name}</td>
        <td>{rupiahFormat(product.price)}</td>
        <td>{product.User.username}</td>
        <td>
          <img src={product.mainImg} style={{ width: '100px' }} />
        </td>
        <td>
          <Button type="button" onClick={handleShow}>
            Show
          </Button>
        </td>
        <td>
          <Button
            type="button"
            className="mx-2"
            onClick={() => {
              navigate(`/detail/${product.id}`);
            }}
          >
            Edit
          </Button>
          <Button type="button" className="btn btn-danger" onClick={deleteProduct}>
            Delete
          </Button>
        </td>
      </tr>

      <div className="modal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{product.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {product.Images.map((e, index) => {
              return <img src={e.imgUrl} style={{ width: '200px', height: '300px' }} key={index} />;
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
