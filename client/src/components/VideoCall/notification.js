import { useContext } from "react";
import { SocketContext } from "../../apis/socketContext";


const Notification = () => {
    const {answerCall, call, callAccepted} = useContext(SocketContext);
    return (
        <>
            {call.isReceivedCall && !callAccepted && (
                <div style={{display: "flex", justifyContent: "center"}}>
                    <h1>{call.name} is calling: </h1>
                    <button onClick={answerCall}>Answer</button>
                </div>
            )}
        </>
    )
}

export default Notification;