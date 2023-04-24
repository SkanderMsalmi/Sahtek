import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import IsPatient from "../../components/Guard/IsPatient";
import isVerified from "../../components/Guard/IsVerified";
import withAuth from "../../components/Guard/WithAuth";
const EspacePatient = () => {
  return (
    <div className="mt-5 container">
      <Sidebar />
      <div className="main-content" style={{ minHeight: "100vh", paddingTop: "2rem" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default withAuth(isVerified(IsPatient(EspacePatient)));
