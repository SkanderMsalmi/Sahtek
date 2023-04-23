import React, { useEffect } from "react";

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

        <CardText>{product.rating}<br /><small> ({product.ratingCount} ratings)</small></CardText>
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
