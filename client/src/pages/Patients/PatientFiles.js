import { selectUser } from "../../store/users/users.selectors";
import { useSelector } from "react-redux";
 import { useQuery} from "@apollo/client";
import React from "react";
import { useParams,useNavigate } from "react-router-dom";
 
import {
    Button,
    
    FormGroup,
    Input,
    
    Container,
    Row,
    Col,
   
} from "reactstrap";
import { GET_PATIENT_FILES } from "../../apis/patientsFiles";


function PatientFiles(){
    const user = useSelector(selectUser);
    const patientid = useParams("patientid");

    //let { id } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useQuery(GET_PATIENT_FILES, {
      variables: {  id : patientid.patientid }
    });

    if (loading) return <p>Loading...</p>;
    return (
        <>
            <div className="section section-dark text-center">

            </div>
            <div className="section profile-content">
                <Container >

                    <br />
                    <Row className="d-flex justify-content-center align-items-center ">

                        <Col lg="7" md="6">

                            <h3>Patient Files</h3>

                        </Col>
                        <Col lg="3" md="6">
                            <FormGroup className="has-success">
                                <Input
                                    className="form-control-success"
                                    placeholder="Search"
                                    id="inputSuccess1"
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                    </Row>



                    <Row className="d-flex justify-content-center ">
                        <Col lg="10" md="6">
                        

                            <hr />
                            <ul className="list-unstyled follows">
                                {data.getFilesByPatient.map((p) => {
                                    return (
                                        <>
                                            <li>
                                                <Row >
 
                                                    <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                                                        <h6  >
                                                        {p.remarks} <br />
                                                            <small>{p.patient.email}</small>
                                                        </h6>
                                                    </Col>
                                                    <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                                                        <h6>{p.createdAt}</h6>
                                                    </Col>
                                                      </Row>
                                            </li>
                                            <hr />
                                        </>
                                    )
                                })}

                            </ul>
                        </Col>
                    </Row>


                </Container>
            </div>
        </>
        
    )
}
 

export default PatientFiles;