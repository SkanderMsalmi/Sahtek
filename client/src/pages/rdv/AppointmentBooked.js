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
            <h5 style={{color:'green'}}>You successfully created your booking!</h5>
            <p className="note mt-5">
            as soon as your appointment is confirmed you will receive a confirmation email
              <br />
             <a href="*">back to home page</a>
            </p>
          </Col>

          <Row></Row>
        </Row>
      </Container>
    </div>
  </div>
//     <div
//       className="section section-image  "
//       style={{ height: "100vh", paddingTop: "250px" }}
//     >
//       <div className="section">
//         <Container className="text-center bg-light ">
//           <Row>
//             <Col className="ml-auto mr-auto text-center" md="8">
//               <h2 className=" text-danger mb-5">
//               {/* <div  className="section-appo"
//            style={{
//            backgroundImage:
//           "url(" + require("../../assets/img/appOk.png") + ")",
//            }}></div> */}
// <i class="bi bi-calendar4-event"></i>
// </h2>
//               <p className="note mt-5">
//               <i class="bi bi-calendar2-check"></i>
//                 <br />
//                 <h5>You successfully created your booking!</h5><br/>
//                 <p>as soon as your appointment is confirmed you will receive a confirmation email</p>
//                 {/* status:
//                 {data.getAppointment.status} */}
//               </p>
//             </Col>

//             <Row></Row>
//           </Row>
//         </Container>
//       </div>
//     </div>
  );
}
export default AppointmentBooked;
