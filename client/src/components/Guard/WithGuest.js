import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const withGuest = (Component) => {
  const GuestGuard = (props) => {
    const token = useSelector((state) => state.user.token);

    if (token) {
      // If the user is logged in, redirect to the home page
      return <Navigate to="/" />;
    }

    // If the user is not logged in, render the component
    return <Component {...props} />;
  };

  return GuestGuard;
};

export default withGuest;