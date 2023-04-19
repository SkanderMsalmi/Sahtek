import SideNav, {
  Toggle,
  NavItem,
  NavIcon,
  NavText,
  Nav,
} from "@trendmicro/react-sidenav";
import { selectUser } from "../../store/users/users.selectors";
import { useSelector } from "react-redux";
import "./SideBar.css"; // import your custom CSS file
import { useHistory, useNavigate } from "react-router-dom";
import { useState } from "react";
function Sidebar() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(route);
  };
  console.log(user);
  const [expanded, setExpanded] = useState(false);
  return (
    <SideNav
      onSelect={(selected) => {
        console.log(selected);
      }}
      expanded={expanded}
      onToggle={(expanded) => {
        setExpanded(expanded);
      }}
      className="custom-navbar"
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        {user.role === "Patient" ? (
          <>
            <NavItem
              eventKey="dashboard"
              onClick={() => handleNavigate("/espace-patient")}
            >
              <NavIcon>
                {" "}
                <i className="fa-solid fa-gauge"></i>
              </NavIcon>

              <NavText>get your appontment</NavText>
            </NavItem>
            <NavItem
              eventKey="Appoitments"
              onClick={() => handleNavigate("/espace-patient/appointments")}
            >
              <NavIcon>
                {" "}
                <i className="fa-solid fa-calendar-check"></i>
              </NavIcon>
              <NavText>Appoitments</NavText>
            </NavItem>
            <NavItem
              eventKey="Appoitments"
              onClick={() => handleNavigate("/espace-patient/therapist")}
            >
              <NavIcon>
                {" "}
                <i className="fa-solid fa-user-doctor"></i>
              </NavIcon>
              <NavText>My Therapist</NavText>
            </NavItem>
            <NavItem
              eventKey="Appoitments"
              onClick={() => handleNavigate("/espace-patient/settings")}
            >
              <NavIcon>
                {" "}
                <i className="fa-solid fa-gear"></i>
              </NavIcon>
              <NavText>Settings</NavText>
            </NavItem>
          </>
        ) : (
          <>
            {" "}
            <NavItem
              eventKey="dashboard"
              onClick={() => handleNavigate("/espace-therapist")}
              active
            >
              <NavIcon>
                {" "}
                <i className="fa-solid fa-gauge"></i>
              </NavIcon>

              <NavText>Dashboard</NavText>
            </NavItem>
            <NavItem
              eventKey="Calendar"
              onClick={() => handleNavigate("/espace-therapist/calendar")}
            >
              <NavIcon>
                {" "}
                <i className="fa-solid fa-calendar-check"></i>
              </NavIcon>
              <NavText>Calendar</NavText>
            </NavItem>
            <NavItem
              eventKey="Patients"
              onClick={() => handleNavigate("/espace-therapist/patients")}
            >
              <NavIcon>
                {" "}
                <i className="fa-solid fa-user-doctor"></i>
              </NavIcon>
              <NavText>Patients</NavText>
            </NavItem>
            <NavItem
              eventKey="Settings"
              onClick={() => handleNavigate("/espace-therapist/settings")}
            >
              <NavIcon>
                {" "}
                <i className="fa-solid fa-gear"></i>
              </NavIcon>
              <NavText>Settings</NavText>
            </NavItem>
          </>
        )}
      </SideNav.Nav>

      {expanded && (
        <>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              width: "100%",
            }}
          >
            <hr className="text-white" />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <img
                src={user.profileImage}
                alt="profil"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "100%",
                }}
              />
              <p style={{ textAlign: "center", color: "white" }}>
                {user.email}
              </p>
            </div>
          </div>
        </>
      )}
    </SideNav>
  );
  // <div className="sidebar">
  //   <Nav vertical>
  //     {user.role === "Patient" ? (
  //       <>
  //         <h3 className="sidebar-heading">Espace Patient</h3>
  //         <NavItem>
  //           <NavLink className="nav-link" to="/espace-patient/dashboard">
  //             Dashboard
  //           </NavLink>
  //         </NavItem>
  //         <NavItem>
  //           <NavLink className="nav-link" to="/espace-patient/appointments">
  //             Appointments
  //           </NavLink>
  //         </NavItem>
  //         <NavItem>
  //           <NavLink className="nav-link" to="/espace-patient/settings">
  //             Settings
  //           </NavLink>
  //         </NavItem>
  //       </>
  //     ) : (
  //       <>
  //         <h3 className="sidebar-heading">Espace Therapist</h3>
  //         <NavItem>
  //           <NavLink className="nav-link" to="/espace-therapist/dashboard">
  //             Dashboard
  //           </NavLink>
  //         </NavItem>
  //         <NavItem>
  //           <NavLink className="nav-link" to="/espace-therapist/appointments">
  //             Appointments
  //           </NavLink>
  //         </NavItem>
  //         <NavItem>
  //           <NavLink className="nav-link" to="/espace-therapist/settings">
  //             Settings
  //           </NavLink>
  //         </NavItem>
  //       </>
  //     )}
  //   </Nav>
  // </div>
}

export default Sidebar;
