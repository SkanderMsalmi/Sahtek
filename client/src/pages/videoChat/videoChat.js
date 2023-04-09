import { Button, Container, Row, Col } from "reactstrap";
import PatientFile from '../../components/videoChat/PatientFile';
import React, { useContext, useState } from 'react';
import { MdCallEnd } from 'react-icons/md';
import { MdVideocam } from 'react-icons/md';
import { MdVideocamOff } from 'react-icons/md';
import { IoMdMic } from 'react-icons/io';
import { IoMdMicOff } from 'react-icons/io';
import styles from './../../components/videoChat/videoChat.module.scss';
import { CgNotes } from 'react-icons/cg';
import { SocketContext } from "../../apis/socketContext";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/users/users.selectors";
import { useNavigate } from "react-router-dom";

const VideoChat = ({ children }) => {
    const user = useSelector(selectUser);

    const [show, setShow] = useState(false);
    const [micro, setMicro] = useState(true);
    const [cam, setCam] = useState(true);
    const navigate = useNavigate();

    const { socket, setIsVideo, started } = useContext(SocketContext);
    const handleVideoToggle = () => {
        setIsVideo(!cam);
        socket.emit("toggle-video", { isVideoOn: !cam, emailId: user.email });

    }
    const handleAudioToggle = () => {
        socket.emit("toggle-audio", { isAudioOn: !micro, emailId: user.email });
    }
    const handleHangUp = () => {
        socket.emit("hang-up");
        navigate('/')
    }
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





                    {started && <Row>
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
                                            onClick={() => { handleVideoToggle(); setCam(!cam); }}
                                        >
                                            <MdVideocam className={styles.icon} />
                                        </Button>
                                    ) : (<Button
                                        className="btn-round ml-2"
                                        color="danger"

                                        target="_blank"
                                        onClick={() => { handleVideoToggle(); setCam(!cam); }}
                                    >
                                        <MdVideocamOff className={styles.icon} />
                                    </Button>)}




                                    {micro ? (
                                        <Button
                                            className="btn-round ml-2"
                                            color="info"
                                            outline
                                            target="_blank"
                                            onClick={() => { handleAudioToggle(); setMicro(false) }}

                                        >
                                            <IoMdMic className={styles.icon} />
                                        </Button>
                                    ) : (
                                        <Button
                                            className="btn-round ml-2"
                                            color="danger"

                                            target="_blank"
                                            onClick={() => { handleAudioToggle(); setMicro(true) }}

                                        >
                                            <IoMdMicOff className={styles.icon} />
                                        </Button>)}



                                    <Button
                                        className="btn-round ml-2"
                                        color="danger"
                                        target="_blank"
                                        onClick={() => handleHangUp()}
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
                    </Row>}
                </Container>
            </div>{" "}
        </>
    );
};

export default VideoChat;