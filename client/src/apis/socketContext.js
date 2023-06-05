import { createContext, useState, useRef, useMemo } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { useSelector } from "react-redux";
import { selectUser } from "../store/users/users.selectors";

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  const socket = useMemo(() => io("https://sah-tek-serv.onrender.com"), []);
  const user = useSelector(selectUser);
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [isVideo, setIsVideo] = useState(true);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const [started, setStarted] = useState(false);

  // useEffect(() => {
  //     navigator.mediaDevices.getUserMedia({video:true, audio:true}).then(currentStream => {
  //         setStream(currentStream);
  //         myVideo.current.srcObject = currentStream;
  //     })
  //     socket.on("me", (id) => {
  //         setMe(id);
  //     })
  //     socket.on("calluser", ({from, name: callerName, signal}) => {
  //         setCall({isReceivedCall: true, from, name: user.name, signal})
  //     })
  // }, [])
  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answercall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };
  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callaccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };
  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    // window.location.reload();
  };
  return (
    <SocketContext.Provider
      value={{
        isVideo,
        setIsVideo,
        call,
        socket,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        setStarted,
        started,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
