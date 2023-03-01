// import { useState } from "react";
// import { useLoaderData } from "react-router-dom";
// import { signin as login,signout as logout} from "../../apis/auth";
// import { AuthContext } from "../../context";

// function AuthProvider({children}){
//     const initalUser = useLoaderData();
//     const [user,setUser]= useState(initalUser);

//     async function signin(credentials){
//         const newUser = await login(credentials);
//         setUser(newUser);
//     }

//     async function signout(){
//         await logout();
//         setUser(null);
//     }

//     console.log(initalUser);
//     return <AuthContext.Provider value={{
//         user,
//         signin,
//         signout,
//     }} >{children}</AuthContext.Provider>;
// }

// export default AuthProvider;