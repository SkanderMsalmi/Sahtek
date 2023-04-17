
import React, { Fragment, useState } from 'react'
import styles from './Posts.module.scss'
import { FaRegCommentAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/users/users.selectors';
import { useMutation, useQuery } from '@apollo/client';
import { GET_POSTS } from "../../apis/forum";
import { Link } from 'react-router-dom';
import { TbArrowBigUp } from "react-icons/tb";
import { TbArrowBigUpFilled } from "react-icons/tb";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GET_COMMUNITIES } from "../../apis/community";

import { LIKE_POST_MUTATION } from "../../apis/forum";
import {
    REMOVE_LIKE_POST_MUTATION
} from "../../apis/forum";

import { CREATE_POST_MUTATION } from "../../apis/forum";
import { DELETE_POST_MUTATION } from "../../apis/forum";
import { Button, CardTitle, Col, DropdownItem, DropdownMenu, DropdownToggle, Modal, PopoverBody, PopoverHeader, UncontrolledDropdown, UncontrolledPopover } from 'reactstrap';
import { fixObservableSubclass } from '@apollo/client/utilities';


function ForumHomepage() {
    const [modal, setModal] = React.useState(false);
    const [postText, setPostText] = useState();
    const [title, setTitle] = useState();
    const [community, setCommunity] = useState();



    const user = useSelector(selectUser);
    const { loading, error, data, refetch } = useQuery(GET_POSTS, {
        variables: { user: user.id },
    });

    const {data: dataC, loading: loadingC, error: errorC } = useQuery(GET_COMMUNITIES);


    const [removeLikePost, { data: dataR, loading: loadingR, error: errorR }] = useMutation(
        REMOVE_LIKE_POST_MUTATION
    );
    const [LikePost, { data: dataL, loading: loadingL, error: errorL }] = useMutation(
        LIKE_POST_MUTATION
    );
    const [deletePost, { data: dataD, loading: loadingD, error: errorD }] = useMutation(
        DELETE_POST_MUTATION
    );

    const [createPost, { data: dataP, loading: loadingP, error: errorP }] = useMutation(
        CREATE_POST_MUTATION
    );
    ///***  choose community */
    const handleChange = (event) => {
        setCommunity(event.target.value)
    }

    //** Modal */ 
    const toggleModal = () => {
        setModal(!modal);
    };


    //** delete post*/
    function deleteMyPost(postID) {

        deletePost({
            variables: {

                id: postID,


            },
        }).then(() => {

            refetch();
        })
            .catch(errorD => console.error(errorD));


    };

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


    /** create post */

    function addPost() {

        createPost({
            variables: {

                postInput: {
                    description: postText,
                    user: user.id,
                    title: title,
                    community: community

                }

            },
        }).then(() => {
            setModal(!modal);
            setPostText();
            setTitle();
            setCommunity();
            refetch();
        })
            .catch(errorP => console.error(errorP));


    };






    return (

        <div className={styles.containerFluid} >

            <div className={styles.add_post_container}  >
                <div className={styles.row}>
                    <div className={styles.userImg}><img src={user?.profileImage} alt="" /></div>

                    <button className={styles.postTextArea} onClick={toggleModal}>What do you want to ask or share?</button>

                </div>
            </div>



            <Col md="6">

                {/* Modal */}
                <Modal isOpen={modal} toggle={toggleModal}  >
                    <div className="modal-header">
                        <button
                            aria-label="Close"
                            className="close"
                            type="button"
                            onClick={toggleModal}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                        <h5
                            className="modal-title text-center"
                            id="exampleModalLabel"
                        >
                            Create Post
                        </h5>
                    </div>
                    <div className='d-flex flex-column align-items-center' >
                        {/* <textarea type="text"
                            placeholder="community"
                            name="community"
                            value={community}
                            className={styles.input}
                            onChange={(e) => setCommunity(e.target.value)} /> */}
                        
                        <select value={community} onChange={handleChange}>
                        <option value="">Choose Community</option>
                        {loadingC ? (<p>Loading...</p>) : 
                           ( dataC.getAllCommunities.map((c) =>
                           { return (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            )}))}


                        </select>

                        <textarea type="text"
                            placeholder="Title"
                            name="title"
                            value={title}
                            className={styles.input}
                            onChange={(e) => setTitle(e.target.value)} />

                        <textarea
                            type="text"
                            placeholder="What do you want to ask or share?"
                            name="post"
                            value={postText}
                            className={styles.textarea} onChange={(e) => setPostText(e.target.value)}  >

                        </textarea>
                    </div>
                    <div className="modal-footer">
                        <div >
                            <Button
                                className="btn-link"
                                color="default"
                                type="button"
                                onClick={toggleModal}
                            >
                                Cancel
                            </Button>
                        </div>

                        <div >
                            {postText == '' || title == ''   || postText == null || title == null || community == null ? (
                                <Button className="btn-round" color="info" disabled >
                                    Post
                                </Button>
                            ) : (
                                <Button className="btn-round" color="info" onClick={addPost} >
                                    Post
                                </Button>
                            )}

                        </div>
                    </div>
                </Modal>
            </Col>



            {loading ? (<p>Loading...</p>) : (
                <div>
                    {data?.getAllPosts.map((p) => {
                        return (
                            <>

                                <div className={styles.card} key={p.id}>

                                    <div className={styles.cardSide}>

                                        {p.isLiked ?
                                            <div className={styles.Icon} onClick={() => { removelike(p.id) }}>
                                                <TbArrowBigUpFilled className={styles.upvoteIcon} />

                                            </div>
                                            :
                                            <div className={styles.Icon} onClick={() => { likePost(p.id) }}>
                                                <TbArrowBigUp className={styles.upvoteIcon} />

                                            </div>
                                        }

                                        <label>{p.likesCount}</label>


                                    </div>

                                    <div className={styles.cardContent}>
                                        <div className={styles.cardHeader}>
                                            <div className={styles.row}>
                                                <div className={styles.userImg}>
                                                    <img src={p?.user?.profileImage} alt="" />
                                                </div>
                                                <div>
                                                    <span>{p?.user?.name}</span>  <br />
                                                    <small> {p?.time}</small>
                                                </div>

                                            </div>

                                            {p.isPostedByCurrentuser ? (
                                                <UncontrolledDropdown >

                                                    <DropdownToggle className={styles.iconBtn}
                                                        aria-expanded={false}
                                                        aria-haspopup={true}

                                                        color="default"
                                                        data-toggle="dropdown"

                                                        nav
                                                        onClick={(e) => e.preventDefault()}
                                                        role="button"
                                                    >

                                                        <BiDotsHorizontalRounded className={styles.icon} />
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-danger" right>

                                                        <DropdownItem

                                                            onClick={() => deleteMyPost(p.id)}
                                                        >
                                                            Delete
                                                        </DropdownItem>

                                                    </DropdownMenu>
                                                </UncontrolledDropdown>) : (null)}



                                        </div>

                                        <div className={styles.cardBody}>
                                            <p className={styles.title}>{p.title}</p>
                                            <p>{p.description}</p>
                                        </div>
                                        <div className={styles.cardFooter}>
                                            <Link to={`/comments/${p.id}`}>
                                                <button type="submit" className={styles.invisibleBtn}>
                                                    <FaRegCommentAlt className={styles.commentIcon} /> {p.commentsCount} Comments
                                                </button></Link>
                                        </div>
                                    </div>
                                </div>

                            </>
                        )

                    })}
                </div >

            )}
















        </div >


    )

}

export default ForumHomepage;