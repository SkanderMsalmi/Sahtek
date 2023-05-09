import React from "react";
import styles from './ChooseTherapist.module.scss'
import { useMutation, gql, useQuery } from "@apollo/client";
import Rating from "react-rating-stars-component";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  Card,
  CardGroup,
  CardBlock,
  CardFooter,
  CardTitle,
  CardImg,
  CardText,
  CardHeader,
} from 'react-bootstrap-card';
import { Button, CardBody, Col, Row } from "reactstrap";
import { Navigate } from "react-router-dom";

const USERS_QUERY = gql`
  query {
    users {
      id
      name
      profileImage
      therapist{
      languages
      ratings
      experience
      specialties
      availability{day,startTime,endTime}}
          }
  }
`;
function ChooseTherapist() {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(USERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;
  const handleButtonClick = (id) => {
    try {
      navigate(`/rdv/${id}`)
    } catch (error) {
      alert("!!!");
    }
  };
  return (
    <div class={`${styles.bloc}`}>
      <div className="d-flex justify-content-center row">
        <div className="col-md-10">
          <div className="rounded">
            <div className="table-responsive table-borderless"></div>

            <>
              <div class="row row-cols-1 row-cols-md-2 g-2">
                {data.users.map((item) => (
                  <>
                    {/* <div class="col">
                      <div class="card">
                        <img class="card-img-top" alt="..."
                          className="img-circle img-no-padding img-responsive"
                          style={{ width: "8.5rem", height: "8.5rem" }} variant="top" src={item.profileImage} />
                        <div class="card-body">
                          <h5 class="card-title">DR.{item.name}</h5>
                          <Rating

                            defaultValue={1}
                            size={30}
                            activeColor="#ffd700"
                            value={item.therapist.ratings.lenght}
                          />
                          <p class="card-text">specialties: {item.therapist.specialties.map((spe, index) => {
                            // Return a new component for each item in the data array
                            return <p key={index}>{spe}</p>
                          })}</p>

                          <button class="btn btn-info" style={{ marginLeft: "200px" }} onClick={() => handleButtonClick(item.id)}>book appointment</button>
                        </div>
                      </div>
                    </div> */}

                    <Col lg="4" md="3">

                      <div class="card">
                        <div className="text-center  pt-4">
                          <img class="card-img-top" alt="..."
                            className="img-circle img-no-padding img-responsive "
                            style={{ width: "6rem", height: "6rem" }} variant="top" src={item.profileImage} />
                        </div>

                        <CardBody>
                          <CardTitle>DR.{item.name}</CardTitle>
                          <Rating
                                  edit={false}

                            defaultValue={1}
                            size={30}
                            activeColor="#ffd700"
                            value={item.therapist.ratings.length}
                          />
                          <CardText>
                            Specialties: {item.therapist.specialties.map((spe, index) => {
                              // Return a new component for each item in the data array
                              return <p key={index}>{spe}</p>
                            })}
                          </CardText>
                          <Button color="primary" onClick={() => handleButtonClick(item.id)}>Get appointment</Button>
                        </CardBody>
                      </div>
                    </Col>

                  </>

                ))}
              </div>
             
            </>
          </div></div></div></div>
  );
}
export default ChooseTherapist