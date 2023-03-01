// import { useContext } from "react";
import { NavLink } from "react-router-dom";
// import { AuthContext } from "../../context";
import styles from "./Header.module.scss";
function Header(){
    // const {user,signout} = useContext(AuthContext);

    return (
        <header className={`${styles.header} d-flex flex-row align-items-center`}>
            <div className="flex-fill">
                <NavLink to="/">
                <strong>Sahtek</strong>
                </NavLink>
            </div>
            {true ? (
                 <ul className={styles.hearList}>
                 <NavLink to="profile" className="mr-15">Profil</NavLink>
                 <NavLink >Deconnexion</NavLink>
             </ul>
            ):(
                <ul className={styles.hearList}>
                <NavLink to="signup" className="mr-15">Inscription</NavLink>
                <NavLink to="signin">Connexion</NavLink>
            </ul>
            )}
           
        </header>
    )
}

export default Header;