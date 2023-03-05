import { Navbar, Container,Nav} from "react-bootstrap";
import {NavLink} from 'react-router-dom';
const Header = ()=>{
    return (
      
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >Sahtek</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link >Connexion</Nav.Link>
            <Nav.Link >Inscription</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
       
    );
}

export default Header;