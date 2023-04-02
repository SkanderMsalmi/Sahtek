import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Carousel,
  CarouselIndicators,
  CarouselItem,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Progress,
  Row,
} from "reactstrap";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./Feedback.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/users/users.selectors";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
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
const Feedback = () => {
  const CREATE_FEEDBACK = gql`
    mutation CreateFeedback(
      $patient: ID!
      $communication: Int!
      $empathy: Int!
      $professionalism: Int!
      $effectiveness: Int!
      $therapist: ID!
      $remarks: String
    ) {
      createFeedback(
        patient: $patient
        communication: $communication
        empathy: $empathy
        professionalism: $professionalism
        effectiveness: $effectiveness
        therapist: $therapist
        remarks: $remarks
      )
    }
  `;
  const items = [
    {
      id: 1,
      title: "Communication",
      questions: [
        {
          id: 5,
          text: "Did the therapist actively listen to you during your sessions ?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree ",
            "Strongly Agree ",
          ],
        },
        {
          id: 6,
          text: "Was the therapist clear and easy to understand when explaining things?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree ",
            "Strongly Agree ",
          ],
        },
        {
          id: 7,
          text: "Did the therapist use language that you found respectful and appropriate?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree ",
            "Strongly Agree ",
          ],
        },
        {
          id: 8,
          text: "Did the therapist respond to your questions and concerns in a timely manner?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree ",
            "Strongly Agree ",
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Empathy",
      questions: [
        {
          id: 9,
          text: "Did the therapist show an understanding of your emotions and feelings?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree ",
            "Strongly Agree ",
          ],
        },
        {
          id: 10,
          text: "Did the therapist make you feel comfortable sharing personal information?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree ",
            "Strongly Agree ",
          ],
        },
        {
          id: 11,
          text: "Did the therapist show compassion and understanding?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree ",
            "Strongly Agree ",
          ],
        },
        {
          id: 12,
          text: "Did the therapist help you feel understood and validated?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree ",
            "Strongly Agree ",
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Professionalism",
      questions: [
        {
          id: 13,
          text: "Did the therapist maintain a professional demeanor throughout your sessions?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree ",
            "Strongly Agree ",
          ],
        },
        {
          id: 14,
          text: "Did the therapist adhere to ethical and legal standards?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree ",
            "Strongly Agree ",
          ],
        },
        {
          id: 15,
          text: "Did the therapist respect your privacy and confidentiality?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree ",
            "Strongly Agree ",
          ],
        },
        {
          id: 16,
          text: "Did the therapist maintain appropriate boundaries?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree ",
            "Strongly Agree ",
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Effectiveness",
      questions: [
        {
          id: 17,
          text: "Did the therapy help you achieve your goals?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree ",
            "Strongly Agree ",
          ],
        },
        {
          id: 18,
          text: "Did the therapist provide you with tools and strategies to cope with your issues?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree ",
            "Strongly Agree ",
          ],
        },
        {
          id: 19,
          text: "Did the therapist help you gain new insights into your thoughts and behaviors?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree ",
            "Strongly Agree ",
          ],
        },
        {
          id: 20,
          text: "Did the therapy have a positive impact on your overall well-being?",
          options: [
            "Strongly disagree",
            "Disagree",
            "Neutral",
            "Agree ",
            "Strongly Agree ",
          ],
        },
      ],
    },
    {
      id: 21,
      title: "Remark",
      questions: [{ id: 22, text: "Write any remarks you have here" }],
    },
  ];
  const { id } = useParams("id");
  const {
    data: dataTherapist,
    loading: loadingTherapist,
    error: errorTherapist,
    refetch,
  } = useQuery(
    USER_PROFILE,
    {
      variables: { id },
    },
    { notifyOnNetworkStatusChange: true }
  );
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(0);
  const [remark, setRemark] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 1,
    10: 1,
    11: 1,
    12: 1,
    13: 1,
    14: 1,
    15: 1,
    16: 1,
    17: 1,
    18: 1,
    19: 1,
    20: 1,
  });
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  const handleAnswerSelection = (questionId, answerId) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerId });
  };
  const [createFeedback, { loading, error, data }] =
    useMutation(CREATE_FEEDBACK);
  let [communicationResultat, setcommunicationResultat] = useState(0);
  let [empathyResultat, setempathyResultat] = useState(0);
  let [professionalismResultat, setprofessionalismResultat] = useState(0);
  let [effectivenessResultat, seteffectivenessResultat] = useState(0);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Add your code here to submit the form data

    let sommeC = 0;
    let sommeE = 0;
    let sommeP = 0;
    let sommeEff = 0;
    for (let i = 5; i < 9; i++) {
      sommeC += selectedAnswers[i];
    }
    for (let i = 9; i < 13; i++) {
      sommeE += selectedAnswers[i];
    }
    for (let i = 13; i < 17; i++) {
      sommeP += selectedAnswers[i];
    }
    for (let i = 17; i <= 20; i++) {
      sommeEff += selectedAnswers[i];
    }
    setcommunicationResultat(sommeC / 4);
    setempathyResultat(sommeE / 4);
    setprofessionalismResultat(sommeP / 4);
    seteffectivenessResultat(sommeEff / 4);
    createFeedback({
      variables: {
        patient: user.id,
        therapist: id,
        communication: communicationResultat,
        empathy: empathyResultat,
        professionalism: professionalismResultat,
        effectiveness: effectivenessResultat,
        remarks: remark,
      },
    });
    if (data?.createFeedback === true) {
      setSubmitted(1);
      setTimeout(() => {
        navigate("/profile2");
      }, 5000);
    } else {
      setSubmitted(2);
    }
    console.log("error" + error.message);
  };

  const slides = items.map((item) => {
    const { id, title, questions } = item;
    if (title === "Remark") {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={id}
        >
          <Form>
            <h2 className="mb-5" style={{ color: "#51cbce" }}>
              <b>{title}</b>
            </h2>
            {questions.map((question) => (
              <FormGroup
                tag="fieldset"
                key={question.id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "5rem",
                }}
              >
                <legend>
                  "Thank you for taking the time to answer our questions! If you
                  have any additional feedback or suggestions that you would
                  like to share with us"
                </legend>
                <Input
                  type="textarea"
                  name="remark"
                  placeholder="Write any Remark you have here"
                  onChange={(e) => setRemark(e.target.value)}
                  value={remark}
                  style={{ height: "392px" }}
                />
              </FormGroup>
            ))}
          </Form>
        </CarouselItem>
      );
    }
    const slideQuestions = questions.map((question) => (
      <FormGroup
        tag="fieldset"
        key={question.id}
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "5rem",
        }}
      >
        <legend>{question.text}</legend>

        <Slider
          className="w-75"
          marks={question.options}
          min={0}
          max={4}
          onChange={(value) => handleAnswerSelection(question.id, value + 1)}
        />
      </FormGroup>
    ));

    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={id}
      >
        <Form>
          <h2 className="mb-5" style={{ color: "#51cbce" }}>
            <b>{title}</b>
          </h2>
          {slideQuestions}
        </Form>
      </CarouselItem>
    );
  });
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("../../assets/img/daniel-olahh.jpg") + ")",
        }}
        className="page-header"
        data-parallax={true}
      >
        {submitted === 1 ? (
          <div
            className={`${styles.modalbox} ${styles.success} ${styles.center} ${styles.animate}`}
          >
            <div className={`${styles.icon}`}>
              <span class="fa-solid fa-check"></span>
            </div>

            <h1>Success!</h1>
            <div className="m-5">
              <p>
                Thanks for your feedback! you will be automatically generated on
                your profile ...
              </p>
              <div className="border">
                <CardBody>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardImg
                      top
                      src={dataTherapist.user.profileImage}
                      alt="Therapist"
                      style={{ width: "100px", margin: "0.6rem" }}
                    />
                    <CardTitle tag="h5">
                      Dr. {dataTherapist.user.name}
                    </CardTitle>
                  </Row>
                  <div className="progress-container progress-primary m-2">
                    <span className="progress-badge">
                      Communication {communicationResultat} / 5
                    </span>
                    <Progress
                      max="5"
                      value={communicationResultat}
                      barClassName="progress-bar-primary"
                    />
                  </div>
                  <div className="progress-container progress-warning m-2">
                    <span className="progress-badge">
                      Professionalism {professionalismResultat} / 5
                    </span>
                    <Progress
                      max="5"
                      value={professionalismResultat}
                      barClassName="progress-bar-warning"
                    />
                  </div>
                  <div className="progress-container progress-warning m-2">
                    <span className="progress-badge">
                      Empathy {empathyResultat} / 5
                    </span>
                    <Progress
                      max="5"
                      value={empathyResultat}
                      barClassName="progress-bar-warning"
                    />
                  </div>
                  <div className="progress-container progress-warning m-2">
                    <span className="progress-badge">
                      Effectiveness {effectivenessResultat} / 5
                    </span>
                    <Progress
                      max="5"
                      value={effectivenessResultat}
                      barClassName="progress-bar-warning"
                    />
                  </div>
                </CardBody>
              </div>
              <Button color="primary" href="/profile" className="mt-5">
                Go to your profile
              </Button>
            </div>
          </div>
        ) : submitted === 2 ? (
          <div
            className={`${styles.modalbox} ${styles.error} ${styles.center} ${styles.animate}`}
          >
            <div className={`${styles.icon}`}>
              <span class="fa-solid fa-xmark"></span>
            </div>

            <h1>Error!</h1>
            <div className="m-5">
              <p>Error Occured ...</p>
              <Alert color="danger"> {error?.message}</Alert>
              <Button color="primary" href="/profile" className="m-3">
                Go to your profile
              </Button>
              <Button color="secondary" href="/profile" className="m-3">
                make new feedback
              </Button>
            </div>
          </div>
        ) : submitted === 0 ? (
          <>
            <Container className={styles.carousel}>
              <div className={`" text-center m-2 " ${styles.carousel}`}>
                <div className="MyCarousel">
                  <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                    interval={null}
                    dark
                  >
                    <CarouselIndicators
                      items={items}
                      activeIndex={activeIndex}
                      onClickHandler={goToIndex}
                      className="mt-5"
                    />
                    {slides}
                  </Carousel>
                  <Container>
                    <Row>
                      {activeIndex !== 0 && (
                        <Col>
                          <Button color="primary" onClick={previous}>
                            Previous
                          </Button>
                        </Col>
                      )}
                      {activeIndex === items.length - 1 && (
                        <Col>
                          <Button color="primary" onClick={handleFormSubmit}>
                            Submit
                          </Button>
                        </Col>
                      )}
                      {activeIndex !== 4 && (
                        <Col>
                          <Button color="primary" onClick={next}>
                            Next
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </Container>
                </div>
              </div>
            </Container>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Feedback;
