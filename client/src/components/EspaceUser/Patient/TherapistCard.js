import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";

function TherapistCard(props) {
  const navigate = useNavigate();
  const { name, image, description, id } = props;
  return (
    <div style={{ width: "20rem" }}>
      <Card>
        <CardImg
          top
          src={image}
          alt={`${name} profile`}
          style={{ height: "300px", width: "100%", objectFit: "cover" }}
        />
        <CardBody>
          <CardTitle style={{ fontSize: "2rem" }}>Dr. {name}</CardTitle>
          <CardText>Description : {description}</CardText>
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
    </div>
  );
}

export default TherapistCard;
