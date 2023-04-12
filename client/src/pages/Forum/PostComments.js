import React, { useEffect, useState } from 'react';
import styles from './PostComments.module.scss';

import { GET_PATIENTS } from "../../apis/forum";
import { LIKE_POST_MUTATION } from "../../apis/forum";
import {
    REMOVE_LIKE_POST_MUTATION
} from "../../apis/forum";

import { CREATE_COMMENT_MUTATION } from "../../apis/forum";
import { GET_COMMENTS_BY_POST } from "../../apis/forum";
import { GET_POST } from "../../apis/forum";
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_POSTS } from "../../apis/forum";
import { Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/users/users.selectors';
import { TbArrowBigUp, TbArrowBigUpFilled } from 'react-icons/tb';


function PostComments() {
  const user = useSelector(selectUser)
  const postid = useParams("postId");
  let { id } = useParams();
  const [comment, setComment] = useState('');
  const [like, setLike] = useState(false);

 


  const { data: data2, loading: loading2, error: error2, refetch: refetch2 } = useQuery(GET_COMMENTS_BY_POST, {
    variables: { id: id ? id : postid.postId }
  });
  const { data, loading, error, refetch: refetchP } = useQuery(GET_POST, {
    variables: { id: id ? id : postid.postId, user: user.id }
  });
  const [CreateComment, { data: dataC, loading: loadingC, error: errorC }] = useMutation(
    CREATE_COMMENT_MUTATION
  );

  const { dataP, loadingP, errorP, refetch } = useQuery(GET_POSTS)
  const [removeLikePost, { data: dataR, loading: loadingR, error: errorR }] = useMutation(
    REMOVE_LIKE_POST_MUTATION
);
const [LikePost, { data: dataL, loading: loadingL, error: errorL }] = useMutation(
    LIKE_POST_MUTATION
);


    //** Like post*/
    function likePost(postID) {

      LikePost({
          variables: {

              id: postID,
              user: user.id,

          },
      }).then(() => {

          refetch();
      })
          .catch(errorL => console.error(errorL));


  };

  //** remove Like post*/
  function removelike(postID) {

      removeLikePost({
          variables: {

              id: postID,
              user: user.id,

          },
      }).then(() => {

          refetch();
      })
          .catch(errorL => console.error(errorL));


  };


  /////////////// Auto Resize Textarea

  const textRef = React.useRef();
  const [value, setValue] = React.useState();

  const onChnage = (event) => {
    setValue(event.target.value);
  };
  React.useEffect(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = "0px";
      const taHeight = textRef.current.scrollHeight;
      textRef.current.style.height = taHeight + "px";
    }
  }, [value]);


  useEffect(() => {
    if (data)
      refetchP();
  });


  function addComment() {

    CreateComment({
      variables: {

        commentInput: {
          description: comment
        },
        post: postid.postId,
        user: user.id


      },
    }).then(() => {
      setComment('');
      refetch2();
      refetch();
    })
      .catch(error => console.error(error));


  };



  return (




    <div className={styles.containerFluid}>
       {loading2 ? (<p>Loading...</p>) : (
         <div className={styles.container}>


         <div className={styles.post_container}>
           <div>
 
             <div className={styles.darkSection}>
               <label>{data?.getPost?.user?.name}'s Post</label>
             </div>
 
             <div className={styles.card}>
               <div className={styles.cardSide}>
               {data?.getPost?.isLiked ? <TbArrowBigUpFilled className={styles.upvoteIcon} onClick={() => { removelike(data?.getPost?.id) }} /> :
                                        <TbArrowBigUp className={styles.upvoteIcon} onClick={() => { likePost(data?.getPost?.id) }} />
                                    }
                 
                 <label>{data?.getPost?.likesCount}</label>
               </div>
 
               <div className={styles.cardContent}>
                 <div className={styles.cardHeader}>
                   <div className="d-flex  align-items-center">
                     <div className={styles.userImg}>
                       <img src={data?.getPost?.user?.profileImage} alt="" />
                     </div>
                     <div>
                       <span>{data?.getPost?.user?.name}</span>  <br />
                       <small> {data?.getPost?.time}</small>
                     </div>
 
                   </div>
 
                 </div>
                 <div className={styles.cardBody}>
                   <p>{data?.getPost?.description}</p>
                 </div>
 
               </div>
             </div>
           </div>
         </div>
 
 
         <div className={styles.add_comment}>
           <div className={styles.row}>
             <textarea
               type="text"
               placeholder="Add a comment"
               name="comment"
               className={styles.textarea} ref={textRef} onChange={(e) => setComment(e.target.value)}
               value={comment}
 
             />
             <button onClick={addComment} className={styles.add_btn} >Add comment</button>
 
           </div>
         </div>
 
 
        
             {data2.getCommentsByPostId.map((p) => {
               return (
                 <>
                   <div className={styles.comment_card}>
 
                     <div className={styles.cardSide}>
                       <div className={styles.userImg}><img src={p.user?.profileImage} alt="user" /></div>
                     </div>
 
 
                     <div className={styles.cardContent}>
                       <small className={styles.username}> {p.user?.name}</small>
                       <p>{p.description}</p>
                     </div>
 
                   </div>
 
                   {/* <div className={styles.card}  >
                 
                 <div className={styles.cardContent}>
                   <Col lg="12" md="8">
                     <div className={styles.cardHeader}>
 
                       <h6>{p.user?.name}</h6>
                     </div>
 
 
                     <div className={styles.cardBody}>
 
                       <p>{p.description}</p>
 
                     </div>
                   </Col>
 
                   <Col lg="3" md="4" xs="4">
 
                   </Col>
 
 
 
                 </div>
               </div> */}
                 </>)
             })}
            
 
 
 
 
 
       </div>
       )}

      

    </div>
  )

}
export default PostComments;