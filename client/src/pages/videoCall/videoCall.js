import { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../../apis/socketContext";
import isVerified from "../../components/Guard/IsVerified";
import withAuth from "../../components/Guard/WithAuth";
import { selectUser } from "../../store/users/users.selectors";
import { useParams } from "react-router-dom";
import { PeerContext } from "../../apis/peerContext";
import ReactPlayer from "react-player";
import { Button, Row } from "reactstrap";
import VideoChat from "../videoChat/videoChat";
import styles from "./videoCall.module.scss";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
const GET_ROOM_QUERY = gql`
query GetAppointment($id: ID!) {
    getAppointment(ID: $id) {
      patient
      therapist
    }
  }
`;
function VideoCall() {
    const user = useSelector(selectUser);

    const [myStream, setMyStream] = useState(null);
    const [remoteEmail, setRemoteEmail] = useState("");
    const { id } = useParams();
    const { data, loading, error } = useQuery(GET_ROOM_QUERY, {
        variables: {
            id: id
        }
    });

    const [ready, setReady] = useState(false);
    const { peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream, setRemoteStream } = useContext(PeerContext);
    // const { name, me, callAccepted, myVideo, userVideo, callEnded, stream, leaveCall, call, callUser  } = useContext(SocketContext);
    const { socket, isVideo, setStarted } = useContext(SocketContext);
    useEffect(() => {
        if (myStream) {
            myStream.getVideoTracks()[0].enabled = isVideo;
        }
    }, [isVideo, remoteStream, myStream])
    const handleUserJoined = useCallback(async (emailId) => {

        console.log("userJoined", emailId)
        const offer = await createOffer(emailId);
        socket.emit('call-user', { emailId, offer })
        setRemoteEmail(emailId);
    }, [createOffer, socket])
    const handleIncommingCall = useCallback(async (data) => {

        const { from, offer } = data
        console.log("incomming call", from, offer)
        const ans = await createAnswer(offer);
        socket.emit('accepted-call', { emailId: from, ans });
        setRemoteEmail(from);

    }, [createAnswer, socket])

    const handleUserConnected = useCallback(async (emailId) => {

        setRemoteEmail(emailId);
    }, [])
    const handleCallAccepted = useCallback(async (data) => {

        const { ans } = data;
        console.log("call accepted", ans)
        await setRemoteAnswer(ans);


    }, [setRemoteAnswer])
    const getUserMediaStream = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setMyStream(stream);
    }, [])
    const handleVideoToggle = useCallback(async (data) => {
        const { isVideoOn } = data;
        remoteStream.getVideoTracks()[0].enabled = isVideoOn;
    }, [remoteStream])
    const handleAudioToggle = useCallback(async (data) => {
        const { isAudioOn } = data;
        remoteStream.getAudioTracks()[0].enabled = isAudioOn;
    }, [remoteStream])
    const handleHangUp = useCallback(async (data) => {
        setRemoteStream(null);
        setRemoteEmail("");
    }, [setRemoteStream])
    const handleDisconnect = useCallback(async (data) => {
        socket.emit("hang-up")
    }, [socket])
    useEffect(() => {
        socket.on("user-connected", handleUserJoined)
        socket.on("incomming-call", handleIncommingCall)
        socket.on("accepted-call", handleCallAccepted)
        socket.on("user-connected", handleUserConnected)
        socket.on("user-video", handleVideoToggle)
        socket.on("user-audio", handleAudioToggle)
        socket.on('hanged-up', handleHangUp)
        socket.on('disconnect', handleDisconnect)
        return () => {
            socket.off("user-connected", handleUserJoined)
            socket.off("incomming-call", handleIncommingCall)
            socket.off("accepted-call", handleCallAccepted)
            socket.off("user-connected", handleUserConnected)
            socket.off("user-video", handleVideoToggle)
            socket.off("user-audio", handleAudioToggle)
            socket.off('hanged-up', handleHangUp)
        }
    }, [handleUserJoined, handleIncommingCall, handleCallAccepted, handleVideoToggle, handleAudioToggle, handleDisconnect, handleHangUp, handleUserConnected, socket])

    useEffect(() => {
        socket.emit("joinroom", { roomId: id, emailId: user.email });
        return () => {
            socket.off("joinroom", { roomId: id, emailId: user.email })
        }
    }, [id, socket, user.email])
    useEffect(() => {
        getUserMediaStream();
    }, [getUserMediaStream, handleCallAccepted])
    const handleNegotiation = useCallback(async () => {
        const offer = await createOffer(remoteEmail);
        socket.emit("call-user", { emailId: remoteEmail, offer })
    }, [remoteEmail, socket, createOffer])
    useEffect(() => {
        peer.addEventListener('negotiationneeded', handleNegotiation);
        return () => {
            peer.removeEventListener('negotiationneeded', handleNegotiation);
        }
    }, [peer, handleNegotiation])
    if (loading) {
        return <VideoChat> <div className="spinner-border text-light" style={{ alignSelf: "center", marginLeft: "auto", marginRight: "auto" }}></div> </VideoChat>
    }
    if (error) {
        return <VideoChat> <h1 className="text-light" style={{ height: "fit-content", alignSelf: "center", marginLeft: "auto", marginRight: "auto" }}>Room does not exist</h1> </VideoChat>
    }
    if (user.id !== data.getAppointment.patient && user.id !== data.getAppointment.therapist) {
        return <VideoChat> <h1 className="text-light" style={{ height: "fit-content", alignSelf: "center", marginLeft: "auto", marginRight: "auto" }}>You are not a part of this room</h1> </VideoChat>
    }
    return (
        <VideoChat>
            {/* <div >
                {(!callAccepted || callEnded) && <h1>{me || "null"}</h1>
                }
                {stream && <video playsInline muted ref={myVideo} autoPlay style={(callAccepted && !callEnded) ? { position: "absolute", left: "1rem", zIndex: "2", height: "20%" } : {}} />}

                {callAccepted && !callEnded && <>

                    <video playsInline ref={userVideo} autoPlay style={{ position: "absolute", inset: 1, height: "100%", width: "99%", zIndex: "-1" }} />
                </>}
            </div>
            <div style={{ position: "absolute", bottom: "1rem", left: "50%", marginLeft: "-10rem" }}>
                <Options> <Notification /> </Options>            </div> */}
            {!ready && <Row style={{ display: "inline", width: "100%" }}>
                {(remoteEmail && !remoteStream) && <h4>You are connected to {remoteEmail}</h4>}
                {(!remoteEmail && !remoteStream) && <h4>Waiting for other user to join</h4>}
                {(remoteEmail && remoteStream) && <h4>{remoteEmail} is waiting for you to join</h4>}
                <Button onClick={(e) => { sendStream(myStream); setReady(true); setStarted(true) }}>Join Call</Button>
            </Row>}

            <br />
            {/* {remoteStream && <Button onClick={() => { socket.emit('toggle-video', { isVideoOn: true }) }}>Toggle Video</Button>} */}
            {myStream ? <ReactPlayer url={myStream} height={(remoteStream && ready) ? "20%" : ""} width={(remoteStream && ready) ? "15%" : ""} playing muted style={(remoteStream && ready) ? { position: "absolute", left: "1rem", zIndex: "2", height: "20%" } : { marginLeft: "20%" }} /> : <div className="spinner-border text-light" style={{ alignSelf: "center", marginLeft: "auto", marginRight: "auto" }}></div>}


            {(remoteStream && ready) && <ReactPlayer url={remoteStream} width="70vw" height="70vh" playing style={{ position: "absolute", inset: 1 }} className={styles.videoContainer} />}
        </VideoChat>


    )
}

export default withAuth(isVerified(VideoCall));