import { useMutation, useQuery } from '@apollo/client';
import { selectUser } from "../../store/users/users.selectors";
import { useSelector } from "react-redux";
import React, { Fragment, useState } from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, Col, Label, Input, Alert, Container, UncontrolledAlert } from 'reactstrap';
import {
    GET_PATIENT_FILES,
    CREATE_PATIENT_FILE_MUTATION,
} from "../../apis/patientsFiles";
import styles from './videoChat.module.scss';

import { CgClose } from 'react-icons/cg';



function PatientFile({ show, handleClick }) {
    const therapist = useSelector(selectUser);

    const [createPatientFile, { dataa, errorr, loadingg }] = useMutation(
        CREATE_PATIENT_FILE_MUTATION
    );


    const [toggled, setToggled] = useState("new")


    const [note, setNote] = useState('');
    const [title, setTitle] = useState('');

    const [alert, setAlert] = useState(false);
    const [newBtn, setNewBtn] = useState(true);
    const [historyBtn, setHistoryBtn] = useState(false);

    const newClick = () => {
        if (newBtn === false) {
            setToggled("new"); setNewBtn(!newBtn); setHistoryBtn(!historyBtn)

        }

    }

    const historyClick = () => {
        if (historyBtn === false) {
            setToggled("history"); setNewBtn(!newBtn); setHistoryBtn(!historyBtn)

        }

    }



    const submit = () => {
        try {
            async function addfile() {
                await createPatientFile({
                    variables: {

                        remarks: note,
                        patient: "641072f723f7b3fae85b6690",
                        therapist: therapist.id,
                        title: title,

                    },
                });

                setNote('');
                setAlert(true)

            }
            addfile();


        } catch (error) {
            console.log(error);
        }
    };

    const { data, loading, error } = useQuery(GET_PATIENT_FILES, {
        variables: { id: '641072f723f7b3fae85b6690' }
    });
    if (loading) return <p>Loading...</p>;
    if (!data) return <p>No data found.</p>;

    return (


        <Fragment>
            {show ? (
                <Col lg="4" md="12" style={{ position: "absolute", right: "1rem" }}>



                    <div className={styles.patient_file_container}>

                        <div className="d-flex justify-content-between  align-items-center">

                            <div className={styles.row}>
                                {newBtn ?
                                    (
                                        <button type="submit" className={styles.menuBtnFocus} onClick={newClick}  >
                                            New     </button>
                                    ) : (

                                        <button type="submit" className={styles.menuBtn} onClick={newClick}  >
                                            New     </button>
                                    )}

                                {historyBtn ? (
                                    <button type="submit" className={styles.menuBtnFocus} onClick={historyClick}  >
                                        History     </button>
                                ) : (
                                    <button type="submit" className={styles.menuBtn} onClick={historyClick}  >
                                        History </button>
                                )}


                            </div>
                            <div className={styles.row}>

                                <button className={styles.close_btn} onClick={() => handleClick(false)}>
                                    <CgClose className={styles.icon} />

                                </button>
                            </div>


                        </div>
                        {toggled == "new" ? (
                            <div>

                                <input placeholder="Title"
                                    value={title} onChange={(t) => setTitle(t.target.value)}
                                    className={styles.input}
                                />

                                <div className={styles.row}>

                                    <textarea
                                        type="text"
                                        value={note} onChange={(e) => setNote(e.target.value)}
                                        placeholder=""
                                        name="note"

                                        className={styles.textarea} />


                                </div>
                                <button type="submit" className={styles.file_btn} onClick={submit} >
                                    Save     </button>
                                <Alert color="success" isOpen={alert}>
                                    <Container>
                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="alert"
                                            aria-label="Close"
                                            onClick={() => setAlert(false)}
                                        >
                                            <i className="nc-icon nc-simple-remove" />
                                        </button>
                                        <span>Added successfully!</span>
                                    </Container>
                                </Alert>

                            </div>

                        ) : toggled == "history" ?
                            (

                                data.getFilesByPatient.map((p) => {
                                    return (
                                        <>
                                            <div>
                                                <div className={styles.card}>
                                                    <div className={styles.cardContent}>
                                                        <div><div className={styles.cardHeader}>

                                                            <h6>{p.title}</h6>
                                                        </div>
                                                            <div className={styles.cardBody}>
                                                                <p>{p.createdAt}</p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>

                                        </>
                                    )
                                })



                            ) : (<div></div>)
                        }
                    </div>

                </Col>
            ) : null}
        </Fragment>

    );
};

export default PatientFile;