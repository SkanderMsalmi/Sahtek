import React from "react";
import { useMutation, gql } from "@apollo/client";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VERIFY_TOKEN_MUTATION } from "../../apis/users";

import { Button, Container, Row, Col, Alert } from "reactstrap";

function MailVerification() {
  const navigate = useNavigate();
  const [showAlert, setAlert] = useState(false);
  const [isHiddesn, setisHiddesn] = useState(false);
  const [validUrl, setValidUrl] = useState(false);

  const handleClick = () => {
    navigate("/login2");
  };

  const tokenValue = useParams("token");
  const userid = useParams("userId");

  const [verifyToken, { loadingP, errorP, dataP }] = useMutation(
    VERIFY_TOKEN_MUTATION
  );

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

  useEffect(() => {
    try {
      async function verification() {
        const { data } = await verifyToken({
          variables: {
            userId: userid.userId,
            verificationTokenInput: {
              token: tokenValue.token,
            },
          },
        });

        console.log(data.verifyToken);
        if (data.verifyToken === "success") {
          setValidUrl(true);
        }
      }
      verification();
    } catch (error) {
      console.log(error);
      setValidUrl(false);
    }
  }, [userid, tokenValue, verifyToken]);

  return (
    <Fragment>
      {validUrl ? (
        <div
          style={{
            backgroundColor: "#6bd098",
          }}
          className="page-header"
          data-parallax={true}
          ref={pageHeader}
        >
          <div className="filter" />
          <Container>
            <div className="motto text-center ">
              <img
                style={{
                  width: "60px",
                  height: "60px",
                  marginBottom: "0px",
                }}
                alt="..."
                className="img-circle img-no-padding img-responsive"
                src={require("../../assets/img/checked.png")}
              />

              <h2 className="title">Email Verified</h2>
              <h4 className="title">
                You can now sign in with your new account
              </h4>
              <br />

              <Button
                className="btn-round  "
                onClick={handleClick}
                color="neutral"
                type="button"
                outline
              >
                Log In
              </Button>
            </div>
          </Container>
        </div>
      ) : (
        ////////////////////////    not verified

        <div
          style={{
            backgroundColor: "#ffffff",
          }}
          className="page-header"
          data-parallax={true}
          ref={pageHeader}
        >
          <div className="section">
            <Container className="text-center">
              <Row>
                <Col className="ml-auto mr-auto text-center" md="8">
                  <h2 className="title text-danger">
                    Your email is not verified!
                  </h2>
                  <p className="note">
                    We have sent you the verification mail. If you did not
                    receive the Email Verification mail please click on the
                    resend button.
                  </p>
                </Col>
                <Col className="ml-auto mr-auto download-area" md="5">
                  <Button
                    className="btn-round"
                    onClick={() => {
                      setAlert(true);
                      setisHiddesn(true);
                    }}
                    hidden={isHiddesn}
                    color="danger"
                  >
                    Resend verification mail
                  </Button>
                </Col>

                <Row></Row>
              </Row>

              <Row>
                <Col>
                  {showAlert ? (
                    <Alert color="info">
                      <Container>
                        <span>
                          We have sent you the verification mail please verify.
                        </span>
                      </Container>
                    </Alert>
                  ) : (
                    <p></p>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default MailVerification;
