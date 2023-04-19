
import React, { Fragment, useEffect, useState } from 'react'
import styles from './Posts.module.scss'
import { FaRegCommentAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/users/users.selectors';
import { useMutation, useQuery } from '@apollo/client';
import { GET_POSTS } from "../../apis/forum";
import { Link, useNavigate } from 'react-router-dom';
import { TbArrowBigUp } from "react-icons/tb";
import { BsDot } from "react-icons/bs";


import { TbArrowBigUpFilled } from "react-icons/tb";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GET_COMMUNITIES_BY_USER } from "../../apis/community";

import { LIKE_POST_MUTATION } from "../../apis/forum";
import {
    REMOVE_LIKE_POST_MUTATION
} from "../../apis/forum";

import { CREATE_POST_MUTATION } from "../../apis/forum";
import { DELETE_POST_MUTATION } from "../../apis/forum";
import { Button, CardTitle, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Label, Modal, PopoverBody, PopoverHeader, Row, UncontrolledDropdown, UncontrolledPopover } from 'reactstrap';
import { fixObservableSubclass } from '@apollo/client/utilities';
import Moment from 'react-moment';
// GET_COMMUNITIES  CREATE_COMMUNITY  DELETE_COMMUNITY  JOIN_COMMUNITY
import { CREATE_COMMUNITY, GET_COMMUNITIES, JOIN_COMMUNITY, LEAVE_COMMUNITY } from "../../apis/community";


