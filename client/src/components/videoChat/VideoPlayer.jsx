import React from 'react';
import { Button, Container, Row, Col } from "reactstrap";
import styles from './videoChat.module.scss';

const VideoPlayer = () => {
  //const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);


  return (
    <Col>
      <Row className={styles.video}>      
        <video className={styles.guest_video} />
        {/* <video className={styles.user_video} /> */}
      </Row>

      {/* {stream && (
         
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <video playsInline muted ref={myVideo} autoPlay   />
           
      )}
      {callAccepted && !callEnded && (
        
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <video playsInline ref={userVideo} autoPlay   />
          
      )} */}




    </Col>






  );
};

export default VideoPlayer;