
import React, { Fragment, useEffect, useRef, useState } from 'react'
import styles from './Posts.module.scss'
import { FaRegCommentAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/users/users.selectors';
import { useMutation, useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { TbArrowBigUp } from "react-icons/tb";
import { BsDot } from "react-icons/bs";


import { TbArrowBigUpFilled } from "react-icons/tb";
import { BiDotsHorizontalRounded, BiDotsVerticalRounded } from "react-icons/bi";


import {
    DELETE_POST_MUTATION, GET_POSTS,
    CREATE_POST_MUTATION,
    REMOVE_LIKE_POST_MUTATION,
    LIKE_POST_MUTATION,
    GET_SIMILAR_QUESTIONS
} from "../../apis/forum";
import { Alert, Button, CardTitle, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Modal, PopoverBody, PopoverHeader, Row, UncontrolledDropdown, UncontrolledPopover } from 'reactstrap';
import Moment from 'react-moment';
import {
    COMMUNITY,
    CREATE_COMMUNITY,
    GET_COMMUNITIES, DELETE_COMMUNITY,
    JOIN_COMMUNITY,
    LEAVE_COMMUNITY,
    GET_COMMUNITIES_BY_USER,
    UPDATE_COMMUNITY
} from "../../apis/community";
import Loading from '../../components/loading';


function ForumHomepage() {


    const user = useSelector(selectUser);
    const [alertMessage, setAlertMessage] = useState('');
     
    const [deletemodal, setDeletemodal] = React.useState(false);

    const [modal, setModal] = React.useState(false);
    const [modal2, setModal2] = React.useState(false);
    const [modalEditCom, setModalEditCom] = React.useState(false);

    const [communityDesc, setCommunityDesc] = React.useState();
    const [communityName, setCommunityName] = React.useState();

    const [postText, setPostText] = useState('');
    const [title, setTitle] = useState('');
    const [community, setCommunity] = useState();

    const [buttonTexts, setButtonTexts] = useState([]);
    const [joinCommunities, setjoinCommunities] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const inputRef = useRef(null);
    const [isConditionTrue, setIsConditionTrue] = useState(false);
    const [clickedFileId, setClickedFileId] = useState('');

    const Inputstyle = {

        borderColor: isConditionTrue ? 'red' : '#e0dcdc',

    };



    const { loading, error, data, refetch } = useQuery(GET_POSTS, {
        variables: { user: user.id },
    });

    const { loading: loadingQ, error: errorQ, data: dataQ, refetch: refetchQuestion } = useQuery(GET_SIMILAR_QUESTIONS, {
        variables: { newQuestion: title },
        onError: (error) => {
            console.log(error);
        }
    });
    const { loading: loadingCo, error: errorCo, data: dataCo, refetch: refetchCo } = useQuery(COMMUNITY, {
        variables: { id: clickedFileId, user: user.id },
    });
    const [joinCommunity] = useMutation(
        JOIN_COMMUNITY
    );
    const [deleteCommunity] = useMutation(
        DELETE_COMMUNITY
    );
    const [leaveCommunity] = useMutation(
        LEAVE_COMMUNITY
    );

    const { data: dataC, loading: loadingC, error: errorC, refetch: refetchC } = useQuery(GET_COMMUNITIES_BY_USER, {
        variables: { id: user.id },
    });
    const { data: dataCom, loading: loadingCom, error: errorCom, refetch: refetchCom } = useQuery(GET_COMMUNITIES);

    const [createCommunity] = useMutation(
        CREATE_COMMUNITY
    );
    const [updateCommunity, { error: errorUpdateCom }] = useMutation(
        UPDATE_COMMUNITY
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

    const [createPost] = useMutation(
        CREATE_POST_MUTATION
    );
    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {
        if (dataC)
            refetchC();
        refetchCom();
    }, [dataC]);




    useEffect(() => {
        if (dataQ?.similarQuestions) {
            if (dataQ?.similarQuestions?.filter((m) => m.similarity > 0.8).length > 0) {
                setIsConditionTrue(true);
                setAlertMessage('Title already exist!');

            } else {
                setIsConditionTrue(false);
                setAlertMessage('');
            }
            refetchQuestion();
        }

    }, [title]);

 

    ///***  choose community */
    const handleChange = (event) => {
        setCommunity(event.target.value)
    }
    const toggleDeleteModal = (id) => {
        setClickedFileId(id);
        setDeletemodal(!deletemodal);
    };
    //** Modal */ 
    const toggleModal = () => {
        setModal(!modal);
    };
    //** community Modal */ 
    const toggleModal2 = () => {
        setModal2(!modal2);
    };
    //** update community Modal */ 
    const toggleModalEditCom = (id) => {
        if (id)
            setClickedFileId(id);

        refetchCo().then(() => {
            setCommunityName(dataCo?.community?.name);
            setCommunityDesc(dataCo?.community?.description);

        }
        )


    };
    useEffect(() => {
        if (dataCo)
            toggleModalEditCom();

    }, [dataCo]);


    const resetCommunitymodal = () => {
        setCommunityDesc();
        setCommunityName();
        setAlertMessage('');

    }
    const resetPostmodal = () => {
        setPostText('');
        setTitle('');


    }



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
    //** delete community*/
    function deleteMyCommunity() {

        deleteCommunity({
            variables: {

                id: clickedFileId,


            },
        }).then(() => {
            setClickedFileId('');
            setCommunityDesc();
            setCommunityName();
            setDeletemodal(!deletemodal)
            refetch();
            refetchC();
        })
            .catch(errorDel => console.error(errorDel));



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
            setPostText('');
            setTitle('');
            setCommunity();
            refetch();
        })
            .catch(errorP => console.error(errorP));



    };

    /** edit community */

    function editCommunity(comId) {

        updateCommunity({
            variables: {
                id: comId,
                description: communityDesc,
                name: communityName,



            },


        }).then(() => {
            setModalEditCom(!modalEditCom)
            setCommunityDesc();
            setCommunityName();
            setAlertMessage('');
            refetchC();
            refetch();


        }).catch(errorUpdateCom => setAlertMessage(`${errorUpdateCom.message}`));



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
            setAlertMessage('');
            refetchC();


        })
            .catch(errorCC => setAlertMessage(`${errorCC.message}`)
            );


    };
    useEffect(() => {
        if (data) {
            refetch();
        }
    }, [data]);




    if (loadingC) return <p>loading...</p>
    if (loadingCom) return <p>loading...</p>




    const handleMouseOver = (index) => {
        setButtonTexts((prevButtonTexts) => {
            const newButtonTexts = [...prevButtonTexts];
            newButtonTexts[index] =
                prevButtonTexts[index] === 'Leave' ? 'Joined' : 'Leave';
            return newButtonTexts;
        });
    };

    const handleMouseLeave = (index) => {
        setButtonTexts((prevButtonTexts) => {
            const newButtonTexts = [...prevButtonTexts];
            newButtonTexts[index] =
                prevButtonTexts[index] === 'Leave' ? 'Joined' : 'Joined';
            return newButtonTexts;
        });
    };

    const searchedCommunity = dataCom?.getAllCommunities?.filter(
        (c) =>
            c?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );



    return (

        <div className={styles.containerFluid} >


            <Col lg="6" md="6">

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
                                onClick={() => { toggleModal(); resetPostmodal(); }}
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



                            <div className={styles.select}>
                                <select className="form-control" aria-label=".form-select-sm example"
                                    value={community} onChange={handleChange}>
                                    <option value=""   >Choose Community</option>
                                    {loadingC ? (<Loading/>) :
                                        (dataC.findCommunityByUser.map((c) => {
                                            return (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            )
                                        }))}
                                </select>
                            </div>

                            {alertMessage && <p style={{ color: "red", marginLeft: "2px", fontSize: "13px" }}>
                                {alertMessage}
                            </p>}
                            <div style={{ position: "relative", width: "100%" }}>
                                <Input style={Inputstyle}
                                    type="text"
                                    placeholder="Title"
                                    name="title"
                                    value={title}
                                    className={styles.input}
                                    onFocus={() => setDropdownOpen(true)}

                                    onChange={(e) => { setTitle(e.target.value); setDropdownOpen(true); }}>
                                </Input>

                                {loadingQ ? (null) : dropdownOpen ? (

                                    <div className={styles.searchDropdown}  >

                                        <> {dataQ?.similarQuestions?.map((s) => (
                                            <Link to={`/comments/${s.id}`}  >
                                                <div key={s.title} className={styles.suggestions}
                                                >
                                                    <span>{s.title}</span>

                                                    <p>{s.comments?.length} Comments</p>
                                                    <hr className="my-1" />
                                                </div>
                                            </Link>
                                        ))}
                                        </>


                                    </div>
                                ) : (null)}

                            </div>




                            <textarea
                                type="text"
                                placeholder="What do you want to ask or share?"
                                name="post"
                                value={postText}
                                onFocus={() => setDropdownOpen(false)}
                                className={styles.textarea} onChange={(e) => setPostText(e.target.value)}  >

                            </textarea>
                        </div>
                        <div className="modal-footer">
                            <div >
                                <Button
                                    className="btn-link"
                                    color="primary"
                                    type="button"
                                    onClick={() => { toggleModal(); resetPostmodal(); }}
                                >
                                    Cancel
                                </Button>
                            </div>

                            <div >
                                {postText == '' || title == '' || postText == null || title == null ||
                                    community == null || dataQ?.similarQuestions?.filter((m) => m.similarity > 0.8).length > 0 ? (
                                    <Button className="btn-round" color="primary" disabled >
                                        Post
                                    </Button>
                                ) : (
                                    <Button className="btn-round" color="primary" onClick={addPost} >
                                        Post
                                    </Button>
                                )}

                            </div>
                        </div>
                    </Modal>
                </Col>



                {loading ? (<Loading/>) : dataC?.findCommunityByUser.length !== 0 && joinCommunities == false ?
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
                                                        <Link to={`/community/${p?.community?.id}`}  >
                                                            <label className="label  mr-1" style={{ background: p?.community?.color, cursor: "pointer" }}>{p?.community?.name}</label>
                                                        </Link>




                                                        <small>Posted by {p?.user?.name}  <BsDot /> <Moment fromNow>{p?.time}</Moment>        </small>                                            </div>



                                                    {p.user.id === user.id ? (
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


                    ) : joinCommunities === false ? (
                        <div className={styles.centercard} >


                            <h4 className='text-center'>Explore a variety of topics and connect with others by joining communities and accessing their posts</h4>



                        </div>

                    ) : joinCommunities ? (
                        <div className={styles.add_post_container}>


                            <Container >


                                <Row className={styles.cardHeader}>

                                    <h3>Join Communities</h3>
                                    <br />

                                    <button
                                        aria-label="Close"
                                        className="close"
                                        type="button"
                                        onClick={() => { refetch(); setjoinCommunities(!joinCommunities); }}
                                    >
                                        <span aria-hidden={true}>×</span>
                                    </button>

                                </Row>





                                <Row className="d-flex justify-content-center  ">
                                    <Col lg="10" md="6">
                                        <div className={styles.row}>

                                            <input className={styles.postTextArea}
                                                placeholder='Search'
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />

                                        </div>
                                        <br />


                                        <ul className="list-unstyled follows">
                                            {searchedCommunity.map((c, index) => {

                                                return (
                                                    <>
                                                        <li key={c.id}>
                                                            <Row className="d-flex justify-content-center align-items-center ">

                                                                <Col lg="8" md="4" xs="4">
                                                                    <Link to={`/community/${c?.id}`}  >  <h6 style={{ color: "#252525", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                                        {c.name} <br />

                                                                    </h6> </Link>
                                                                </Col>

                                                                <Col lg="1" md="6">
                                                                    {(c.members.filter((m) => m.id === user.id).length > 0) ?
                                                                        <Button size="sm" className="btn-round" color="info" onClick={() => leave(c.id)}
                                                                            onMouseLeave={() => handleMouseLeave(index)}
                                                                            onMouseOver={() => handleMouseOver(index)}
                                                                            style={{ width: "80px" }}
                                                                        >
                                                                            {buttonTexts[index] ?? 'Joined'}
                                                                        </Button>
                                                                        : <Button style={{ width: "80px" }} size="sm" className="btn-round" outline color="default" onClick={() => join(c.id)}> Join</Button>}
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
            <Col lg="2" md="4" sm="3">

                <div className={styles.communityCard}>


                    <div className={styles.cardContent}>

                        <div className="d-flex flex-column align-items-start justify-contents-center">
                            <div className={styles.cardHeader2}>
                                <Button size="sm" block className="btn-round" color="info" onClick={() => setjoinCommunities(!joinCommunities)}>
                                    Join Community
                                </Button>

                                <Button size="sm" outline block className="btn-round" color="primary" onClick={toggleModal2}>
                                    Create Community
                                </Button>
                                <br />
                                <small>Your Communities</small>

                            </div>

                        </div>


                        <div className={styles.communityCardBody}>
                            {dataC?.findCommunityByUser?.map((c) => {
                                return (
                                    <>
                                        <Link to={`/community/${c.id}`}>
                                            <div className={styles.communityBtn} >
                                                <div style={{ color: "#252525", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>  {c.name}</div>

                                                {c?.creator?.id === user.id ? (
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

                                                            <BiDotsVerticalRounded className={styles.smallicon} />
                                                        </DropdownToggle>
                                                        <DropdownMenu className="dropdown-default" right>
                                                            <DropdownItem

                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    toggleModalEditCom(c.id);
                                                                    setModalEditCom(!modalEditCom);


                                                                }}
                                                            >
                                                                Edit
                                                            </DropdownItem>
                                                            <DropdownItem

                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    toggleDeleteModal(c.id);
                                                                 
                                                                }}                                                      >
                                                                Delete
                                                            </DropdownItem>


                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>) : (null)}


                                            </div>
                                        </Link>




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
                                onClick={() => { toggleModal2(); resetCommunitymodal(); }}
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
                        <div className={styles.modalContent}>

                            {alertMessage && <Alert color="danger" style={{ width: "100%" }}>
                                {alertMessage}
                            </Alert>}
                            <input type="text"
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
                                    color="primary"
                                    type="button"
                                    onClick={() => { toggleModal2(); resetCommunitymodal(); }}
                                >
                                    Cancel
                                </Button>
                            </div>

                            <div >
                                {communityDesc == '' || communityName == '' || communityDesc == null || communityName == null ? (
                                    <Button className="btn-round" color="primary" disabled >
                                        Create
                                    </Button>
                                ) : (
                                    <Button className="btn-round" color="primary" onClick={addCommunity} >
                                        Create
                                    </Button>
                                )}

                            </div>
                        </div>
                    </Modal>



                </Col>
                {/* update community Modal */}
                <Col md="6">

                    <Modal isOpen={modalEditCom} toggle={toggleModalEditCom}  >
                        {(loadingCo) ? (
                            <>
                                <div className="modal-header">

                                    <button
                                        aria-label="Close"
                                        className="close"
                                        type="button"


                                    >
                                        <span aria-hidden={true}>×</span>
                                    </button>
                                    <h5
                                        className="modal-title text-center"
                                        id="exampleModalLabel"
                                    >
                                        Update Community
                                    </h5>
                                </div>
                                <div className={styles.modalContent}>

                                    <input type="text"
                                        placeholder=" "
                                        name="name"
                                        value=""
                                        className={styles.input}
                                    />

                                    <textarea
                                        type="text"
                                        placeholder=" "
                                        name="post"
                                        value=""
                                        className={styles.textarea}
                                    />
                                </div>
                                <div className="modal-footer">
                                    <div >
                                        <Button
                                            className="btn-link"
                                            color="default"
                                            type="button"

                                        >
                                            Cancel
                                        </Button>
                                    </div>

                                    <div >
                                        {communityDesc == '' || communityName == '' || communityDesc == null || communityName == null ? (
                                            <Button className="btn-round" color="default" disabled >
                                                Update
                                            </Button>
                                        ) : (
                                            <Button className="btn-round" color="default"   >
                                                Update
                                            </Button>
                                        )}

                                    </div>
                                </div>
                            </>) : (
                            <>
                                <div className="modal-header">

                                    <button
                                        aria-label="Close"
                                        className="close"
                                        type="button"
                                        onClick={() => { setModalEditCom(!modalEditCom); resetCommunitymodal(); }}
                                    >
                                        <span aria-hidden={true}>×</span>
                                    </button>
                                    <h5
                                        className="modal-title text-center"
                                        id="exampleModalLabel"
                                    >
                                        Update Community
                                    </h5>
                                </div>
                                <div className={styles.modalContent}>

                                    {alertMessage && <Alert color="danger" style={{ width: "100%" }}>
                                        {alertMessage}
                                    </Alert>}
                                    <input type="text"
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
                                            onClick={() => { setModalEditCom(!modalEditCom); }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>

                                    <div >
                                        {communityDesc == '' || communityName == '' || communityDesc == null || communityName == null ? (
                                            <Button className="btn-round" color="default" disabled >
                                                Update
                                            </Button>
                                        ) : (
                                            <Button className="btn-round" color="default" onClick={() => editCommunity(clickedFileId)} >
                                                Update
                                            </Button>
                                        )}

                                    </div>
                                </div>
                            </>)}
                    </Modal>


                </Col>

                <Col md="6">

                    {/*delete Modal */}
                    <Modal isOpen={deletemodal} toggle={toggleDeleteModal}  >
                        <div className="modal-header">
                            <button
                                aria-label="Close"
                                className="close"
                                type="button"
                                onClick={ ()=>setDeletemodal(!deletemodal)}
                            >
                                <span aria-hidden={true}>×</span>
                            </button>
                            <h5
                                className="modal-title text-center"
                                id="exampleModalLabel"
                            >
                                Delete Community
                            </h5>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this community?
                            Once you delete it all posts will be deleted.

                        </div>
                        <div className="modal-footer">
                            <div >
                                <Button
                                    className="btn-link"
                                    color="default"
                                    type="button"
                                    onClick={ ()=>setDeletemodal(!deletemodal)}
                                >
                                    Cancel
                                </Button>
                            </div>

                            <div  >
                                <Button className="btn-link" color="danger" onClick={deleteMyCommunity}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </Col>

            </Col>







        </div >


    )

}

export default ForumHomepage;