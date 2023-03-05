import styles from "./Profile.module.scss";
import { useQuery, gql } from "@apollo/client";

const USER_PROFILE = gql`{
patient(ID: "63ff9da42965a563aa1f0070") {
    name
    email
  }
  }
`
function Profile(){
    const { data, loading, error } = useQuery(USER_PROFILE);
    if (loading) return "Loading...";
    return (
        
        <div className='flex-fill d-flex justify-content-center align-items-center'>
              <div>
        <div className={`${styles.card} card`}> 
        <img className={`${styles.cardImgTop}`} src="https://images.unsplash.com/photo-1513152697235-fe74c283646a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGhvdG8lMjBwcm9maWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="Card cap"/>
            <div className={`${styles.cardBody} ${styles.littleProfile} ${styles.textCenter}`}>
                <div className={`${styles.proImg}`}><img src="https://images.unsplash.com/photo-1513152697235-fe74c283646a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGhvdG8lMjBwcm9maWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="user"/></div>
                <h3 className={`${styles.mb}`}>{data.patient.name}<span style={{fontSize: "small"}}>(They/Them)</span></h3>
                <h1>{data.patient.email}</h1>

                <p> Developer</p> <a href="#" className={`${styles.mt} ${styles.wavesEffect} ${styles.wavesDark} ${styles.btn} ${styles.btnPrimary} ${styles.btnMd} ${styles.btnRounded}`} data-abc="true">Follow</a>
                <div className={`${styles.row} ${styles.textCenter} ${styles.mt}`}>
                    <div className={`${styles.mt}`}>
                        <h3 className={`${styles.mb} font-light`}>10434</h3><small>Articles</small>
                    </div>
                    <div className={`${styles.mt}`}>
                        <h3 className={`${styles.mb}`}>1</h3><small>Followers</small>
                    </div>
                    <div className={`${styles.mt}`}>
                        <h3 className={`${styles.mb}`}>5454k</h3><small>Following</small>
                    </div>
                </div>
                <hr/>
                <h1>Profile Content</h1>
            </div>
        </div>
    </div>
        </div>
    )
}

export default Profile;