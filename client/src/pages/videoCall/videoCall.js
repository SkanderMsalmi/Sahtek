import { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../../apis/socketContext";
import isVerified from "../../components/Guard/IsVerified";
import withAuth from "../../components/Guard/WithAuth";
import Notification from "../../components/VideoCall/notification";
import Options from "../../components/VideoCall/options";
import { selectUser } from "../../store/users/users.selectors";
import { useParams } from "react-router-dom";
import { PeerContext } from "../../apis/peerContext";
import ReactPlayer from "react-player";
function VideoCall() {
    const user = useSelector(selectUser);
    const [myStream, setMyStream] = useState(null);
    const [remoteEmail, setRemoteEmail] = useState("");
    const { id } = useParams();
    const { peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream } = useContext(PeerContext);
    // const { name, me, callAccepted, myVideo, userVideo, callEnded, stream, leaveCall, call, callUser  } = useContext(SocketContext);
    const { socket } = useContext(SocketContext);
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
    const handleCallAccepted = useCallback(async (data) => {
        const { ans } = data;
        console.log("call accepted", ans)
        await setRemoteAnswer(ans);

    }, [setRemoteAnswer])
    const getUserMediaStream = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setMyStream(stream);
    }, [])
    useEffect(() => {
        socket.on("user-connected", handleUserJoined)
        socket.on("incomming-call", handleIncommingCall)
        socket.on("accepted-call", handleCallAccepted)

        return () => {
            socket.off("user-connected", handleUserJoined)
            socket.off("incomming-call", handleIncommingCall)
            socket.off("accepted-call", handleCallAccepted)
        }
    }, [handleUserJoined, handleIncommingCall, handleCallAccepted, socket])

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
    }, [peer, remoteEmail, socket])
    useEffect(() => {
        peer.addEventListener('negotiationneeded', handleNegotiation);
        return () => {
            peer.removeEventListener('negotiationneeded', handleNegotiation);
        }
    }, [peer, handleNegotiation])
    return (
        <div style={{ height: "99vh", position: "relative" }}>
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
            <h4>You are connected to {remoteEmail}</h4>
            <button onClick={(e) => sendStream(myStream)}>Send Stream</button>
            <ReactPlayer url={myStream} playing muted />
            {remoteStream && <ReactPlayer url={remoteStream} playing />}
        </div>


    )
}

export default withAuth(isVerified(VideoCall));