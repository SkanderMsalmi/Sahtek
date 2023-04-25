import { selectUser } from "../../store/users/users.selectors";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
    Button,

    FormGroup,
    Input,

    Container,
    Row,
    Col,

} from "reactstrap";
import { GET_PATIENTS } from "../../apis/users";

// import PatientList from "../../components/Patients/PatientList";

function Patients() {
    const user = useSelector(selectUser);
    let { id } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useQuery(GET_PATIENTS, {
        variables: { id: id ? id : user.id }
    });

    if (loading) return <p>Loading...</p>;


    return (
        <>
            <div className="section   text-center">

            </div>
            <div className="section profile-content">
                <Container >

                    <br />
                    <Row className="d-flex justify-content-center align-items-center ">

                        <Col lg="7" md="6">

                            <h3>All Patients</h3>

                        </Col>
                        <Col lg="3" md="6">
                        <FormGroup>
                                <Input placeholder="Search" type="text" />
                            </FormGroup>
                        </Col>
                    </Row>



                    <Row className="d-flex justify-content-center  ">
                        <Col lg="10" md="6">


                            <hr />
                            <ul className="list-unstyled follows">
                                {data.getPatientsByTherapist.map((p) => {
                                    return (
                                        <>
                                            <li>
                                                <Row  className="d-flex justify-content-center align-items-center ">
                                                    <Col className="avatar">
                                                        <img
                                                            alt="..."
                                                            className="img-circle img-no-padding img-responsive"
                                                            style={{ width: "70px", height: "70px" }}
                                                            src={p.profileImage}
                                                        />
                                                    </Col>
                                                    <Col className="ml-auto mr-auto" lg="8" md="4" xs="4">
                                                        <h6  >
                                                            {p.name} <br />
                                                            <small>{p.email}</small>
                                                        </h6>
                                                    </Col>
                                                   
                                                    <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                                                    <Link to={`/espace-therapist/${p.id}/files`}>Files</Link>
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

export default Patients;