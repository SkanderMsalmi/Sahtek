import React from "react";
import styles from './ChooseTherapist.module.scss'
import { useMutation, gql, useQuery } from "@apollo/client";
import Rating from "react-rating-stars-component";
import { useNavigate,useParams } from "react-router-dom";

import {
    Card,
    CardGroup,
    CardBlock,
    CardFooter,
    CardTitle,
    CardImg,
    CardText,
  } from 'react-bootstrap-card';
import { CardBody } from "reactstrap";
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
function ChooseTherapist(){
  const navigate = useNavigate();

    const { loading, error, data } = useQuery(USERS_QUERY);
    if (loading ) return <p>Loading...</p>;
    if (error) return <p>Error </p>;
    const handleButtonClick = (id) => {
      try {
        navigate(`/rdv/${id}`)
      } catch (error) {
        alert("!!!");
      }
    };
return(
    <div class={`${styles.bloc}`}>
        <div className="d-flex justify-content-center row">
            <div className="col-md-10">
                <div className="rounded">
                    <div className="table-responsive table-borderless"></div>
                        
                    <>
                    <div class="row row-cols-1 row-cols-md-3 g-4">
                    {data.users.map((item) => (
  <div class="col">
    <div class="card">
      <img  class="card-img-top" alt="..."
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

       <button class="btn btn-info" style={{marginLeft:"200px"}} onClick={() => handleButtonClick(item.id)}>book appointment</button> 
      </div>
    </div>
  </div>
  ))}
</div>
      {/* <Card style={{width: "20rem" }} className="row row-cols-1 row-cols-md-2 g-4">
        <CardImg alt="..."
                    className="img-circle img-no-padding img-responsive"
                    style={{ width: "8.5rem", height: "8.5rem" }} variant="top" src={item.profileImage}  />{console.log(item.profileImage)}{console.log(item)}
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          <Rating
                        
                        defaultValue={1} 
                        size={30}
                        activeColor="#ffd700"
                        value={item.therapist.ratings.lenght}
                      />
          <CardText>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </CardText>
        </CardBody>
        <CardFooter>
          <small className="text-muted">Last updated 3 mins ago</small>
        </CardFooter>
      </Card> */}
      </>
    </div></div></div></div>
);
}
export default ChooseTherapist