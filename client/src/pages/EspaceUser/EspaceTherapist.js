import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import IsTherapist from "../../components/Guard/IsTherapist";
import isVerified from "../../components/Guard/IsVerified";
import withAuth from "../../components/Guard/WithAuth";
const EspaceTherapist = () => {
  return (
    <div className="mt-5 container">
      <Sidebar />
      <div className="main-content" style={{ height: "100vh" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default withAuth(isVerified(IsTherapist(EspaceTherapist)));
