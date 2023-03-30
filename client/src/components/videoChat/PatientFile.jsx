import { useMutation } from '@apollo/client';
import React, { Fragment, useState } from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, Col, Label, Input, Alert, Container, UncontrolledAlert } from 'reactstrap';
import {
    GET_PATIENT_FILE,
    CREATE_PATIENT_FILE_MUTATION,
} from "../../apis/patientFile";
import styles from './videoChat.module.scss';

import { CgClose } from 'react-icons/cg';



function PatientFile({ show, handleClick }) {

    const [createPatientFile, { loading, error, data }] = useMutation(
        CREATE_PATIENT_FILE_MUTATION
    );

    const [toggled, setToggled] = useState("new")


    const [note, setNote] = useState('');
    const [alert, setAlert] = useState(false);



    const submit = () => {
        try {
            async function addfile() {
                await createPatientFile({
                    variables: {

                        remarks: note,
                        consultation: "640388d2fc5c68cb9ebcc1af"


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


    return (


        <Fragment>
            {show ? (
                <Col lg="4" md="12"    >



                    <div className={styles.patient_file_container}>

                        <div className="d-flex justify-content-between  align-items-center">
                            <div className={styles.row}>

                                {/* <button type="submit" className={styles.invisibleBtn} onClick={() => setToggled("new")}  >
                                    New     </button> */}
                                <h6>Add note</h6>

                            </div>
                            <div className={styles.row}>

                                <button className={styles.close_btn} onClick={() => handleClick(false)}>
                                    <CgClose className={styles.icon} />

                                </button>
                            </div>


                        </div>
                        {toggled == "new" ? (
                            <div>
                                <div className={styles.row}>

                                    <textarea
                                        type="text"
                                        value={note} onChange={(e) => setNote(e.target.value)}
                                        placeholder=". . ."
                                        name="note"

                                        className={styles.textarea} />


                                </div>
                                <button type="submit" className={styles.file_btn} onClick={submit} >
                                    Save     </button>
                                {/* {alert ? (
                                    <Alert color="success">
                                        Added successfully
                                    </Alert>
                                ) : null} */}

                            </div>

                        ) : null
                            // (


                            //     <div>
                            //         <div className={styles.card}>
                            //             <div className={styles.cardContent}>
                            //                 <div className={styles.cardHeader}>

                            //                     <h6>Date</h6>
                            //                 </div>
                            //                 <div className={styles.cardBody}>
                            //                     <p>Title</p>
                            //                 </div>
                            //             </div>
                            //         </div>

                            //     </div>

                            // )
                        }
                    </div>

                </Col>
            ) : null}
        </Fragment>

    );
};

export default PatientFile;