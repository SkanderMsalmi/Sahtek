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
} from "reactstrap";
import { useEffect, useState } from "react";
import ProfilePageHeader from "../../components/Header/ProfilePageHeader";
import withAuth from "../../components/Guard/WithAuth";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/users/users.selectors";
import { useParams } from "react-router-dom";
import ProfilePosts from "../../components/Posts/profilePosts";

import EditUser from "../../components/Profile/EditUser";
import Therapist from "../../components/Profile/Therapist";
import isVerified from "../../components/Guard/IsVerified";
const USER_PROFILE = gql`
  query User($id: ID!) {
    user(ID: $id) {
      email
      password
      profileImage
      role
      name
      dateOfBirth
    }
  }
`;

function Profile2() {
  const user = useSelector(selectUser);
  let { id } = useParams();
  const [edit, setEdit] = useState(false);
  const { data, loading, error, refetch } = useQuery(
    USER_PROFILE,
    {
      variables: { id: id ? id : user.id },
    },
    { notifyOnNetworkStatusChange: true }
  );




  

  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString * 1);

    // Will display time in 10:30:23 format
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age + " years old";
  }
  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  }, []);
  const [dateOfBirth, setDateOfBirth] = useState(
    new Date(data?.user.dateOfBirth * 1)
  );
  const [name, setName] = useState(data?.user?.name);
  const [pdp, setPdp] = useState();
  const [profileImage, setProfileImage] = useState(data?.user?.profileImage);
  useEffect(() => {
    if (data) {
      setDateOfBirth(new Date(data?.user.dateOfBirth * 1));
      setName(data?.user?.name);
      setProfileImage(data?.user?.profileImage);
    }
  }, [data]);

  if (loading) return "Loading...";
  if (error) return <p>{error}</p>;
  return (
    <>
      <ProfilePageHeader />
      <div className="section profile-content">
        <Container>
          <div className="owner">
            {edit ? (
              loading ? (
                "loading..."
              ) : (
                <EditUser
                  user={{ name, dateOfBirth, pdp, profileImage: profileImage }}
                  refetch={refetch}
                  setProfileImage={setProfileImage}
                  setName={setName}
                  setDateOfBirth={setDateOfBirth}
                  setPdp={setPdp}
                  setEdit={setEdit}
                  id={user.id}
                />
              )
            ) : (
              <>
                <div className="avatar">
                  <img
                    alt="..."
                    className="img-circle img-no-padding img-responsive"
                    style={{ width: "8.5rem", height: "8.5rem" }}
                    src={profileImage}
                  />
                </div>
                <div className="name">
                  <h4 className="title">
                    {name} <br />
                  </h4>
                </div>
              </>
            )}
            <h6 className="description">
              {getAge(dateOfBirth)} {data?.user?.role}
            </h6>
          </div>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="6">
              {/* <p>
                An artist of considerable range, Jane Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.
              </p> */}
              <br />
              {user?.email === data.user?.email ? (
                <Button
                  onClick={() => setEdit(!edit)}
                  className="btn-round"
                  color="default"
                  outline
                >
                  <i className="fa fa-cog" /> Settings
                </Button>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <br />
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <Nav role="tablist" tabs>
                {(user.role === "Therapist" ||
                  user?.email === data.user?.email) &&
                data.user.role === "Patient" ? (
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
                ) : data.user.role === "Therapist" ? (
                  <NavItem>
                    <NavLink
                      className={activeTab === "2" ? "active" : ""}
                      onClick={() => {
                        toggle("2");
                      }}
                    >
                      About me
                    </NavLink>
                  </NavItem>
                ) : (
                  ""
                )}
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
                <Col className="ml-auto mr-auto" md="12">
                  <ul className="list-unstyled follows">
                    {data.user?.role === "Patient" ? (
                      data?.user?.patient?.medicalConditions ? (
                        data.user.patient.medicalConditions?.map(
                          (condition) => {
                            return (
                              <>
                                <li>
                                  <Row>
                                    <Col
                                      className="ml-auto mr-auto"
                                      lg="2"
                                      md="4"
                                      xs="4"
                                    >
                                      <img
                                        alt="..."
                                        className="img-circle img-no-padding img-responsive"
                                        src={require("../../assets/img/faces/clem-onojeghuo-2.jpg")}
                                      />
                                    </Col>
                                    <Col
                                      className="ml-auto mr-auto"
                                      lg="7"
                                      md="4"
                                      xs="4"
                                    >
                                      <h6>
                                        Flume <br />
                                        <small>Musical Producer</small>
                                      </h6>
                                    </Col>
                                    <Col
                                      className="ml-auto mr-auto"
                                      lg="3"
                                      md="4"
                                      xs="4"
                                    >
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
                              </>
                            );
                          }
                        )
                      ) : (
                        <div>
                          <h3 className="text-muted">
                            No saved medical conditions :(
                          </h3>
                          <Button className="btn-round" color="warning">
                            Take test
                          </Button>
                        </div>
                      )
                    ) : data.user.role === "Therapist" ? (
                      <Therapist email={data.user.email} />
                    ) : (
                      <></>
                    )}
                  </ul>
                </Col>
              </Row>
            </TabPane>
            <TabPane className="text-center" tabId="1" id="following">
              <ProfilePosts user={user} />
            </TabPane>
          </TabContent>
        </Container>
      </div>
    </>
  );
}

export default withAuth(isVerified(Profile2));
