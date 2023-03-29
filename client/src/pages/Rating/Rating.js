import React, { useEffect, useState } from "react";
import Rating from "react-rating-stars-component";
import img from "../../assets/img/faces/joe-gardner-2.jpg";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Row,
  Col,
  CardSubtitle,
  Container,
  Alert,
} from "reactstrap";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/users/users.selectors";

const THERAPIST = gql`
  query User($id: ID!) {
    user(ID: $id) {
      email
      name
      profileImage
      therapist {
        dateOfBirth
        description
        specialties
      }
    }
  }
`;
const CHECK_RATE = gql`
  query Query($patient: ID!, $therapist: ID!) {
    checkRate(patient: $patient, therapist: $therapist)
  }
`;
const MAKE_RATE_THERAPIST = gql`
  mutation MakeRating($patient: ID!, $rating: Float, $therapist: ID!) {
    makeRating(patient: $patient, rating: $rating, therapist: $therapist)
  }
`;
const RatingCard = () => {
  const user = useSelector(selectUser);
  let id = useParams("id").id;
  const [isRated, setIsRated] = useState(false);
  const [rating, setRating] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const {
    loading: ratingLoading,
    error: ratingError,
    data: ratingData,
  } = useQuery(CHECK_RATE, {
    variables: {
      therapist: id,
      patient: user.id,
    },
  });

  const {
    loading: therapistLoading,
    error: therapistError,
    data: therapistData,
  } = useQuery(THERAPIST, {
    variables: {
      id,
    },
  });

  const [makeRate, { loadingR, errorR, dataR }] =
    useMutation(MAKE_RATE_THERAPIST);

  const handleSubmit = async (event) => {
    event.preventDefault();
    makeRate({
      variables: {
        patient: user.id,
        therapist: id,
        rating,
      },
    });
    setIsRated(true);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };
  const [name, setName] = useState(therapistData?.user?.name);
  const [specialties, setSpecialities] = useState(
    therapistData?.user?.therapist?.specialties
  );
  const [profileImage, setProfileImage] = useState(
    therapistData?.user?.profileImage
  );
  useEffect(() => {
    if (!therapistLoading && !therapistError && therapistData) {
      setName(therapistData?.user?.name);
      setProfileImage(therapistData?.user?.profileImage);
      setSpecialities(therapistData.user.therapist.specialties);
    }
    if (
      !ratingLoading &&
      !ratingError &&
      ratingData &&
      ratingData.checkRate > 0
    ) {
      console.log("hello");
      setRating(ratingData.checkRate);
      setIsRated(true);
    }
    setIsMounted(true);
  }, [
    therapistLoading,
    therapistError,
    therapistData,
    ratingLoading,
    ratingError,
    ratingData,
  ]);
  if (therapistLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("../../assets/img/daniel-olahh.jpg") + ")",
        }}
        className="page-header"
        data-parallax={true}
      >
        <Container>
          <div className=" text-center m-2 " style={{ color: "white" }}>
            <h3> Let's Rate </h3>
          </div>
          <Card>
            <Row noGutters>
              <Col md={4}>
                <CardImg top src={profileImage} />
              </Col>
              <Col md={8}>
                <CardBody>
                  <CardTitle className="mb-3">
                    <h3>Dr. {name}</h3>
                  </CardTitle>
                  <CardSubtitle className="mb-3 text-muted">
                    Speciality :
                    {specialties?.map((s) => (
                      <span>{s}, </span>
                    ))}
                  </CardSubtitle>
                  <CardText>
                    {therapistData
                      ? therapistData.user.therapist.description
                      : "no description"}
                  </CardText>
                  <div className="d-flex align-items-center">
                    {isMounted && (
                      <Rating
                        count={5}
                        size={30}
                        activeColor="#ffd700"
                        value={rating}
                        edit={!isRated}
                        onChange={setRating}
                      />
                    )}
                    <Button
                      onClick={handleSubmit}
                      disabled={isRated}
                      className="ml-3 btn-primary"
                    >
                      {isRated ? "Rated" : "Rate"}
                    </Button>
                    {alertVisible && (
                      <Alert color="success" style={{ margin: "15px" }}>
                        Rating successfully!
                      </Alert>
                    )}
                  </div>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default RatingCard;
