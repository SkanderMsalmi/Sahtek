
// import styles from './Signin.module.scss';
// import {useForm} from 'react-hook-form';
// import * as yup from 'yup';
// import {yupResolver} from "@hookform/resolvers/yup";
// import { AuthContext } from '../../context';
// import { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// function Signin(){
//     // const {signin,user}= useContext(AuthContext);
//     const validationSchema = yup.object({
//         email: yup.string().required('Il faut préciser votre email').email("l'email n'est pas valide"),
//         password: yup.string().required('Il faut préciser votre mot de passe').min(6,'Mot passe trop court'),
//     });

//     const initalValues = {
//         email:'',
//         password:''
//     }
// const {
//     handleSubmit,
//     // register,
//     formState:{errors,isSubmitting},
//     setError,
//     clearErrors
// }= useForm({
//     initalValues,
//     resolver: yupResolver(validationSchema)
// });

// const submit = handleSubmit( async (credentials)=>{
//     try {
//         clearErrors();
//         // await signin(credentials);
//     } catch (message) {
//         console.log(message);
//         setError('generic',{type:'generic',message});
//     }
// })

//     return (
//         <>
//         {/* {user ? (
//             <Navigate to="/profile" />

//         ):( */}
//             <div className="flex-fill d-flex align-items-center justify-content-center">
//             <form onSubmit={submit} className={ `${styles.form} d-flex flex-column card p-20`}>
//                 <h2>Connexion</h2>
              
//                 <div className='mb-10 d-flex flex-column'>
//                     <label htmlFor="email">Email :</label>
//                     {/* <input type="email" name="email" {...register('email')}/> */}
//                     <input type="email" name="email" />
//                     {errors.email && <p className='form-error'>{errors.email.message}</p>}
//                 </div>
//                 <div className='mb-10 d-flex flex-column'>
//                     <label htmlFor="password">Password :</label>
//                     {/* <input type="password" name="password" {...register('password')}/> */}
//                     <input type="password" name="password" />
//                     {errors.password && <p className='form-error'>{errors.password.message}</p>}
//                 </div>
//                 {errors.generic && <p className='form-error'>{errors.generic.message}</p>}
//                 <div>

//                 <button disabled={isSubmitting} className='btn btn-primary'>Connexion</button>
//                 </div>
//             </form>
//         </div>
//         {/* )} */}
//         </>
        
//     )
// }

// export default Signin;