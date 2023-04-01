import { useQuery, gql } from "@apollo/client";
import React from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
 
import {
    Button,
    
    FormGroup,
    Input,
    
    Container,
    Row,
    Col,
   
} from "reactstrap";
import { GET_PATIENTS_FILES } from "../../apis/patientsFiles";

 

function PatienList( {user} ) {
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("landing-page");
        return function cleanup() {
            document.body.classList.remove("landing-page");
        };
    });


    // const   { data, loading, error }  = useQuery(GET_PATIENTS_FILES);
    //   if (loading) return <p>Loading...</p>;
    let { id } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useQuery(GET_PATIENTS_FILES, {
      variables: {  id: id ? id : user.id }
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

                            <h3>All Patients</h3>

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
                                {data.getFilesByTherapist.map((p) => {
                                    return (
                                        <>
                                            <li>
                                                <Row >
 
                                                    <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                                                        <h6  >
                                                        {p.patient.name} <br />
                                                            <small>{p.patient.email}</small>
                                                        </h6>
                                                    </Col>
                                                    <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                                                        <h6>{p.createdAt}</h6>
                                                    </Col>
                                                    <Col>
                                                    <Button onClick={()=>{ navigate(`files/${p.patient.id}`);}}>Files</Button></Col>
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

export default PatienList;