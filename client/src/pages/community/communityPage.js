
/*!

=========================================================
* Paper Kit React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";
import styles from './community.module.scss'

// reactstrap components
import {
    Button,
    Col
} from "reactstrap";

import { useParams } from "react-router-dom";
import { FaRegCommentAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/users/users.selectors';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { TbArrowBigUp } from "react-icons/tb";
import { BsDot } from "react-icons/bs";


import { TbArrowBigUpFilled } from "react-icons/tb";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import { LIKE_POST_MUTATION } from "../../apis/forum";
import {
    REMOVE_LIKE_POST_MUTATION
} from "../../apis/forum";
import { CREATE_POST_MUTATION } from "../../apis/forum";
import { COMMUNITY, LEAVE_COMMUNITY } from "../../apis/community";

import { JOIN_COMMUNITY } from "../../apis/community";
import { DELETE_POST_MUTATION } from "../../apis/forum";
import { DropdownItem, DropdownMenu, DropdownToggle, Modal, UncontrolledDropdown } from 'reactstrap';
import Moment from 'react-moment';

function CommunityPage() {



    const user = useSelector(selectUser);
    const communityID = useParams("communityId");
    const [postText, setPostText] = useState();
    const [title, setTitle] = useState();
    const [joined, setSetjoined] = useState("Joined");
    const [modal, setModal] = React.useState(false);

    const { loading, data, refetch } = useQuery(COMMUNITY, {
        variables: { id: communityID.communityId, user: user.id },
    });
    const [joinCommunity] = useMutation(
        JOIN_COMMUNITY
    );
    const [leaveCommunity] = useMutation(
        LEAVE_COMMUNITY
    );
    const [createPost] = useMutation(
        CREATE_POST_MUTATION
    );
    const [removeLikePost] = useMutation(
        REMOVE_LIKE_POST_MUTATION
    );
    const [LikePost] = useMutation(
        LIKE_POST_MUTATION
    );
    const [deletePost] = useMutation(
        DELETE_POST_MUTATION
    );

    useEffect(() => {
        if (data) {
            refetch();
        }
    }, [data]);


    //** Modal */ 
    const toggleModal = () => {
        setModal(!modal);
    };
    //** join community*/
    function join() {

        joinCommunity({
            variables: {

                id: communityID.communityId,
                userId: user.id,


            },
        }).then(() => {

            refetch();
        })
            .catch(errorJ => console.error(errorJ));


    };
    //** leave community*/
    function leave() {

        leaveCommunity({
            variables: {

                id: communityID.communityId,
                userId: user.id,


            },
        }).then(() => {

            refetch();
        })
            .catch(errorle => console.error(errorle));


    };
    /** create post */

    function addPost() {

        createPost({
            variables: {

                postInput: {
                    description: postText,
                    user: user.id,
                    title: title,
                    community: communityID.communityId

                }

            },
        }).then(() => {
            setModal(!modal);
            setPostText();
            setTitle();

            refetch();
        })
            .catch(errorP => console.error(errorP));


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

    const fieldColor = data?.community?.color;
    
    const myContainerstyle = {
        minHeight: "100vh",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        background: `linear-gradient(to bottom ,  ${fieldColor} , rgba(240, 240, 240)50%)`
        //background: `linear-gradient(to bottom, ${fieldColor} , rgba(${fieldColor ? parseInt(fieldColor.substring(1, 3), 16) : '255'}, ${fieldColor ? parseInt(fieldColor.substring(3, 5), 16) : '255'}, ${fieldColor ? parseInt(fieldColor.substring(5, 7), 16) : '255'}, ${alpha})40% )`,

    };
    const mystyle = {
        height: "200px",
        padding: "10px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "end",
        marginBottom: "10px",

        background: `${fieldColor} `,
    };


    return (
        <>



            <div style={myContainerstyle} >

                <div style={mystyle}>
                    <Col lg="6" md="12">
                        <div className={styles.communityTitle}>
                            <div className={styles.row}>
                                <p >{data?.community.name}</p>
                                {(data?.community.members.filter((m) => m.id === user.id).length > 0) ?
                                    <Button size="sm" className="btn-round" outline color="neutral" onClick={leave} onMouseLeave={() => setSetjoined("Joined")} onMouseOver={() => setSetjoined("Leave")}> {joined}</Button>
                                    : <Button size="sm" className="btn-round" outline color="neutral" onClick={join}> Join</Button>}

                            </div>


                            <small>{data?.community?.members?.length} Members</small>
                        </div>
                    </Col>

                </div>


                {loading ? (<p>Loading...</p>) : (
                    <>


                        <Col lg="6" md="12">


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
                                            {postText === '' || title === '' || postText == null || title == null ? (
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

                            {data?.community?.posts?.map((p) => {
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

                                                <label>{p?.like?.length}</label>


                                            </div>

                                            <div className={styles.cardContent}>
                                                <div className={styles.cardHeader}>
                                                    <div className={styles.row}>

                                                        <small>Posted by {p?.user?.name}  <BsDot /> <Moment fromNow>{p?.time}</Moment>        </small>                                            </div>



                                                    {p?.user?.id === user.id ? (
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
                                                            <FaRegCommentAlt className={styles.commentIcon} /> {p?.comments?.length} Comments
                                                        </button></Link>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                )

                            })}




                        </Col>
                    </>)}

                    </div>

            </>
            );
}

            export default CommunityPage;
