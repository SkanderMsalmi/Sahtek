import { Button, Col, FormGroup, Label, Row } from "reactstrap";
import Datetime from 'react-datetime';
import styles from './Profile2.module.scss'
import { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import PasswordUpdate from "./PasswordUpdate";
const UPDATE_USER = gql`mutation Update($userInput: UserUpdateInput, $image: Upload) {
    update(userInput: $userInput, image: $image) {
      name
      dateOfBirth
    }
  }`
function EditUser(props) {
  const [changePassword, setChangePassword] = useState(false)
  const [updateUser] = useMutation(UPDATE_USER);
  async function handleUpload() {
    try {

      if (props.user.pdp) {
        console.log("img:", props.user.pdp);
        await updateUser({
          variables: {
            userInput: {
              id: props.id,
              name: props.user.name,
              dateOfBirth: props.user.dateOfBirth,
            },
            image: props.user.pdp,
          },
        }).then(() => { (props.setEdit(false)) });
      }
      else {
        await updateUser({
          variables: {
            userInput: {
              id: props.id,
              name: props.user.name,
              dateOfBirth: props.user.dateOfBirth,
            },
          },
        }).then(() => { (props.setEdit(false)) });;
      }
      // setEdit(false);
    } catch (error) {
    }
    // }
  }
  if (changePassword) {
    return <PasswordUpdate setEdit={props.setEdit} />
  }

  return (
    <>
      <div className={`${styles.pictureContainer} avatar`}>
        <label htmlFor="upload">
          <img
            alt="..."
            style={{ cursor: "pointer", width: "8.5rem", height: "8.5rem" }}
            className={`img-circle img-no-padding img-responsive ${styles.picture}`}
            src={props.user.profileImage}
          />
        </label>
        <input type="file" id="upload" style={{ display: "none" }} accept="image/png, image/jpeg" onChange={(e) => { if (!e.target.files[0]) { return; } else { props.setProfileImage(URL.createObjectURL(e.target.files[0])); props.setPdp(e.target.files[0]); } }} />
      </div>
      <div className="name">
        <Row>
          <Col className="ml-auto mr-auto" md="6">
            <FormGroup>
              <Label for="name">Name</Label>
              <input className="mb-5 form-control" type="text" name="name" id="name" placeholder="Your name" value={props.user.name} onChange={(e) => props.setName(e.target.value)} />
              <Label for="dateOfBirth">Date of Birth</Label>
              <Datetime
                value={props.user.dateOfBirth}
                onChange={(e) => props.setDateOfBirth(e.toDate())}
                timeFormat={false}
                inputProps={{ placeholder: "Insert Your Birthday" }}
                className={` w-100`}
              />
              <Button
                className="btn-round mt-5"
                color="danger"
                onClick={() => setChangePassword(true)}
              >
                Change Password
              </Button>
              <Button
                className="btn-round mt-5"
                color="success"
                disabled={props.user.name?.length < 3 || !!!props.user.dateOfBirth}
                onClick={() => handleUpload()}
              >
                Update
              </Button>
            </FormGroup></Col></Row></div></>
  )
}
export default EditUser;