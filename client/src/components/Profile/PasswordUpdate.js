import { gql, useMutation } from "@apollo/client";
import { useState } from "react"
import { useSelector } from "react-redux";
import { Button, Col, FormGroup, Label, Row } from "reactstrap";
import { selectUser } from "../../store/users/users.selectors";
import EditUser from "./EditUser";

const UPDATE_PASSWORD = gql`
mutation Update($userInput: UserUpdateInput) {
    update(userInput: $userInput) {
      email
    }
  }`

function PasswordUpdate(){
    const user = useSelector(selectUser);
    const [updatePassword] = useMutation(UPDATE_PASSWORD)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [updateProfile,setUpdateProfile]=useState(false)
    const handleUpdate = () => {
        if(newPassword !== confirmPassword){
            alert("Passwords do not match")
        }
        else{
            updatePassword({variables: {userInput: {id:user.id,oldPassword: oldPassword,password: newPassword}}}).then(() => {
            alert("Password updated")})
            setUpdateProfile(true)

        }
    }
    if (updateProfile) {
        return <EditUser user={user}/>
    }
    return (
        <>
                <div className="avatar">
                  <img
                    alt="..."
                    className="img-circle img-no-padding img-responsive"
                    style={{ width: "8.5rem", height: "8.5rem" }}
                    src={user.profileImage}
                  />
                </div>
        <div className="name">
        <Row>
          <Col className="ml-auto mr-auto" md="6">
<FormGroup> 
            <Label  for="oldPw">Old Password</Label>
            <input className="mb-5 form-control" type="password" name="name" id="name" placeholder="Old password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
            <Label  for="oldPw">New Password</Label>
            <input className="mb-5 form-control" type="password" name="name" id="name" placeholder="New password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
            <Label  for="oldPw">Confirm Password</Label>
            <input className="mb-5 form-control" type="password" name="name" id="name" placeholder="Old password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <Button
                className="btn-round mt-5"
                color="danger"
                onClick={() => setUpdateProfile(true)}
              >
                Cancel
              </Button>
<Button
                className="btn-round mt-5"
                color="success"
                disabled={oldPassword===""||newPassword===""||confirmPassword===""}
                onClick={() => handleUpdate()}
              >
                Update
              </Button>
            </FormGroup></Col></Row></div>
            </>
    )
}

export default PasswordUpdate