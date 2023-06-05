import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Col,
} from "reactstrap";

function TherapistCard(props) {
  const navigate = useNavigate();
  const { name, image, description, id } = props;
  return (
    <Col lg="4">
   
      <Card style={{ width: "100%" }}>
        <CardImg
          top
          src={image}
          alt={`${name} profile`}
          style={{ height: "200px", width: "100%", objectFit: "cover" }}
        />
        <CardBody>
          <CardTitle style={{ fontSize: "1.5rem" }}>Dr. {name}</CardTitle>
          <CardText>{description}</CardText>
          <div className="d-flex justify-content-between">
            <Button
              className="mr-2"
              color="primary"
              onClick={(e) => navigate(`/rating/${id}`)}
            >
              Rate Therapist
            </Button>
            <Button
              color="secondary"
              onClick={(e) => navigate(`/feedback/${id}`)}
            >
              Give Feedback
            </Button>
          </div>
        </CardBody>
      </Card>
 </Col>
 
  );
}

export default TherapistCard;
