
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

import { COMMUNITY, LEAVE_COMMUNITY } from "../../apis/community";
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

import { JOIN_COMMUNITY } from "../../apis/community";
import { DELETE_POST_MUTATION } from "../../apis/forum";
import { DropdownItem, DropdownMenu, DropdownToggle, Modal, UncontrolledDropdown } from 'reactstrap';
import Moment from 'react-moment';

function CommunityPage() {
    //**page */
    let pageHeader = React.createRef();

    React.useEffect(() => {
        if (window.innerWidth < 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                pageHeader.current.style.transform =
                    "translate3d(0," + windowScrollTop + "px,0)";
            };
            window.addEventListener("scroll", updateScroll);
            return function cleanup() {
                window.removeEventListener("scroll", updateScroll);
            };
        }
    });


    const user = useSelector(selectUser);
    const communityID = useParams("communityId");
    const [postText, setPostText] = useState();
    const [title, setTitle] = useState();
    const [joined, setSetjoined] = useState("Joined");
    const [modal, setModal] = React.useState(false);

    const { loading, error, data, refetch } = useQuery(COMMUNITY, {
        variables: { id: communityID.communityId, user: user.id },
    });
    const [joinCommunity, { data: dataJ, loading: loadingJ, error: errorJ }] = useMutation(
        JOIN_COMMUNITY
    );
    const [leaveCommunity, { data: datale, loading: loadingle, error: errorle }] = useMutation(
        LEAVE_COMMUNITY
    );
    const [createPost, { data: dataP, loading: loadingP, error: errorP }] = useMutation(
        CREATE_POST_MUTATION
    );
    const [removeLikePost, { data: dataR, loading: loadingR, error: errorR }] = useMutation(
        REMOVE_LIKE_POST_MUTATION
    );
    const [LikePost, { data: dataL, loading: loadingL, error: errorL }] = useMutation(
        LIKE_POST_MUTATION
    );
    const [deletePost, { data: dataD, loading: loadingD, error: errorD }] = useMutation(
        DELETE_POST_MUTATION
    );

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


    return (
        <>



            <div
                style={{
                    backgroundImage:
                        "url(" + require("../../assets/img/fabio-mangione.jpg") + ")"
                }}
                className="page-header page-header-xs"
                data-parallax={true}
                ref={pageHeader}
            >
                <div className="filter" />
            </div>



            <div className={styles.containerFluid} >

                <div className={styles.darkSection}>
                    <Col lg="6" md="12">
                        <div className={styles.communityTitle}>
                            <div className={styles.row}>   
                                  <p >{data?.community.name}</p>
                                {(data?.community.members.filter((m) => m.id === user.id).length > 0) ?
                                    <Button size="sm" className="btn-round" outline color="neutral" onClick={leave} onMouseLeave={() => setSetjoined("Joined")} onMouseOver={() => setSetjoined("Leave")}> {joined}</Button>
                                    : <Button size="sm" className="btn-round" outline color="info" onClick={join}> Join</Button>}

                            </div>
                       

                            <small>{data?.community?.members?.length} Members</small>
                        </div>
                    </Col>

                </div>


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
                                    {postText == '' || title == '' || postText == null || title == null ? (
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
                        <>
                            {data?.community.posts.map((p) => {
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
                                                            <FaRegCommentAlt className={styles.commentIcon} /> {p?.comments?.length} Comments
                                                        </button></Link>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                )

                            })}
                        </>


                    )}
                </Col>

            </div>

        </>
    );
}

export default CommunityPage;
