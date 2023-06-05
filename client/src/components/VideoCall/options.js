import { useContext, useState } from "react";
import { SocketContext } from "../../apis/socketContext";

const Options = ({ children }) => {
    const { name, setName, callAccepted, callEnded, me, callUser, leaveCall, answerCall } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    return (
        <div>
            <div>
                <div>
                    <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <input placeholder="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
                    {callAccepted && !callEnded ? (
                        <button onClick={leaveCall}>Hang Up</button>
                    ) : (
                        <button onClick={() => callUser(idToCall)}>Call</button>
                    )}
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
export default Options;