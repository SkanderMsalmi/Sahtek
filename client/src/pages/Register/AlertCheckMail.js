import React from "react";

import { Button, Container, Row, Col, Alert } from "reactstrap";

function AlertCheckMail() {
  return (
    <div
      className="section section-image  "
      style={{ height: "100vh", paddingTop: "250px" }}
    >
      <div className="section">
        <Container className="text-center bg-light ">
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className=" text-danger mb-5">Verify your email</h2>
              <p className="note mt-5">
                We have sent you an email to verify your email address and
                activate your account. The link in the email will expire in
                1hour
                <br />
                <a
                  className="btn btn-primary mt-5"
                  rel="noreferrer"
                  href="https://mail.google.com/mail/u/"
                  target="_blank"
                >
                  {" "}
                  CLick Here
                </a>
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
