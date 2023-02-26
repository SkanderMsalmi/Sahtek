import styles from "./Footer.module.scss";

function Footer(){
    return (
        <footer 
        className={`${styles.footer} d-flex flex-row align-items-center justify-content-center p-20` }
        >
            <p>Copyright c 2023 Dev-Teamk, Inc.</p>
        </footer>
    )
}

export default Footer;