/* eslint-disable no-unused-vars */
import ProductsCard from '../components/ProductsCard';
import './HomePage.css';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import SideBar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../store/actions/actionCreator';
import Swal from 'sweetalert2';

function HomePage() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

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
          console.log('Fetch products success !');
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          Swal.close();
        });
    }
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-2" style={{ marginLeft: '50px' }}>
          <SideBar />
        </div>
        <div className="col-lg-9">
          <div className="container" style={{ marginTop: '50px' }}>
            <div className="row" id="productCard">
              <h1>View all</h1>
              <div className="filter" style={{ marginBottom: '30px' }}>
                <Dropdown as={NavItem} style={{ float: 'left', marginRight: '15px' }}>
                  <Dropdown.Toggle as={NavLink}>SORT BY</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Hello there!</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown as={NavItem} style={{ float: 'left', marginRight: '15px' }}>
                  <Dropdown.Toggle as={NavLink}>SIZE</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Hello there!</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown as={NavItem} style={{ float: 'left', marginRight: '15px' }}>
                  <Dropdown.Toggle as={NavLink}>COLOR</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Hello there!</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown as={NavItem} style={{ float: 'left', marginRight: '15px' }}>
                  <Dropdown.Toggle as={NavLink}>PRODUCT TYPE</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Hello there!</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown as={NavItem} style={{ float: 'left', marginRight: '15px' }}>
                  <Dropdown.Toggle as={NavLink}>STYLE</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Hello there!</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <>
                {products.map((product) => {
                  return <ProductsCard product={product} key={product.id} />;
                })}
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
