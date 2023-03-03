import {Nav,Navbar,NavLink} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Header = ()=>{
    return(
        <Navbar collapseOnSelect expand="sm" bg="dark" variant='dark' >
            <Navbar.Toggle aria-controls='navbarScroll' data-bs-target="#navbarScroll"/>
            <Navbar.Collapse id="navbarScroll">
                <Nav>
                    <NavLink  >Home</NavLink>
                    <NavLink  >About</NavLink>
                    <NavLink  >Contact</NavLink>
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    )
}

export default Header;