function ForumHomepage() {

    const [modal, setModal] = React.useState(false);
    const [modal2, setModal2] = React.useState(false);
    const [communityDesc, setCommunityDesc] = React.useState();
    const [communityName, setCommunityName] = React.useState();

    const [postText, setPostText] = useState();
    const [title, setTitle] = useState();
    const [community, setCommunity] = useState();
    const [joined, setSetjoined] = useState("Joined");
    const [joinCommunities, setjoinCommunities] = useState(false);




    const user = useSelector(selectUser);
    const { loading, error, data, refetch } = useQuery(GET_POSTS, {
        variables: { user: user.id },
    });
    const [joinCommunity, { data: dataJ, loading: loadingJ, error: errorJ }] = useMutation(
        JOIN_COMMUNITY
    );
    const [leaveCommunity, { data: datale, loading: loadingle, error: errorle }] = useMutation(
        LEAVE_COMMUNITY
    );

    const { data: dataC, loading: loadingC, error: errorC, refetch: refetchC } = useQuery(GET_COMMUNITIES_BY_USER, {
        variables: { id: user.id },
    });
    const { data: dataCom, loading: loadingCom, error: errorCom, refetch: refetchCom } = useQuery(GET_COMMUNITIES);

    const [createCommunity, { data: dataCC, loading: loadingCC, error: errorCC }] = useMutation(
        CREATE_COMMUNITY
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
    //** community Modal */ 
    const toggleModal2 = () => {
        setModal2(!modal2);
    };

    //** join community*/
    function join(communityID) {

        joinCommunity({
            variables: {

                id: communityID,
                userId: user.id,


            },
        }).then(() => {

            refetchCom();
            refetch();
            refetchC();
        })
            .catch(errorJ => console.error(errorJ));


    };
    //** leave community*/
    function leave(communityID) {

        leaveCommunity({
            variables: {

                id: communityID,
                userId: user.id,


            },
        }).then(() => {

            refetchCom();
            refetchC();
            refetch();
        })
            .catch(errorle => console.error(errorle));


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


    /** create community */

    function addCommunity() {

        createCommunity({
            variables: {


                description: communityDesc,

                name: communityName,
                creator: user.id,


            },


        }).then(() => {
            setModal2(!modal2);
            setCommunityDesc();
            setCommunityName();


        })
            // .then((d)=>{ navigate(`/mail-verification/${d.data.register.id}`);})
            .catch(errorCC => console.error(errorCC));


    };



    if (loadingC) return <p>loading...</p>
    if (loadingCom) return <p>loading...</p>

    return (

        <div className={styles.containerFluid} >


            <Col lg="6" md="12">

                <div className={styles.add_post_container}  >
                    <div className={styles.row}>
                        <div className={styles.userImg}><img src={user?.profileImage} alt="" /></div>

                        <button className={styles.postTextArea} onClick={toggleModal}>What do you want to ask or share?</button>

                    </div>
                </div>



                <Col md="6">

                    {/* Modal */}
                    <Modal isOpen={modal} toggle={toggleModal}   >
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
                        <div className={styles.modalContent}>
                            {/* <textarea type="text"
                            placeholder="community"
                            name="community"
                            value={community}
                            className={styles.input}
                            onChange={(e) => setCommunity(e.target.value)} /> */}
                            <div className={styles.select}>
                                <select className="form-control" aria-label=".form-select-sm example"
                                    value={community} onChange={handleChange}>
                                    <option value=""   >Choose Community</option>
                                    {loadingC ? (<p>Loading...</p>) :
                                        (dataC.findCommunityByUser.map((c) => {
                                            return (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            )
                                        }))}
                                </select>
                            </div>


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
                                {postText == '' || title == '' || postText == null || title == null || community == null ? (
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



                {loading ? (<p>Loading...</p>) : dataC?.findCommunityByUser.length !== 0 && joinCommunities == false ?
                    (
                        <>
                            {data?.findPostByUserCommunities.map((p) => {
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
                                                        <label className="label label-primary mr-1">{p?.community?.name}</label>




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


                    ) : joinCommunities || dataC?.findCommunityByUser.length == 0 ? (
                        <div className={styles.add_post_container}>


                            <Container >

                               
                                <Row className={styles.cardHeader}>
                                        <h3>Join Communities</h3>
                                        <button
                                            aria-label="Close"
                                            className="close"
                                            type="button"
                                            onClick={() => {setjoinCommunities(!joinCommunities); refetch(); }}
                                        >
                                            <span aria-hidden={true}>×</span>
                                        </button>

                                  


                                </Row>





                                <Row className="d-flex justify-content-center  ">
                                    <Col lg="10" md="6">

                                        <hr />
                                        <ul className="list-unstyled follows">
                                            {dataCom?.getAllCommunities?.map((c) => {
                                                return (
                                                    <>
                                                        <li>
                                                            <Row className="d-flex justify-content-center align-items-center ">

                                                                <Col lg="8" md="4" xs="4">
                                                                    <h6  >
                                                                        {c.name} <br />

                                                                    </h6>
                                                                </Col>

                                                                <Col lg="1" md="6">
                                                                    {(c.members.filter((m) => m.id === user.id).length > 0) ?
                                                                        <Button size="sm" className="btn-round" color="neutral" onClick={() => leave(c.id)} onMouseLeave={() => setSetjoined("Joined")} onMouseOver={() => setSetjoined("Leave")}> {joined}</Button>
                                                                        : <Button size="sm" className="btn-round" color="info" onClick={() => join(c.id)}> Join</Button>}
                                                                </Col>
                                                            </Row>
                                                        </li>
                                                        <hr />
                                                    </>
                                                )
                                            })}

                                        </ul>

                                    </Col>
                                </Row>





                            </Container>
                        </div>
                    ) : (null)}











            </Col>
            <Col lg="2" md="12">

                <div className={styles.communityCard}>


                    <div className={styles.cardContent}>

                        <div className="d-flex flex-column align-items-start justify-contents-center">
                            <div className={styles.cardHeader2}>
                                <Button size="sm" block className="btn-round" color="neutral" onClick={() => setjoinCommunities(!joinCommunities)}>
                                    Join Community
                                </Button>

                                <Button size="sm" outline block className="btn-round" color="neutral" onClick={toggleModal2}>
                                    Create Community
                                </Button>
                                <br />
                                <small>Your Communities</small>

                            </div>

                        </div>


                        <div className={styles.communityCardBody}>
                            {dataC.findCommunityByUser.map((c) => {
                                return (
                                    <>
                                        <Link to={`/community/${c.id}`}><button className={styles.communityBtn} > {c.name}</button></Link>
                                    </>


                                )
                            })}
                        </div>

                    </div>
                </div>

                <Col md="6">

                    {/* community Modal */}
                    <Modal isOpen={modal2} toggle={toggleModal2}  >
                        <div className="modal-header">
                            <button
                                aria-label="Close"
                                className="close"
                                type="button"
                                onClick={toggleModal2}
                            >
                                <span aria-hidden={true}>×</span>
                            </button>
                            <h5
                                className="modal-title text-center"
                                id="exampleModalLabel"
                            >
                                Create Community
                            </h5>
                        </div>
                        <div className='d-flex flex-column align-items-center' >



                            <textarea type="text"
                                placeholder="Name"
                                name="name"
                                value={communityName}
                                className={styles.input}
                                onChange={(e) => setCommunityName(e.target.value)} />

                            <textarea
                                type="text"
                                placeholder="Description..."
                                name="post"
                                value={communityDesc}
                                className={styles.textarea} onChange={(e) => setCommunityDesc(e.target.value)}  >

                            </textarea>
                        </div>
                        <div className="modal-footer">
                            <div >
                                <Button
                                    className="btn-link"
                                    color="default"
                                    type="button"
                                    onClick={toggleModal2}
                                >
                                    Cancel
                                </Button>
                            </div>

                            <div >
                                {communityDesc == '' || communityName == '' || communityDesc == null || communityName == null ? (
                                    <Button className="btn-round" color="info" disabled >
                                        Create
                                    </Button>
                                ) : (
                                    <Button className="btn-round" color="info" onClick={addCommunity} >
                                        Create
                                    </Button>
                                )}

                            </div>
                        </div>
                    </Modal>
                </Col>

            </Col>







        </div >


    )

}

export default ForumHomepage;