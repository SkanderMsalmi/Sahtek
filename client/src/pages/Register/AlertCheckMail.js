import React from "react";

import { Button, Container, Row, Col, Alert } from "reactstrap";

function AlertCheckMail() {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
      }}
      className="page-header"
      data-parallax={true}
    >
      <div className="section">
        <Container className="text-center">
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className="title text-danger">Verify your email</h2>
              <p className="note">
                We have sent you an email to verify your email address and
                activate your account. The link in the email will expire in
                one hour <a href="https://mail.google.com/mail/u/"> CLick Here</a>

                {/* <button className="btn btn-primary"> CLick Here</button> */}
              </p>
            </Col>

            <Row></Row>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default AlertCheckMail;
