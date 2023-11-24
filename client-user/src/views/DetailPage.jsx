/* eslint-disable no-unused-vars */
import Button from 'react-bootstrap/Button';
import './DetailPage.css';
import { BsHandbag, BsHeart } from 'react-icons/bs';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/actions/actionCreator';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';

function DetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  // const dataProduct = useSelector((state) => state.product);
  const [dataProduct, setDataProduct] = useState({
    Images: [],
    name: '',
    price: 0,
    description: '',
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
    dispatch(fetchProduct(id))
      .then((data) => {
        // console.log(data.product, '<<<<<<<<<<<<< data');
        setDataProduct({
          Images: data.product.Images,
          name: data.product.name,
          price: data.product.price,
          description: data.product.description,
        });
        console.log('fetch detail product success!');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        Swal.close();
      });
  }, []);

  function rupiahFormat(number) {
    const amount = `Rp${new Intl.NumberFormat('id-ID').format(number)}`;
    const result = amount.replace('.', ',');
    return result;
  }

  return (
    <>
      <div className="containerr">
        <div className="row">
          <div className="col-lg-8">
            {dataProduct.Images.map((image) => {
              return <img src={image.imgUrl} className="w-50" key={image.id} />;
            })}
          </div>

          <div className="col-lg-4">
            <h5 style={{ marginTop: '16px' }}>
              {dataProduct.name}
              <span style={{ float: 'right' }}>
                <BsHeart />
              </span>
            </h5>

            <h5 style={{ fontSize: '16px' }} id="priceDetail">
              {rupiahFormat(dataProduct.price)}
            </h5>
            <br />

            <p>{dataProduct.description}</p>

            <Form.Select aria-label="Default select example" style={{ fontSize: '13px', borderRadius: '0px' }}>
              <option disabled>Select Size</option>
              <option value="1">XS/S</option>
              <option value="2">S/S</option>
              <option value="3">M/S</option>
              <option value="3">L/S</option>
              <option value="3">XL/S</option>
              <option value="3">XXL/S</option>
            </Form.Select>
            <Button id="addButton" variant="primary" disabled type="submit">
              <BsHandbag style={{ marginRight: '8px', marginBottom: '3px' }} />
              <span style={{ fontSize: '13px' }}>ADD TO BAG</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailPage;
