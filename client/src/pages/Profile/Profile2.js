// import styles from './Profile.module.scss'
import { useQuery, gql } from "@apollo/client";
// import Patient from "../../components/Profile/Patient";
// import Therapist from "../../components/Profile/Therapist";
import {
    Button,
    Label,
    FormGroup,
    Input,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    Form
  } from "reactstrap";
import styles from './Profile2.module.scss'
import { useEffect, useState } from 'react';
import ProfilePageHeader from '../../components/Header/ProfilePageHeader';
import withAuth from '../../components/Guard/WithAuth';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/users/users.selectors';
import { useParams } from "react-router-dom";
import ProfilePosts from "../../components/Posts/profilePosts";
import Datetime from 'react-datetime';
import { yupResolver } from '@hookform/resolvers/yup';
import {useForm} from "react-hook-form";
import * as yup from 'yup';
const USER_PROFILE = gql`query User($id: ID!) {
  user(ID: $id) {
    email
    password
    profileImage
    role
    patient {
      name
      dateOfBirth
    }
    therapist {
      name
      dateOfBirth
    }
  }
}
`
function Profile2(){
  const user = useSelector(selectUser);
  let { id } = useParams();
  const [edit, setEdit] = useState(false);
    const { data, loading, error } = useQuery(USER_PROFILE, {
        variables: { id:id? id: user.id },});
        console.log(user.id)
        const initialValues = {
          date: data?.user?.role==="Patient"?data?.user.patient.dateOfBirth*1:data?.user.therapist.dateOfBirth*1,
          name: data?.user?.role==="Patient"?data?.user.patient.name:data?.user.therapist.name, 
      
        };
        const schema = yup.object().shape({
    
          name: yup
            .string()
            .required('You should enter your name'),
            dateOfBirth: yup
            .string()
            .required('You should enter your date of birth')
      
          
          });
    
        const {
          register,
          handleSubmit,
          reset,
          formState:{errors,isSubmitting },
          setError,
          clearErrors
        } = useForm({
          initialValues,
          resolver:yupResolver(schema)
          
        });
 
    console.log(data,user);
    const [activeTab, setActiveTab] = useState("1");
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    useEffect(() => {
setDateOfBirth(new Date(data?.user?.role==="Patient"?data?.user.patient.dateOfBirth*1:data?.user.therapist.dateOfBirth*1))
    },[data])
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  function getAge(dateString) {
    
    var today = new Date();
    console.log(dateString)
    var birthDate = new Date(dateString*1);


// Will display time in 10:30:23 format
console.log(birthDate)
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age+" years old";
}
  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  },[]);
  if (loading) return "Loading...";
  if(error) return <p>{error}</p>
    return (
        <>
        <ProfilePageHeader />
        <div className="section profile-content">
          <Container>
            <div className="owner">
            {edit?(          <Form> 
              <div  className={`${styles.pictureContainer} avatar`}>
              <label htmlFor="upload">
                <img
                  alt="..."
                  style={{cursor:"pointer"}}
                  className={`img-circle img-no-padding img-responsive ${styles.picture}`}
                  src={require("../../assets/img/faces/joe-gardner-2.jpg")}
                />
                </label>
                <input type="file" id="upload" style={{display:"none"}}/>
              </div>
              <div className="name">
              <Row>
                <Col className="ml-auto mr-auto" md="6">
<FormGroup> 
                  <Label  for="name">Name</Label>
                  <input className="mb-5 form-control" type="text" name="name" id="name" placeholder="Your name" value={data.user?.role==="Patient"?data.user.patient.name:data.user.therapist.name} />
                  <Label  for="dateOfBirth">Date of Birth</Label>
                  <Datetime
                  value={dateOfBirth}
                    onChange={(e)=>setDateOfBirth(e.toDate())}
                        timeFormat={false}
                        inputProps={{placeholder:"Insert Your Birthday"}}
                        className={` w-100`}
                    />
<Button
                      block
                      className="btn-round mt-5"
                      color="success"
                      type="submit"
                      // onClick={(e) => submit(e)}
                    >
                      Update
                    </Button>
                  </FormGroup></Col></Row></div></Form>
                  ):(  <><div className="avatar">
                  <img
                    alt="..."
                    className="img-circle img-no-padding img-responsive"
                    src={require("../../assets/img/faces/joe-gardner-2.jpg")}
                  />
                </div>
                <div className="name">
   <h4 className="title">
                  {data.user?.role==="Patient"?data.user.patient.name:data.user.therapist.name} <br />
                </h4></div></>
                )}
                <h6 className="description">{getAge(data.user?.role==="Patient"?data.user.patient.dateOfBirth:data.user.therapist.dateOfBirth)} {data?.user?.role}</h6>
              
            </div>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="6">
                <p>
                  An artist of considerable range, Jane Faker — the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                  and records all of his own music, giving it a warm, intimate
                  feel with a solid groove structure.
                </p>
                <br />
                {user.email===data.user.email?(<Button onClick={()=>setEdit(!edit)} className="btn-round" color="default" outline>
                  <i className="fa fa-cog" /> Settings
                </Button>):("")}
              </Col>
            </Row>
            <br />
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">
                <Nav role="tablist" tabs>
                  {(user.role==="Therapist" || user.email===data.user.email)&& data.user.role==="Patient"? (
                  <NavItem>
                    <NavLink
                      className={activeTab === "2" ? "active" : ""}
                      onClick={() => {
                        toggle("2");
                      }}
                    >
                      Medical Conditions
                    </NavLink>
                  </NavItem>
                  ):("")}
                  <NavItem>
                    <NavLink
                      className={activeTab === "1" ? "active" : ""}
                      onClick={() => {
                        toggle("1");
                      }}
                    >
                      Posts
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </div>
            {/* Tab panes */}
            <TabContent className="following" activeTab={activeTab}>
              <TabPane tabId="2" id="follows" className="text-center">
                <Row>
                  <Col className="ml-auto mr-auto" md="6">
                    <ul className="list-unstyled follows">
                      {data.user?.role==="Patient" && data.user.patient.medicalConditions?data.user.patient.medicalConditions?.map((condition)=>{return(
                      <>
                      <li>
                        <Row>
                          <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("../../assets/img/faces/clem-onojeghuo-2.jpg")}
                            />
                          </Col>
                          <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                            <h6>
                              Flume <br />
                              <small>Musical Producer</small>
                            </h6>
                          </Col>
                          <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultChecked
                                  defaultValue=""
                                  type="checkbox"
                                />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </Col>
                        </Row>
                      </li>
                      <hr />
                      </>)}):(<div><h3 className="text-muted">No saved medical conditions :(</h3>
    <Button className="btn-round" color="warning">
      Take test
    </Button></div>)}
                      
                   
                    </ul>
                  </Col>
                </Row>
              </TabPane>
              <TabPane className="text-center" tabId="1" id="following">
                <ProfilePosts user={user}/>
              </TabPane>
            </TabContent>
          </Container>
        </div>
        </>
    )}

    export default withAuth( Profile2);