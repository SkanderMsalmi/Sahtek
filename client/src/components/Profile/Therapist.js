import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./Therapist.module.scss";
import { selectUser } from "../../store/users/users.selectors";
import { useEffect, useState } from "react";
import { Button, Spinner } from "reactstrap";

const GET_THERAPIST = gql`
  query User($id: ID!) {
    user(ID: $id) {
      id
      therapist {
        address {
          city
          state
          street
          zip
        }
        dateOfBirth
        description
        education
        experience
        fees
        languages
        ratings
        reviews
        specialties
        phoneNumber
        licenses {
          license
          state
          typeL
        }
        availability {
          day
          endTime
          startTime
        }
      }
    }
  }
`;
const UPDATE_THERAPIST = gql`
  mutation Mutation($therapistInput: TherapistInput) {
    updateTherapist(therapistInput: $therapistInput) {
      therapist {
        experience
      }
    }
  }
`;

function Therapist(props) {
  const user = useSelector(selectUser);
  let { id } = useParams();

  const { data, loading } = useQuery(GET_THERAPIST, {
    variables: { id: id ? id : user.id },
  });

  const [updateTherapist] = useMutation(UPDATE_THERAPIST);
  const handleSubmit = (e) => {
    e.preventDefault();

    setEditInfo({
      ...editInfo,
      specialties: cleanArray(editInfo.specialties),
      languages: cleanArray(editInfo.languages),
      education: cleanArray(editInfo.education),
      licenses: cleanLicenses(editInfo.licenses),
      availability: addMissingDays(editInfo.availability)
    });
    updateTherapist({
      variables: {
        therapistInput: {
          ...editInfo,
          licenses: cleanLicenses(editInfo.licenses),
          specialties: cleanArray(editInfo.specialties),
          languages: cleanArray(editInfo.languages),
          education: cleanArray(editInfo.education),
          availability: addMissingDays(editInfo.availability)
        },
      },
    }).then((res) => {
      setEdit(false);
    });
  };
  const [edit, setEdit] = useState(false);
  const [editInfo, setEditInfo] = useState({
    id: user.id,
    address: {
      city: "",
      state: "",
      street: "",
      zip: "",
    },
    availability: addMissingDays([]),
    description: "",
    education: [],
    experience: "",
    fees: "",
    languages: [],
    licenses: [{ license: "", state: "", typeL: "" }],
    ratings: [],
    reviews: [],
    specialties: [],
    phoneNumber: "",
  });
  useEffect(() => {
    if (data) {
      initEdit();
    }
  }, [data]);
  function cleanUpAvailability(array) {
    let newArray = [];
    let lastCase = { day: "", startTime: "", endTime: "" };
    array.forEach((item) => {
      if (
        item.startTime === lastCase.startTime &&
        item.endTime === lastCase.endTime
      ) {
        lastCase = {
          ...lastCase,
          day: lastCase.day.replace(/\-.*/, "") + "-" + item.day,
        };
      } else {
        if (lastCase.day !== "") {
          newArray.push(lastCase);
        }
        lastCase = item;
      }
    });
    return newArray;
  }
  function addMissingDays(array) {
    let newArray = [];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let i = 0;
    days.forEach((item) => {
      if (array[i] === undefined) {
        newArray.push({ day: item, startTime: "00:00", endTime: "00:00" });
      }
      else if (item === array[i].day) {
        newArray.push(array[i]);
        i++;
      }
      else {
        newArray.push({ day: item, startTime: "00:00", endTime: "00:00" });
        i++;
      }
    });
    console.log("new: ", newArray)

    return newArray;
  }
  const initEdit = () => {
    setEditInfo({
      id: user.id,
      address: {
        city: data.user.therapist.address.city,
        state: data.user.therapist.address.state,
        street: data.user.therapist.address.street,
        zip: data.user.therapist.address.zip,
      },
      availability: data.user.therapist.availability,
      description: data.user.therapist.description,
      education: data.user.therapist.education,
      experience: data.user.therapist.experience,
      fees: data.user.therapist.fees * 1,
      languages: data.user.therapist.languages,
      licenses: data.user.therapist.licenses,
      ratings: data.user.therapist.ratings,
      reviews: data.user.therapist.reviews,
      specialties: data.user.therapist.specialties,
      phoneNumber: data.user.therapist.phoneNumber,
    });
  };

  const cleanArray = (array) => {
    return array.filter(function (el) {
      return el !== "" && el !== " " && el !== null;
    });
  };
  const cleanLicenses = (array) => {
    return array.filter(function (el) {
      return el.license !== "" && el.license !== " " && el.license !== null && el.state !== "" && el.state !== " " && el.state !== null && el.typeL !== "" && el.typeL !== " " && el.typeL !== null;
    })
  };

  const handlePhone = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setEditInfo({ ...editInfo, phoneNumber: e.target.value });
    }
  };

  const handleFees = (e) => {
    const re = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setEditInfo({ ...editInfo, fees: e.target.value * 1 });
    }
  };

  const handleEducation = (e, i) => {
    const newEducation = [...editInfo.education];
    newEducation[i] = e.target.value;
    setEditInfo({ ...editInfo, education: newEducation });
  };

  const handleLanguage = (e, i) => {
    const newLanguages = [...editInfo.languages];
    newLanguages[i] = e.target.value;
    setEditInfo({ ...editInfo, languages: newLanguages });
  };

  const handleSpecialty = (e, i) => {
    const newSpecialties = [...editInfo.specialties];
    newSpecialties[i] = e.target.value;
    setEditInfo({ ...editInfo, specialties: newSpecialties });
  };

  const handleLicensesL = (e, i) => {
    const newLicenses = [...editInfo.licenses];
    newLicenses[i] = { ...newLicenses[i], license: e.target.value };
    setEditInfo({ ...editInfo, licenses: newLicenses });
  };

  const handleLicensesS = (e, i) => {
    const newLicenses = [...editInfo.licenses];
    newLicenses[i] = { ...newLicenses[i], state: e.target.value };
    setEditInfo({ ...editInfo, licenses: newLicenses });
  };

  const handleStartTime = (e, i) => {
    const newAvailability = [...editInfo.availability];
    newAvailability[i] = { ...newAvailability[i], startTime: e.target.value };
    if (editInfo.availability[i].endTime >= e.target.value) {
      newAvailability[i] = { ...newAvailability[i], startTime: e.target.value, endTime: defaultTime[defaultTime.indexOf(e.target.value) + 1] };

      setEditInfo({ ...editInfo, availability: newAvailability });
    }
    setEditInfo({ ...editInfo, availability: newAvailability });

  };
  const handleEndTime = (e, i) => {
    const newAvailability = [...editInfo.availability];
    newAvailability[i] = { ...newAvailability[i], endTime: e.target.value };
    setEditInfo({ ...editInfo, availability: newAvailability });
  };
  const handleLicensesT = (e, i) => {
    const newLicenses = [...editInfo.licenses];
    newLicenses[i] = { ...newLicenses[i], typeL: e.target.value };
    setEditInfo({ ...editInfo, licenses: newLicenses });
  };
  function getExperience(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString * 1);

    var exp = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      exp--;
    }
    return exp + " years of experience";
  }
  const defaultTime = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ]
  if (loading) return <Spinner />;

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card" style={{ height: "100%" }}>
          <div className={`${styles.contactInfo} card-body`}>
            <h5 className="card-title">Contact info</h5>
            {edit ? (
              <>
                <ul style={{ padding: "0" }}>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                    </svg>
                    <input
                      className={` form-control ${styles.borderless}`}
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone number"
                      value={editInfo.phoneNumber}
                      onChange={(e) => handlePhone(e)}
                    />
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                    </svg>{" "}
                    {props.email}
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>
                    <div style={{ display: "flex" }}>
                      {" "}
                      <input
                        className={` form-control ${styles.borderless}`}
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={editInfo?.address?.street}
                        onChange={(e) =>
                          setEditInfo({
                            ...editInfo,
                            address: {
                              ...editInfo.address,
                              street: e.target.value,
                            },
                          })
                        }
                      />{" "}
                      <input
                        className={` form-control ${styles.borderless}`}
                        type="text"
                        placeholder="zip"
                        name="zip"
                        value={editInfo?.address?.zip}
                        onChange={(e) =>
                          setEditInfo({
                            ...editInfo,
                            address: { ...editInfo.address, zip: e.target.value },
                          })
                        }
                      />{" "}
                      <input
                        className={` form-control ${styles.borderless}`}
                        type="text"
                        name="city"
                        placeholder="city"
                        value={editInfo?.address?.city}
                        onChange={(e) =>
                          setEditInfo({
                            ...editInfo,
                            address: {
                              ...editInfo.address,
                              city: e.target.value,
                            },
                          })
                        }
                      />{" "}
                      <input
                        className={` form-control ${styles.borderless}`}
                        type="text"
                        name="state"
                        placeholder="state"
                        value={editInfo?.address?.state}
                        onChange={(e) =>
                          setEditInfo({
                            ...editInfo,
                            address: {
                              ...editInfo.address,
                              state: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </li>
                </ul>
                <h5>Working hours</h5>
                {addMissingDays(editInfo.availability).map((day, index) => (
                  <div key={index} className="row mb-1" >
                    <div className="col-md-8">{day.day}</div>
                    <div className="col-md-4">
                      <div style={{ display: "flex" }}>
                        {" "}
                        <select className={` form-control ${styles.borderless}`}
                          value={editInfo.availability[index]?.startTime}
                          onChange={(e) =>
                            handleStartTime(e, index)
                          }>
                          {defaultTime.map((time, index) => (
                            <option key={index} value={time}>
                              {time}
                            </option>
                          ))}

                        </select>
                        -
                        <select className={` form-control ${styles.borderless}`}
                          value={editInfo.availability[index]?.endTime}
                          onChange={(e) =>
                            handleEndTime(e, index)
                          }>
                          {editInfo.availability.length == 0 ? defaultTime.slice(1).map((time, index) => (
                            <option key={index} value={time}>
                              {time}
                            </option>
                          )) : defaultTime.filter((d) => d > editInfo.availability[index].startTime).map((time, index) => (
                            <option key={index} value={time}>
                              {time}
                            </option>
                          ))}

                        </select>

                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <ul style={{ padding: "0" }}>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
                    </svg>
                    Call : <span>&nbsp;{editInfo.phoneNumber}</span>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                    </svg>{" "}
                    {props.email}
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>{" "}
                    {editInfo.address?.street}, {editInfo.address?.zip}{" "}
                    {editInfo.address?.city}, {editInfo.address?.state}
                  </li>
                </ul>
                <br />
                <h5>Working hours</h5>
                {cleanUpAvailability(editInfo.availability).map((day, index) => (
                  <div className="row">
                    <div className="col-md-8">{day.day}</div>
                    <div className="col-md-4">
                      {day.startTime} - {day.endTime}
                    </div>
                  </div>
                ))}
                <div className="row">
                  <div className="col-md-8">Sunday</div>
                  <div className="col-md-4">Closed</div>
                </div>
              </>

            )}


            <br />
            <div
              style={{
                width: "fit-content",
                margin: "auto",
                textAlign: "center",
              }}
            >
              <h5>Fees</h5>
              {edit ? (
                <>
                  <input
                    className={` form-control ${styles.borderless}`}
                    type="text"
                    name="fees"
                    value={editInfo.fees}
                    onChange={(e) => handleFees(e)}
                  />
                  <br />
                </>
              ) : (
                <p>
                  {editInfo.fees}
                  <small>TND</small>
                </p>
              )}
              {user.role === "Patient" ? (
                <Button className="btn-round mt-2" color="success">
                  Make reservation
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {edit ? (
        <div className={`${styles.contactInfo} col-md-6`}>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
            }}
            className="mb-2"
          >
            <h5>Biography</h5>
            <span>
              {/* <Button className="btn-round" style={{marginRight:"1rem"}} onClick={()=>refetch()} color="warning">Reset</Button> */}
              {user.id === data?.user.id ? (
                <>
                  <Button
                    className="btn-round"
                    style={{ marginRight: "1rem" }}
                    onClick={(e) => handleSubmit(e)}
                    color="success"
                  >
                    Save
                  </Button>
                  <i
                    onClick={() => setEdit(!edit)}
                    className={`${styles.gear} fa-solid fa-gear`}
                  ></i>
                </>
              ) : (
                ""
              )}{" "}
            </span>
          </div>
          <textarea
            className={` form-control ${styles.borderless}`}
            name="description"
            placeholder="Describe yourself"
            value={editInfo.description}
            onChange={(e) =>
              setEditInfo({ ...editInfo, description: e.target.value })
            }
          />
          <div className="row">
            <div className={`${styles.contactInfo} col-md-6`}>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="mb-2 mt-2"
              >
                <h5>Education</h5>
                <Button
                  className="btn-round"
                  color="success"
                  onClick={() =>
                    setEditInfo({
                      ...editInfo,
                      education: [...editInfo.education, ""],
                    })
                  }
                >
                  Add
                </Button>
              </div>
              <ul style={{ padding: 0 }}>
                {editInfo.education.map((edu, i) => {
                  return (
                    <div className="input-group mb-3">
                      <input
                        className={` form-control ${styles.borderless}`}
                        type="text"
                        name="education"
                        value={edu}
                        onChange={(e) => handleEducation(e, i)}
                      />
                      <div className="input-group-append">
                        <button
                          className={`btn btn-outline-danger ${styles.btnTrans}`}
                          type="button"
                          onClick={() =>
                            setEditInfo({
                              ...editInfo,
                              education: editInfo.education.filter(
                                (e) => e !== editInfo.education[i]
                              ),
                            })
                          }
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </ul>

              <br />
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="mb-2 mt-2"
              >
                <h5>Languages</h5>
                <Button
                  className="btn-round"
                  color="success"
                  onClick={() =>
                    setEditInfo({
                      ...editInfo,
                      languages: [...editInfo.languages, ""],
                    })
                  }
                >
                  Add
                </Button>
              </div>
              <p>
                {editInfo.languages.map((l, i) => {
                  return (
                    <div className="input-group mb-3">
                      <input
                        className={` form-control ${styles.borderless}`}
                        type="text"
                        name="language"
                        value={l}
                        onChange={(e) => handleLanguage(e, i)}
                      />
                      <div className="input-group-append">
                        <button
                          className={`btn btn-outline-danger ${styles.btnTrans}`}
                          type="button"
                          onClick={() =>
                            setEditInfo({
                              ...editInfo,
                              languages: editInfo.languages.filter(
                                (l) => l !== editInfo.languages[i]
                              ),
                            })
                          }
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </p>
              <h5>Years of experience</h5>
              <p>
                {getExperience(new Date(data?.user?.therapist.experience * 1))}{" "}
              </p>
            </div>
            <div className={`${styles.contactInfo} col-md-6`}>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="mb-2 mt-2"
              >
                <h5>Specialties</h5>
                <Button
                  className="btn-round"
                  color="success"
                  onClick={() =>
                    setEditInfo({
                      ...editInfo,
                      specialties: [...editInfo.specialties, ""],
                    })
                  }
                >
                  Add
                </Button>
              </div>

              <ul style={{ padding: 0 }}>
                {editInfo.specialties.map((s, i) => {
                  return (
                    <div className="input-group mb-3">
                      <input
                        className={` form-control ${styles.borderless}`}
                        type="text"
                        name="specialty"
                        value={s}
                        onChange={(e) => handleSpecialty(e, i)}
                      />{" "}
                      <div className="input-group-append">
                        <button
                          className={`btn btn-outline-danger ${styles.btnTrans}`}
                          type="button"
                          onClick={() =>
                            setEditInfo({
                              ...editInfo,
                              specialties: editInfo.specialties.filter(
                                (s) => s !== editInfo.specialties[i]
                              ),
                            })
                          }
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </ul>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="mb-2 mt-2"
              >
                <h5>License</h5>
                <Button
                  className="btn-round"
                  color="success"
                  onClick={() =>
                    setEditInfo({
                      ...editInfo,
                      licenses: [...editInfo.licenses, { license: "", state: "", typeL: "" }],
                    })
                  }
                >
                  Add
                </Button>
              </div>
              {editInfo.licenses.map((license, i) => {
                return (<div className="input-group mb-3">

                  <input
                    className={styles.address}
                    placeholder="License"
                    name="license"
                    type="text"
                    onChange={(e) => handleLicensesL(e, i)}
                    value={license.license}
                  />
                  <input
                    className={styles.address}
                    placeholder="State"
                    name="state"
                    type="text"
                    onChange={(e) => handleLicensesS(e, i)}
                    value={license.state}
                  />
                  <select value={license.typeL} className={styles.address}
                    onChange={(e) => handleLicensesT(e, i)}
                  >
                    <option value="">Select</option>
                    <option value="Major">Major</option>
                    <option value="Minor">Minor</option>
                  </select>

                  <div className="input-group-append">
                    <button
                      className={`btn btn-outline-danger ${styles.btnTrans}`}
                      type="button"
                      onClick={() =>
                        setEditInfo({
                          ...editInfo,
                          licenses: editInfo.licenses.filter(
                            (license) => license !== editInfo.licenses[i]
                          ),
                        })
                      }
                    >
                      🗑️
                    </button>
                  </div>
                </div>)
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className={`${styles.contactInfo} col-md-6`}>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "space-between",
            }}
          >
            <h5>Biography</h5>
            {user.id === data?.user.id ? (
              <i
                onClick={() => setEdit(!edit)}
                className={`${styles.gear} fa-solid fa-gear`}
              ></i>
            ) : (
              ""
            )}
          </div>
          <p>{editInfo.description}</p>
          <div className="row">
            <div className={`${styles.contactInfo} col-md-6`}>
              <h5>Education</h5>
              <ul style={{ padding: 0 }}>
                {editInfo.education.map((edu) => {
                  return <li>{edu}</li>;
                })}
              </ul>

              <br />
              <h5>Languages</h5>
              <p>
                {editInfo.languages.map((l) => {
                  return <span>&nbsp;{l},</span>;
                })}
              </p>
              <h5>Years of experience</h5>
              <p>
                {getExperience(new Date(data?.user?.therapist.experience * 1))}
              </p>
            </div>
            <div className={`${styles.contactInfo} col-md-6`}>
              <h5>Specialties</h5>
              <ul style={{ padding: 0 }}>
                {editInfo.specialties.map((s) => {
                  return <li>{s}</li>;
                })}
              </ul>
              <h5>License</h5>
              {editInfo.licenses.map((license) => {
                return (
                  <p>{license.typeL} in {license.license} at {license.state}</p>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Therapist;
