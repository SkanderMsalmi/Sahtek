import styles from  "./resetPassword.module.scss";
import { useMutation,gql } from '@apollo/client';
import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

export const RESET_PASSWORDLink = gql`
  mutation resetPasswordlink($userid:String!,$token:String!,$newpassword:String!){
    resetPasswordlink(userid:$userid,token:$token,newpassword:$newpassword)
  }
`;




function Resetpassword (){
    const navigate = useNavigate();
    const [newpassword,setnewPassword]= useState('');
    const [resetPasswordLink] = useMutation(RESET_PASSWORDLink);
    const [confirmPassword,setConfirmPassword]= useState('');
    const tokenValue = useParams('token');
    const userid = useParams('userid');

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await resetPasswordLink({ variables: { 
        "newpassword":newpassword,
        "userid":userid.userid,
        "token":tokenValue.token} });
      if (data.resetPasswordLink) {
        alert('succes!');
      }
    } catch (error) {
      alert("aaaa");
    }
  };


    return (
        <section>
            <div className={styles.formBox}>
                <form onSubmit={handleSubmit}>
                    <h2 style={{color:"#fff"}}>Reset Password</h2>
                    <div className={styles.inputbox}>
                        <input name="newpassword"type="password" className={styles.userInput} required maxLength={10} minLength={6} value={newpassword} onChange={(e)=> setnewPassword(e.target.value)} />
                        <label htmlFor="password" className={styles.userLabel} >Enter New Password</label>
                    </div>
                    <div className={styles.inputbox}>
                        <input name="password2" type="password" className={styles.userInput} required maxLength={10} minLength={6}  value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
                        <label htmlFor="password" className={styles.userLabel} >confirm Password</label>
                    </div>
                   
                   <button>Submit</button>
                   
                </form>

            </div>
        </section>
    )
}

export default Resetpassword ;