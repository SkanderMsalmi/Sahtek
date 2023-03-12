const initialState = {
    user: null,
    token: null,
  };


  
//   const userReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'USER_LOGIN_SUCCESS':
//         return {
//           ...state,
//           user: action.payload.user,
//           token: action.payload.token,
//         };
//         case 'USER_LOGOUT':
//             return {
//               ...state,
//               user: null,
//               token: null,
//             };
//       default:
//         return state;
//     }
//   };
  
//   export default userReducer;

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_LOGIN_SUCCESS':
        const user = action.payload.user;
        console.log(user);
        console.log(user);
        if (user.patient) {
          return {
            ...state,
            user: user.patient,
            token: action.payload.token,
          };
        } else if (user.therapist) {
          return {
            ...state,
            user: user.therapist,
            token: action.payload.token,
          };
        }
        return state;
      case 'USER_LOGOUT':
        return {
          ...state,
          user:null,
          token: null,
        };
      default:
        return state;
    }
  };

  export default userReducer;
