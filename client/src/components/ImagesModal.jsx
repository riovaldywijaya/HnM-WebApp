/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';

export default function ImagesModal({ product, modal }) {
  return (
    <Modal>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {product.images[0].imgUrl.map((e) => {
          return <img src={e} style={{ width: '200px', height: '300px' }} key={e.id} />;
        })}
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}
