/*!

=========================================================
* Paper Kit React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext } from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import logoSahtek from "../../assets/img/logoSahtek.png";
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../store/users/user.actions";
import { selectUser } from "../../store/users/users.selectors";

function Navigation() {
  // const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const url = useLocation();
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    // Dispatch the action to update the store
    dispatch(userLogout());
    navigate("/login");
  };
  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 49 ||
        document.body.scrollTop > 49
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 50 ||
        document.body.scrollTop < 50
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/index"
            title="Mental Health Website"
            style={{ padding: "0" }}
          >
            <Link to={"/"}>
              <img
                src={logoSahtek}
                alt="Sahtek"
                width="120px"
                style={{ border: "1px solid gray", mixBlendMode: "color-burn" }}
              />
            </Link>
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            {!user && (
              <>
                <NavItem>
                  <NavLink tag={Link} to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#services">Services</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#contactus">Contact us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#aboutus">About us</NavLink>
                </NavItem>
              </>
            )}

            {user && user.verified ? (
              <>
                {user.role === "Patient" ? (
                  <>
                    <NavItem>
                      <NavLink tag={Link} to="/chat">
                        Doc Bot
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} to="/shop">
                        Shop
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} to="/forum">
                        Forum
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} to="/espace-patient">
                        Espace Patient
                      </NavLink>
                    </NavItem>
                  </>
                ) : (
                  <>
                    <NavItem>
                      <Link color="info" to="/forum">
                        Forum
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Button
                        className="btn-round"
                        color="secondary"
                        tag={Link}
                        to="/espace-therapist"
                      >
                        Espace Therapist
                      </Button>
                    </NavItem>
                  </>
                )}
                <NavItem>
                  <Button
                    className="btn-round"
                    color="primary"
                    tag={Link}
                    to="/profile"
                  >
                    Profile
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    className="btn-round"
                    color="danger"
                    onClick={handleLogout}
                  >
                    Deconnexion
                  </Button>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <Button
                    className="btn-round"
                    color="primary"
                    tag={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    className="btn-round"
                    color="danger"
                    tag={Link}
                    to="/register"
                  >
                    Register
                  </Button>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
