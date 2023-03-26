import { useContext, useEffect } from "react";
import { SocketContext } from "../../apis/socketContext";
import isVerified from "../../components/Guard/IsVerified";
import withAuth from "../../components/Guard/WithAuth";
import Notification from "../../components/VideoCall/notification";
import Options from "../../components/VideoCall/options";
function VideoCall(){
    const params = new URLSearchParams(window.location.pathname);

const {name,me,callAccepted,myVideo,userVideo,callEnded,stream,leaveCall,call,callUser} = useContext(SocketContext);
// useEffect(() => {
//     if (myVideo && params.get("id")!=="60f") {
//     callUser("60f")
//     }
// }, [myVideo])
return(
<div style={{height:"99vh",position: "relative" }}>
        <div >
           {(!callAccepted || callEnded) && <h1>{me || "null"}</h1>
    }
        {stream && <video playsInline muted ref={myVideo} autoPlay style={(callAccepted && !callEnded)?{position:"absolute",left:"1rem", zIndex: "2", height:"20%"}:{}} />}

           {callAccepted && !callEnded && <>
          
            <video playsInline ref={userVideo} autoPlay style={{position:"absolute", inset:1, height:"100%",width:"99%", zIndex: "-1"}} />
            </>}
        </div>
        <div style={{position:"absolute",bottom:"1rem",transform: "translate(-50%, -50%);"}}>
<Options> <Notification/> </Options>            </div>
        </div>
     

)
}

export default withAuth(isVerified(VideoCall));