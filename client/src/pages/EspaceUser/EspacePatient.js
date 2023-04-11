import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import IsPatient from "../../components/Guard/IsPatient";
import isVerified from "../../components/Guard/IsVerified";
import withAuth from "../../components/Guard/WithAuth";
const EspacePatient = () => {
  return (
    <div className="mt-5 container">
      <Sidebar />
      <div className="main-content" style={{ height: "100vh" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default withAuth(isVerified(IsPatient(EspacePatient)));
