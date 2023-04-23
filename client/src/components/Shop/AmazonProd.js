import React, { useEffect } from "react";
import Rating from "react-rating-stars-component";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";

import "./CardProduct.scss";
function AmazonProd({ product }) {
  const [title, description] = product.product.split(":");
  return (
    <Card className="card-product">
      <div className="card-product-image-wrapper">
        <CardImg top width="100%" style={{ height: "15rem" }} src={product.image} alt={product.name} />
        {/* <div className="like-icon" onClick={toggleLike}>
          <i
            className={`${likeClass} fa-heart`}
            style={{ color: "red", fontSize: "24px" }}
          ></i>
        </div> */}
      </div>
      <CardBody>
        <CardTitle className="h5" title={title}>{title}</CardTitle>
        <CardText>{description}</CardText>

        <CardText>  <div style={{ display: "-webkit-inline-box" }}> <Rating
          count={5}
          size={30}
          activeColor="#ffd700"
          isHalf={true}
          value={Math.round(product.rating.split(' ')[0] * 2) / 2}
          edit={false}
        /><small>{product.rating.split(' ')[0].split('.')[1] === '0' ? product.rating.split(' ')[0].split('.')[0] : product.rating.split(' ')[0]}/5</small></div><br /><small> ({product.ratingCount} ratings)</small></CardText>
        <Row>
          <Col xs={6} className="price">
            ${product.price}
          </Col>
          <Col xs={6} className="text-right">

          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default AmazonProd;
