import { useSelector } from 'react-redux';
import  {Navigate}  from 'react-router-dom';

const withAuth = (Component) => {
  const AuthGuard = (props) => {
    const token = useSelector((state) => state.user.token);

    if (!token) {
      // If the user is not logged in, redirect to the login page
      return <Navigate to="/login" />;
    }

    // If the user is logged in, render the component
    return <Component {...props} />;
  };

  return AuthGuard;
};

export default withAuth;