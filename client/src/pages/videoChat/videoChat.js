import { Button, Container, Row, Col } from "reactstrap";
import VideoPlayer from '../../components/videoChat/VideoPlayer';
import PatientFile from '../../components/videoChat/PatientFile';
import React, { useState } from 'react';
import { MdCallEnd } from 'react-icons/md';
import { MdVideocam } from 'react-icons/md';
import { MdVideocamOff } from 'react-icons/md';
import { IoMdMic } from 'react-icons/io';
import { IoMdMicOff } from 'react-icons/io';
import styles from './../../components/videoChat/videoChat.module.scss';
import { CgNotes } from 'react-icons/cg';

const VideoChat = ({ children }) => {

    const [show, setShow] = useState(false);
    const [micro, setMicro] = useState(true);
    const [cam, setCam] = useState(true);


    const handleClick = val => {
        setShow(val)

    }
    return (
        <>
            <div className="section section-dark-gray">
                <Container>
                    <Row className={styles.video_row}>
                        {children}
                        <PatientFile show={show} handleClick={handleClick} />
                    </Row>





                    <Row>
                        <Col lg="12" md="12"  >

                            <div className={styles.option_row}>
                                <div>

                                </div>
                                <div >
                                    {cam ? (
                                        <Button
                                            className="btn-round ml-2"
                                            color="info"
                                            outline
                                            target="_blank"
                                            onClick={() => setCam(false)}
                                        >
                                            <MdVideocam className={styles.icon} />
                                        </Button>
                                    ) : (<Button
                                        className="btn-round ml-2"
                                        color="danger"

                                        target="_blank"
                                        onClick={() => setCam(true)}
                                    >
                                        <MdVideocamOff className={styles.icon} />
                                    </Button>)}




                                    {micro ? (
                                        <Button
                                            className="btn-round ml-2"
                                            color="info"
                                            outline
                                            target="_blank"
                                            onClick={() => setMicro(false)}

                                        >
                                            <IoMdMic className={styles.icon} />
                                        </Button>
                                    ) : (
                                        <Button
                                            className="btn-round ml-2"
                                            color="danger"

                                            target="_blank"
                                            onClick={() => setMicro(true)}

                                        >
                                            <IoMdMicOff className={styles.icon} />
                                        </Button>)}



                                    <Button
                                        className="btn-round ml-2"
                                        color="danger"
                                        target="_blank"
                                    >
                                        <MdCallEnd className={styles.icon} />
                                    </Button>
                                </div>

                                <div>
                                    <Button
                                        onClick={() => setShow(!show)}
                                        className="btn-round"
                                        color="info"
                                        outline
                                        target="_blank"
                                    >
                                        <CgNotes className={styles.icon} />
                                    </Button>
                                </div>
                            </div>





                        </Col>
                    </Row>
                </Container>
            </div>{" "}
        </>
    );
};

export default VideoChat;