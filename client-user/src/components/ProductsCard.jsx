/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';

function ProductsCard({ product }) {
  const navigate = useNavigate();
  function rupiahFormat(number) {
    const amount = `Rp${new Intl.NumberFormat('id-ID').format(number)}`;
    const result = amount.replace('.', ',');
    return result;
  }

  function clickImage(e) {
    e.preventDefault();
    navigate(`/products/${product.id}/${product.slug}`);
  }

  return (
    <div className="col-3">
      <Card style={{ border: '0px' }}>
        <Card.Img variant="top" src={product.mainImg} style={{ cursor: 'pointer' }} onClick={clickImage} />
        <Card.Body>
          <Card.Title>
            <p style={{ fontSize: '13px' }}>{product.name}</p>
          </Card.Title>
          <Card.Text>
            <p style={{ fontSize: '13px', marginTop: '-15px' }}>{rupiahFormat(product.price)}</p>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#222', float: 'left', marginRight: '3px' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#76a973', float: 'left', marginRight: '3px' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ddd', float: 'left', marginRight: '3px' }}></div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductsCard;
