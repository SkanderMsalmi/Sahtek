import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./Therapist.module.scss";
import { selectUser } from '../../store/users/users.selectors';
import { useEffect, useState } from "react";
import {Button}  from "reactstrap";

const GET_THERAPIST = gql`query User($id: ID!) {
    user(ID: $id) {
        therapist {
      
            address {
              city
              state
              street
              zip
            }
            availability
            description
            education
            experience
            fees
            languages
            license
            ratings
            reviews
            specialties
            phoneNumber
          }
          
        }
  }`
  const UPDATE_THERAPIST = gql`mutation Mutation($therapistInput: TherapistInput) {
    updateTherapist(therapistInput: $therapistInput) {
      therapist{experience}
    }
  }`

function Therapist(props){
    const user = useSelector(selectUser);
    let { id } = useParams();

    const { data, loading, error } = useQuery(GET_THERAPIST, {
        variables: { id:id? id: user.id },});
    const [updateTherapist] = useMutation(UPDATE_THERAPIST);
    // const [therapist, setTherapist] = useState(null);
    //   useEffect(() => {
    //     if (data) {
    //       setTherapist(data.user.therapist);
    //     }
    //   }, [data])
    const handleSubmit = (e) => {
        e.preventDefault();
        updateTherapist({variables: {therapistInput: editInfo}}).then((res) => {
            console.log(res)
            setEdit(false)
        })
    }
    const [edit, setEdit] = useState(false);
    const [editInfo, setEditInfo] = useState({
        id: user.id,
        address: {
            city: "",
            state: "",
            street: "",
            zip: "",
        },
        availability: [],
        description: "",
        education: [],
        experience: "",
        fees: "",
        languages: [],
        license: "",
        ratings: [],
        reviews: [],
        specialties: [],
        phoneNumber: "",
    });
    console.log(editInfo)
    useEffect(() => {
        if (data) {
           initEdit();
        }
    }, [data])
    const initEdit = () => {
        setEditInfo({id:user.id,
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
            fees: data.user.therapist.fees*1,
            languages: data.user.therapist.languages,
            license: data.user.therapist.license,
            ratings: data.user.therapist.ratings,
            reviews: data.user.therapist.reviews,
            specialties: data.user.therapist.specialties,
            phoneNumber: data.user.therapist.phoneNumber}
            )};
    const handlePhone = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setEditInfo({...editInfo, phoneNumber: e.target.value})
        }
    }

    const handleFees = (e) => {
        const re = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setEditInfo({...editInfo, fees: e.target.value*1})
        }
    }

    const handleEducation = (e,i) => {
        const newEducation = [...editInfo.education];
        newEducation[i] = e.target.value;
        setEditInfo({...editInfo, education: newEducation})
    }

    const handleLanguage = (e,i) => {
        const newLanguages = [...editInfo.languages];
        newLanguages[i] = e.target.value;
        setEditInfo({...editInfo, languages: newLanguages})
    }

    const handleSpecialty = (e,i) => {
        const newSpecialties = [...editInfo.specialties];
        newSpecialties[i] = e.target.value;
        setEditInfo({...editInfo, specialties: newSpecialties})
    }

    return (
    <div className="row">
        <div className="col-md-6">
            <div className="card" style={{height:'100%'}}>
                <div className={`${styles.contactInfo} card-body`} >
                    <h5 className="card-title">Contact info</h5>
                    {edit?  <ul>
                        <li>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg><input className="form-control" type="text" name="phoneNumber" placeholder="Phone number" value={editInfo.phoneNumber} onChange={(e) => handlePhone(e)} />

                        </li>
                        <li>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg > {props.email}
                        </li>
                        <li>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg><div style={{display:"block"}}> <input className="form-control" type="text" name="street" placeholder="Street" value={editInfo?.address?.street} onChange={(e)=> setEditInfo({...editInfo,address:{...editInfo.address,street: e.target.value}})}/> <input className="form-control" type="text" placeholder="zip" name="zip" value={editInfo?.address?.zip} onChange={(e)=> setEditInfo({...editInfo,address:{...editInfo.address,zip: e.target.value}})}/><br/> <input className="form-control" type="text" name="city" placeholder="city" value={editInfo?.address?.city} onChange={(e)=> setEditInfo({...editInfo,address:{...editInfo.address,city: e.target.value}})}/> <input className="form-control" type="text" name="state" placeholder="state" value={editInfo?.address?.state} onChange={(e)=> setEditInfo({...editInfo,address:{...editInfo.address,state: e.target.value}})}/></div>
                        </li>
                    </ul>:  <ul>
                        <li>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>Call : <span>&nbsp;{editInfo.phoneNumber}</span>

                        </li>
                        <li>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg > {props.email}
                        </li>
                        <li>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg> {editInfo.address?.street}, {editInfo.address?.zip} {editInfo.address?.city}, {editInfo.address?.state}
                        </li>
                    </ul>}

                   
                    <br/>
                    <h5>Working hours</h5>
                    <div className="row">
                        <div className="col-md-6">
                            Monday-Friday
                        </div>
                        <div className="col-md-6">
                            9:00 AM - 5:00 PM
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            Saturday
                            </div>
                        <div className="col-md-6">
                            9:00 AM - 1:00 PM
                            </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    Sunday
                                    </div>
                                    <div className="col-md-6">
                                        Closed
                                    </div>
                                    </div>
                                    <br/>
                                    <div style={{width:"fit-content",margin:"auto",textAlign:"center"}}>

                                    <h5>Fees</h5>
                                  {edit? <><input className="form-control" type="text" name="fees" value={editInfo.fees} onChange={(e)=>handleFees(e)} /><br/></>: <p>{editInfo.fees}<small>TND</small></p>}  
                        {user.role==="Patient"? <Button  className="btn-round mt-2"
                      color="success">Make reservation</Button> :""}   
                           </div>        

                </div>
            </div>
        </div>
       {edit?  <div  className={`${styles.contactInfo} col-md-6`}>
            <div style={{display:"flex",alignContent:"center",justifyContent:"space-between"}}>
            <h5>Biography</h5><span><Button className="btn-round" style={{marginRight:"1rem"}} onClick={()=>initEdit()} color="warning">Reset</Button><Button className="btn-round" style={{marginRight:"1rem"}} onClick={(e)=> handleSubmit(e)} color="success">Save</Button><i onClick={()=>setEdit(!edit)} className={`${styles.gear} fa-solid fa-gear`}></i></span>
            </div>
            <textarea className="form-control" name="description" placeholder="Describe yourself" value={editInfo.description} onChange={(e) => setEditInfo({...editInfo,description:e.target.value})} />
            <div className="row">
                   <div  className={`${styles.contactInfo} col-md-6`}>

            <h5>Education</h5>
            <ul style={{padding:0}}>
                <Button className="btn-round" color="success" onClick={()=>setEditInfo({...editInfo,education:[...editInfo.education,""]})}>Add</Button>
                {editInfo.education.map((edu,i) => {
                    return <li><input className="form-control" type="text" name="education" value={edu} onChange={(e)=>handleEducation(e,i)} /></li>
                })}
               
            </ul>
        
            <br/>
            <h5>Languages</h5>
            <Button className="btn-round" color="success" onClick={()=>setEditInfo({...editInfo,languages:[...editInfo.languages,""]})}>Add</Button>
            <p>{editInfo.languages.map((l,i)=>{return <input className="form-control" type="text" name="language" value={l} onChange={(e)=>handleLanguage(e,i)}/>})}</p>
            <h5>Years of experience</h5>
            <p>{data?.user?.therapist.experience} years.</p>
            </div>
            <div  className={`${styles.contactInfo} col-md-6`}>
            <h5>Specialties</h5>
            <Button className="btn-round" color="success" onClick={()=>setEditInfo({...editInfo,specialties:[...editInfo.specialties,""]})}>Add</Button>

            <ul style={{padding:0}}>
                {editInfo.specialties.map((s,i) => {
                    return <input className="form-control" type="text" name="specialty" value={s} onChange={(e)=>handleSpecialty(e,i)}/>
                })}
            </ul>
            <h5>License</h5>
            <input className="form-control" type="text" name="license" value={editInfo.license} onChange={(e)=>setEditInfo({...editInfo,license:e.target.value})} />
            </div>
            </div>
        </div>: <div  className={`${styles.contactInfo} col-md-6`}>
            <div style={{display:"flex",alignContent:"center",justifyContent:"space-between"}}>
            <h5>Biography</h5><i onClick={()=>setEdit(!edit)} className={`${styles.gear} fa-solid fa-gear`}></i>
            </div>
            <p>{editInfo.description}</p>
            <div className="row">
                   <div  className={`${styles.contactInfo} col-md-6`}>

            <h5>Education</h5>
            <ul style={{padding:0}}>
                {editInfo.education.map((edu) => {
                    return <li>{edu}</li>
                })}
               
            </ul>
        
            <br/>
            <h5>Languages</h5>
            <p>{editInfo.languages.map((l)=>{return <span>&nbsp;{l},</span>})}</p>
            <h5>Years of experience</h5>
            <p>{data?.user?.therapist.experience} years.</p>
            </div>
            <div  className={`${styles.contactInfo} col-md-6`}>
            <h5>Specialties</h5>
            <ul style={{padding:0}}>
                {editInfo.specialties.map((s) => {
                    return <li>{s}</li>
                })}
            </ul>
            <h5>License</h5>
            <p>Major in {editInfo.license}</p>
            </div>
            </div>
        </div>}
    </div>
    )
}

export default Therapist;
