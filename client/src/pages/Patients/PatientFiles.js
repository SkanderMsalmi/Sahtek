import { selectUser } from "../../store/users/users.selectors";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from '../../components/videoChat/videoChat.module.scss';
import style from './Patient.module.scss';


import {
    Button,

    FormGroup,
    Input,

    Container,
    Row,
    Col,
    Modal,
    CardBody,
    Card,
    CardTitle,
    CardFooter, CardSubtitle, CardText, CardLink, Label

} from "reactstrap";
import { GET_PATIENT_FILES, GET_USER } from "../../apis/patientsFiles";
import { GET_FILE } from "../../apis/patientsFiles";

import { DELETE_PATIENT_FILE_MUTATION } from "../../apis/patientsFiles";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
    CREATE_PATIENT_FILE_MUTATION,
} from "../../apis/patientsFiles";

import { UPDATE_PATIENT_FILE_MUTATION } from "../../apis/patientsFiles";
import Loading from "../../components/loading";

function PatientFiles() {
    const therapist = useSelector(selectUser);
    const patientid = useParams("patientid");
    const [note, setNote] = useState('');
    const [title, setTitle] = useState('');
    const [edit, setEdit] = useState(false);
    const [clickedFileId, setClickedFileId] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    //let { id } = useParams();
    const [modal, setModal] = React.useState(false);

    const { data, loading, error, refetch } = useQuery(GET_PATIENT_FILES, {
        variables: { id: patientid.patientid, therapistId: therapist.id }
    });
    const { data: datau, loading: loadingu, erroru } = useQuery(GET_USER, {
        variables: { id: patientid.patientid }
    });
    const [createPatientFile, { dataa, errorr, loadingg }] = useMutation(
        CREATE_PATIENT_FILE_MUTATION
    );

    const { data: data1, loading: loading1, error1, refetch: refetch1 } = useQuery(GET_FILE, {
        variables: { id: clickedFileId }
    });


    const [deletePatientFile, { datad, loadingd, errord }] = useMutation(DELETE_PATIENT_FILE_MUTATION);
    const [updatePatientFile, { datae, loadinge, errore }] = useMutation(UPDATE_PATIENT_FILE_MUTATION);


    const toggleModal = (id) => {
        setClickedFileId(id);
        setModal(!modal);
    };
    function editfile(id) {
        if (id)
            setClickedFileId(id);
        setEdit(true);
        refetch1().then(() => {
            setNote(data1.getPatientFile.remarks);
            setTitle(data1.getPatientFile.title);
        }
        )
        //console.log(`File ${clickedFileId}  `);

    }



    function deleteFile() {

        deletePatientFile({
            variables: {
                id: clickedFileId,
            },
        }).then(() => {
           // console.log(`File ${clickedFileId} deleted successfully`);
            setClickedFileId('');
            setTitle('');
            setNote('');
            setModal(!modal);
            refetch();
            refetch1();
        })
            .catch(error => console.error(`Failed to delete file ${clickedFileId}`, error));


    };
    useEffect(() => {
        if (data1)
            editfile();

    }, [data1]);


    useEffect(() => {
        if (note!== null || note !== '')
            setAlertMessage('')

    }, [note]);





    const submit = () => {
        try {
            async function addfile() {
                if (edit === true) {
                    await updatePatientFile({
                        variables: {
                            id: clickedFileId,
                            remarks: note,
                            title: title
                        },
                    })
                        .then(() => {
                            setClickedFileId('');
                            setEdit(false);
                            setNote('');
                            setTitle('');


                        })
                        .catch(errore => setAlertMessage("Note field required!")
                        );



                } else {
                    await createPatientFile({
                        variables: {

                            remarks: note,
                            patient: patientid.patientid,
                            therapist: therapist.id,
                            title: title,

                        },
                    }).then(() => {
                        setNote('');
                        setTitle('');


                    })
                        .catch(errorr => setAlertMessage("Note field required!")
                        );



                }

                refetch();
                refetch1();



            }
            addfile();


        } catch (error) {
            console.log(error);
        }
    };


    if (loading || loadingu) return <Loading/>;


    return (
        <>

            <div className="section profile-content">



                <Row className="d-flex justify-content-center  " style={{ marginTop: "90px" }}>

                    <Col lg="12" md="6">

                        <h3>Patient Files</h3>

                    </Col>

                </Row>

                <Row className="d-flex justify-content-center ">

                    <Col lg="12" >
                        <hr />
                        <Row>
                            <Col lg="3" md="3" className={style.filesSide}>
                                {data?.getFilesByPatient?.map((p) => {
                                    return (
                                        <>

                                            <div className={styles.card} key={p.id} onClick={() => editfile(p.id)} style={{ cursor: "pointer" }}>
                                                <div className={styles.cardContent}>
                                                    <Col lg="8" md="8">
                                                        <div className={styles.cardHeader}>

                                                            <h6>{p.title}</h6>
                                                        </div>


                                                        <div className={styles.cardBody}>

                                                            <small>{p.createdAt}</small>

                                                        </div>
                                                    </Col>

                                                    <Col lg="4" md="4" xs="4">
                                                        <Row>
                                                            <FiEdit3 className={style.icon} onClick={() => editfile(p.id)} />


                                                            <RiDeleteBin6Line className={style.icon} onClick={() => toggleModal(p.id)} />

                                                        </Row>



                                                    </Col>
                                                    <Col md="6">

                                                        {/* Modal */}
                                                        <Modal isOpen={modal} toggle={toggleModal}  >
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
                                                                    <Button className="btn-link" color="danger" onClick={deleteFile}>
                                                                        Delete
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </Modal>
                                                    </Col>


                                                </div>
                                            </div>



                                        </>
                                    )
                                })}
                            </Col>

                            <Col lg="5" md="6" >

                                {(loading1) ? null : null}



                                <Card lg="12" md="12" >
                                    <CardBody >
                                        <CardTitle>
                                            <input placeholder="Title"
                                                className={style.input}
                                                value={title} onChange={(t) => setTitle(t.target.value)}


                                            />
                                        </CardTitle>

                                        <CardText>
                                        {alertMessage && <p style={{ color: "red", marginLeft: "2px", fontSize: "13px" }}>
                                                {alertMessage}
                                            </p>}
                                            <textarea
                                                type="text"
                                                className={style.textarea}
                                                value={note} onChange={(e) => setNote(e.target.value)}
                                                placeholder="Create note..."
                                                name="note"

                                            />
                                           

                                        </CardText>
                                        <div className="text-right">
                                            {edit ? (
                                                <>
                                                    <CardLink className={style.cardLink} onClick={() => { setEdit(false); setNote(''); setTitle('') ; setAlertMessage('')}}>Cancel</CardLink>
                                                    <CardLink className={style.cardLink} onClick={submit}>Update</CardLink>

                                                </>




                                            ) : (<CardLink className={style.cardLink} onClick={submit}>Save</CardLink>)}

                                        </div>


                                    </CardBody>
                                </Card>





                            </Col>

                            <Col lg="4" md="6">
                                <div className={style.graySection}>
                                    <Container>


                                        <Card className="card-profile card-plain">
                                            <div className="card-avatar">
                                               
                                                    <img
                                                        alt="..."
                                                        src={datau.user.profileImage}
                                                    />
                                               
                                            </div>
                                            <CardBody>
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <div className="author">
                                                        <CardTitle tag="h4">{datau?.user?.name}</CardTitle>
                                                    </div>
                                                </a>
                                                <Col >
                                                    <br />



                                                    <Row >
                                                        <Col md="5" className="text-left">
                                                            <h6>Date of birth</h6>
                                                        </Col>
                                                        <Col md="7" className="text-left">
                                                            <label>{new Date(datau?.user?.dateOfBirth * 1).getDate()}/{new Date(datau?.user?.dateOfBirth * 1).getMonth()}/{new Date(datau?.user?.dateOfBirth * 1).getFullYear()}</label>


                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="5" className="text-left">
                                                            <h6>E-mail</h6>
                                                        </Col>
                                                        <Col md="7" className="text-left">
                                                            <label>{datau?.user?.email}</label>


                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="5" className="text-left">
                                                            <h6>Phone</h6>
                                                        </Col>
                                                        <Col md="7" className="text-left">
                                                            <label>{datau?.user?.patient?.phoneNumber ? (
                                                                <p>--</p>
                                                            ) : (<p>--</p>)}</label>


                                                        </Col>
                                                    </Row>








                                                </Col>


                                            </CardBody>
                                            <CardFooter className="text-center">

                                            </CardFooter>
                                        </Card>

                                    </Container>
                                </div>
                            </Col>



                        </Row>


                    </Col>
                </Row>



            </div>
        </>

    )
}


export default PatientFiles;