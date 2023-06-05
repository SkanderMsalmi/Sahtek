import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { increment } from "../../store/shop/cartSlice";
import "./CardProduct.scss";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
function CardProduct({ product, isWishlist, onToggleWishlist, addToCart }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const dispatch = useDispatch();

  const toggleLike = (event) => {
    event.stopPropagation();
    onToggleWishlist(product.id);
  };
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setIsAddedToCart(true);
  };
  const handleCardClick = () => {
    navigate("product/" + product.id);
  };
  const likeClass = isWishlist ? "fas" : "far";
  return (
    <Card className="card-product" onClick={handleCardClick}>
      <div className="card-product-image-wrapper">
        <CardImg
          top
          width="100%"
          style={{ height: "15rem" }}
          src={product.image}
          alt={product.name}
        />
        <div className="like-icon" onClick={toggleLike}>
          <i
            className={`${likeClass} fa-heart`}
            style={{ color: "red", fontSize: "24px" }}
          ></i>
        </div>
      </div>
      <CardBody>
        <CardTitle className="h5">{product.name}</CardTitle>
        <CardText>{product.description}</CardText>
        <Row>
          <Col xs={6} className="price">
            ${product.price}
          </Col>
          <Col xs={6} className="text-right">
            <FaShoppingCart
              size={20}
              color={isAddedToCart ? "green" : "black"}
              onClick={handleAddToCart}
              style={{ margin: "0.6rem" }}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default CardProduct;
