import { useMutation,gql } from '@apollo/client';
import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from './Rdv.module.scss'
import {
  Button,
  Card,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";






function Rdv (){
    





    return (
        <>
  <div>
        <div  className="section-appo"
           style={{
           backgroundImage:
          "url(" + require("../../assets/img/appo.jpg") + ")",
           }}>
         <h2>Get Your Appointment </h2>
         <h4>Home - Appoitment</h4>

        </div>
<div class={`${styles.tt}`}>
  
  <div class={`${styles.card} card`}>
    <h3>Book your appoitment</h3>
    <form action="https://formbold.com/s/FORM_ID">
      <div class={`${styles.formboldmb5}`}>
        <h5>choose your doctor</h5>
        <option
          type="text"
          name="name"
          id="name"
          placeholder="choose a doctor"
          class={`${styles.formboldforminput}`}
          
        />
      </div>
      <div class={`${styles.formboldmb5}`}
          >
        <textarea
          type="text"
          name="phone"
          id="phone"
          placeholder="Write your message here..."
          class={`${styles.formboldforminput}`}
        />
      </div>
     
      <div class="flex flex-wrap formbold--mx-3">
        <div class="w-full sm:w-half formbold-px-3">
          <div class="formbold-mb-5 w-full">
            <label for="date"class={`${styles.formboldformlabel}`}> Date </label>
            <input
              type="date"
              name="date"
              id="date"
              class={`${styles.formboldforminput}`}
            />
          </div>
        </div>
        <div class="w-full sm:w-half formbold-px-3">
          <div class="formbold-mb-5">
            <label for="time" class={`${styles.formboldformlabel}`}> Time </label>
            <input
              type="time"
              name="time"
              id="time"
              class={`${styles.formboldforminput}`}
            />
          </div>
        </div>
      </div>
    <div>
        <button class={`${styles.formboldbtn}`}>Book Appointment</button>
      </div>
    </form>
  </div>
  <div class={`${styles.work}`}>
    <h3 class={`${styles.fontt}`}>Working Hours</h3>
    <div class={`${styles.dispo}`}>
    <h5 class={`${styles.day}`}>Monday - Friday <br></br> Saturday</h5><h5 class={`${styles.time}`}>8:00am To 6:00pm<br></br>9:00am To 1:00pm</h5>
    
    </div>
</div>
  </div>
</div>
        </>
    //     <div
    //     className="section section-image section-login"
    //     style={{
    //       backgroundImage:
    //         "url(" + require("../../assets/img/login-image.jpg") + ")",
    //     }}
    //   >
    //     <Container>
    //       <Row>
    //         <Col className="bloc" lg="4" md="6">
    //           <Card className="card-appoitment">
    //             <h3 className="title mx-auto">book an appoitment</h3>
    //             <div className="social-line text-center">
                 
    //             </div>
    //             <Form className="register-form" >
                  
    //               <InputGroup
                    
    //               >
    //                 <InputGroupAddon addonType="prepend">
    //                   <InputGroupText>
                        
    //                   </InputGroupText>
    //                 </InputGroupAddon>
    //                 <input
    //                   className="form-control"
    //                   placeholder="choose a doctor"
    //                   type="text"
                    
    //                 />
    //               </InputGroup>
                                   
    //               <InputGroup>
                  
    //                 <InputGroupAddon addonType="prepend">
    //                   <InputGroupText>
                        
    //                   </InputGroupText>
    //                 </InputGroupAddon>
    //                 <input
    //                   className="form-control"
    //                   placeholder="choose a date"
    //                   type="datetime-local"
                      
    //                 />
    //               </InputGroup>
    //               <InputGroup>
                  
    //               <InputGroupAddon addonType="prepend">
    //                 <InputGroupText>
                      
    //                 </InputGroupText>
    //               </InputGroupAddon>
    //               <textarea
    //                 className="form-control"
    //                 placeholder="note"
    //                 type="text"
                    
    //               />
    //             </InputGroup>
  
                 
                 
                
                
    //               <Button
    //                 block
    //                 className="btn-round"
    //                 color="danger"
    //                 type="submit"
    //                 //onClick={(e) => handleSubmit(e)}
    //               >
    //                 book 
    //               </Button>
    //             </Form>
                
    //           </Card>
    //         </Col>
    //       </Row>
    //     </Container>
    //   </div>
       
  );
}

export default Rdv ;