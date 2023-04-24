import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/users/users.selectors";

const IsPatient = (Component) => {
  const PatientGuard = (props) => {
    const user = useSelector(selectUser);

    if (!user.patient) {
      // If the user is not logged in, redirect to the login page
      return <Navigate to="/profile" />;
    }

    // If the user is logged in, render the component
    return <Component {...props} />;
  };

  return PatientGuard;
};

export default IsPatient;
