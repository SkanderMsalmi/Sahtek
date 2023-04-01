import { selectUser } from "../../store/users/users.selectors";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
    Button,

    FormGroup,
    Input,

    Container,
    Row,
    Col,
    Modal,

} from "reactstrap";
import { GET_PATIENT_FILES } from "../../apis/patientsFiles";
import { DELETE_PATIENT_FILE_MUTATION } from "../../apis/patientsFiles";



function PatientFiles() {
    const user = useSelector(selectUser);
    const patientid = useParams("patientid");
    //let { id } = useParams();
    const [modal, setModal] = React.useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };
    const { data, loading, error, refetch } = useQuery(GET_PATIENT_FILES, {
        variables: { id: patientid.patientid }
    });

    const [deletePatientFile, { datad, loadingd, errord }] = useMutation(DELETE_PATIENT_FILE_MUTATION);

    const deleteFile = async (fileId) => {

        await deletePatientFile({
            variables: {
                id: fileId,
            },
        });
        refetch();
        setModal(!modal);


    }


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
                            <FormGroup>
                                <Input placeholder="Search" type="text" />
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
                                                <Row className="d-flex justify-content-center align-items-center ">

                                                    <Col className="ml-auto mr-auto" lg="4" md="4" xs="4">
                                                        <h6  >
                                                            {p.title} <br />
                                                            <p>{p.remarks}</p>
                                                        </h6>
                                                    </Col>
                                                    <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                                                        <h6>{p.createdAt}</h6>
                                                    </Col>
                                                    <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                                                        <Row>


                                                            <Link to={`/patient/${p.id}/files`} className=" mr-auto" ><Button outline color="info" size="sm" >Edit</Button></Link>

                                                            <Button outline color="danger" size="sm" onClick={toggleModal}>Delete</Button>

                                                        </Row>


                                                    </Col>
                                                    <Col md="6">

                                                        {/* Modal */}
                                                        <Modal isOpen={modal} toggle={toggleModal}>
                                                            <div className="modal-header">
                                                                <button
                                                                    aria-label="Close"
                                                                    className="close"
                                                                    type="button"
                                                                    onClick={toggleModal}
                                                                >
                                                                    <span aria-hidden={true}>×</span>
                                                                </button>
                                                                <h5
                                                                    className="modal-title text-center"
                                                                    id="exampleModalLabel"
                                                                >
                                                                    Delete patient file
                                                                </h5>
                                                            </div>
                                                            <div className="modal-body">
                                                                Are you sure you want to delete this file?
                                                            </div>
                                                            <div className="modal-footer">
                                                                <div >
                                                                    <Button
                                                                        className="btn-link"
                                                                        color="default"
                                                                        type="button"
                                                                        onClick={toggleModal}
                                                                    >
                                                                        Cancel
                                                                    </Button>
                                                                </div>

                                                                <div  >
                                                                    <Button className="btn-link" color="danger" type="button" onClick={() => deleteFile(p.id)}>
                                                                        Delete
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </Modal>
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