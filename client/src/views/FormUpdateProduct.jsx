/* eslint-disable no-unused-vars */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailProduct, updateProduct } from '../../store/actions/actionCreator';
import Swal from 'sweetalert2';

function FormUpdateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const detailProduct = useSelector((state) => {
  //   return state.productReducer.product;
  // });

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

  useEffect(() => {
    Swal.fire({
      title: 'Uploading...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    dispatch(fetchDetailProduct(id))
      .then((result) => {
        // console.log(data, '<<<<<<< ini data loh');
        setUserFormInput({
          name: result.product.name,
          description: result.product.description,
          price: result.product.price,
          categoryId: result.product.categoryId,
          mainImg: result.product.mainImg,
          imgUrl1: result.product.Images[0].imgUrl,
          imgUrl2: result.product.Images[1].imgUrl,
          imgUrl3: result.product.Images[2].imgUrl,
          imgUrl4: result.product.Images[3].imgUrl,
          imgUrl5: result.product.Images[4].imgUrl,
        });
        console.log('fetch detail product success!');
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        Swal.close();
      });
  }, []);

  const inputHandler = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    setUserFormInput({
      ...userFormInput,
      [field]: value,
    });
  };

  const submitUpdate = (formData) => {
    dispatch(updateProduct({ formData, id }))
      .then(() => {
        console.log('update product success!');
        navigate('/');
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <>
      <div className="container" style={{ marginTop: '100px' }}>
        <h2 className="text-center" style={{ fontWeight: 'bold' }}>
          Update Product
        </h2>
        <br />
        <br />
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                submitUpdate(userFormInput);
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
                  <option disabled value="">
                    --Select--
                  </option>
                  <option value="1" selected={userFormInput.categoryId == 1 ? 'true' : 'false'}>
                    Hoodies & Sweatshirt
                  </option>
                  <option value="2" selected={userFormInput.categoryId == 2 ? 'true' : 'false'}>
                    Trousers
                  </option>
                  <option value="3" selected={userFormInput.categoryId == 3 ? 'true' : 'false'}>
                    Shirts
                  </option>
                  <option value="4" selected={userFormInput.categoryId == 4 ? 'true' : 'false'}>
                    Shorts
                  </option>
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
              <div>
                <Button style={{ width: '100%' }} variant="primary" type="submit">
                  Update
                </Button>
              </div>
            </Form>
          </div>
          <div className="col-lg-4"></div>
        </div>
      </div>
    </>
  );
}

export default FormUpdateProduct;
