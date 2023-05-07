import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Button, Input } from "reactstrap";

const GET_PRODUCT_BY_ID = gql`
  query Query($id: ID!) {
    getProduct(ID: $id) {
      category
      description
      id
      image
      name
      price
      stock
    }
  }
`;
export const ProductDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      id: "643c6a90175b4701bb6814b4",
    },
  });
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState("");
  useEffect(() => {
    if (data) {
      setProduct(data?.getProduct);
    }
  }, [data]);
  function handleQuantityChange(event) {
    setQuantity(Number(event.target.value));
  }
  function handleIncreaseQuantity() {
    setQuantity(quantity + 1);
  }

  function handleDecreaseQuantity() {
    setQuantity(quantity - 1);
  }
  function handleAddToCartClick() {
    // TODO: Implement adding to cart functionality
  }
  return (
    <div>
      <Row>
        <Col md={6}>
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
            style={{ height: "400px" }}
          />
        </Col>
        <Col md={6}>
          <div>
            <div className="me-2 d-flex  flex-column">
              <h2 className="me-3" style={{ color: "black" }}>
                {product.name}
              </h2>
              <h3
                className="me-3 text-gray"
                style={{ marginTop: "0", marginBottom: "1rem" }}
              >
                {product.category}
              </h3>
            </div>
            <div className="d-flex align-items-center my-5">
              <Button className="m-2" onClick={handleDecreaseQuantity}>
                -
              </Button>
              <Input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                min="1"
                max="10"
                onChange={handleQuantityChange}
                style={{ width: "70px" }}
              />
              <Button className="m-2" onClick={handleIncreaseQuantity}>
                +
              </Button>
            </div>
          </div>
          <Button
            color="primary"
            onClick={handleAddToCartClick}
            className="m-2"
          >
            Add to cart
          </Button>
          <Button
            color="primary"
            onClick={handleAddToCartClick}
            className="m-2"
          >
            Add to wishlist
          </Button>
        </Col>
      </Row>
      <hr className="my-4" />
      <p>
        <strong style={{ fontSize: "1.6rem" }}>Description:</strong>
      </p>
      <p className="mb-0">{product.description}</p>
    </div>
  );
};
