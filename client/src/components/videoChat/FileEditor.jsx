import styles from './videoChat.module.scss';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, Col, Label, Input, Alert, Container, UncontrolledAlert } from 'reactstrap';
import { useMutation, useQuery } from '@apollo/client';
import { selectUser } from "../../store/users/users.selectors";
import { useSelector } from "react-redux";
import React, { Fragment, useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { GET_FILE } from "../../apis/patientsFiles";
import { UPDATE_PATIENT_FILE_MUTATION } from "../../apis/patientsFiles";


function FileEditor(props) {
    const [note, setNote] = useState('');
    const [title, setTitle] = useState('');

    const [alert, setAlert] = useState(false);

    const [edit, setEdit] = useState(false);

    const [updatePatientFile, { datae, loadinge, errore }] = useMutation(UPDATE_PATIENT_FILE_MUTATION);
    const { data: data1, loading: loading1, error1, refetch: refetch1 } = useQuery(GET_FILE, {
        variables: { id: props.clickedFileId }
    });

    const submit = async () => {
        try {


            await updatePatientFile({
                variables: {
                    id: props.clickedFileId ,
                    remarks: note,
                    title: title
                },
            });       

            setAlert(true)
            refetch1();
            props.refetch();


        } catch (error) {
            console.log(error);
        }
    };

    function editfile() {
        console.log("data:", data1)
        setNote(data1.getPatientFile.remarks);
        setTitle(data1.getPatientFile.title);


    }
    useEffect(() => {
        if (data1)
            editfile();

    }, [data1]);
    useEffect(()=>
    {
        if (props.toggled==="new"){
        setNote("");
        setTitle(""); 
        }
        else {
            editfile()
        }
    },[props.toggled])

    if (loading1) return <p>Loading...</p>;

    return (
        <div>
            <div className={styles.row}>
                <input placeholder="Title"
                    value={title} onChange={(t) => setTitle(t.target.value)}
                    className={styles.input}
                />
                <button className={styles.close_btn} onClick={() => {props.setEdit(false); props.setClickedFileId('');
}}>
                    <CgClose className={styles.icon} />

                </button>
            </div>
            <div className={styles.row}>

                <textarea
                    type="text"
                    value={note} onChange={(e) => setNote(e.target.value)}
                    placeholder=""
                    name="note"

                    className={styles.textarea} />


            </div>
            <button type="submit" className={styles.file_btn}  onClick={submit}>
                Update     </button>
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
                    <span>Updated successfully!</span>
                </Container>
            </Alert>

        </div>
    )
}

export default FileEditor;