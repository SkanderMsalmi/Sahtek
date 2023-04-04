import React from "react";
import { useParams } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Button, Container, Row, Col, Alert } from "reactstrap";

const GET_APPOINTMENT = gql`
query GetAppointment($id: ID!) {
    getAppointment(ID: $id) {
          therapist
          status
          date
    }
  }
`;

function AppointmentBooked() {
   //const { id } = useParams('id');
    // const { data, loading, error } = useQuery(GET_APPOINTMENT, {
    //     variables: {
    //         id: id
    //     }
    // });
  //   if (loading ) return <p>Loading...</p>;
  // if (error) return <p>Error </p>;
  return (
    <div
      className="section section-image  "
      style={{ height: "100vh", paddingTop: "250px" }}
    >
      <div className="section">
        <Container className="text-center bg-light ">
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className=" text-danger mb-5">
              {/* <div  className="section-appo"
           style={{
           backgroundImage:
          "url(" + require("../../assets/img/appOk.png") + ")",
           }}></div> */}
           <img style={{ height: "20vh", width:"20vh"} } src="https://cdn.icon-icons.com/icons2/1494/PNG/512/appointment_102882.png" alt="" />
</h2>
              <p className="note mt-5">
                
                <br />
                <h2>Your appointment booked successfully!</h2><br/>
                {/* status:
                {data.getAppointment.status} */}
              </p>
            </Col>

            <Row></Row>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default AppointmentBooked;
