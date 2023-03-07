import styles from "./Profile.module.scss";
import { useQuery, gql } from "@apollo/client";
import Patient from "../../components/Profile/Patient";
import Therapist from "../../components/Profile/Therapist";

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
        <img className={`${styles.cardImgTop}`} src="https://scontent.ftun4-2.fna.fbcdn.net/v/t39.30808-6/279018839_3337570976474814_838771906380505204_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_ohc=_Dl1ECjGCFYAX9Phanm&_nc_oc=AQk217Vi7dMpOCORcI0bQ8wauTSiCmVikTmXcxOoufubYkbC1rHLd4hVBQ8hJbP2c0g&_nc_ht=scontent.ftun4-2.fna&oh=00_AfDhX8OyB9UnIWTrBqqn__raB6f6hawp6TnfYC6NrsUYMA&oe=640D0C04" alt="Card cap"/>
            <div className={`${styles.cardBody} ${styles.littleProfile} ${styles.textCenter}`}>
                <div className={`${styles.proImg}`}><img src="https://scontent.ftun4-2.fna.fbcdn.net/v/t1.15752-9/333283058_529606445925876_2882049250710820327_n.png?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=38Apb0TKnWwAX8L2nh9&_nc_oc=AQnTS7P_iemTztLpAs6g8DRadEpXGwr0CeYF15lajx_9QhaP8O1UR_SwzMz9JxCRnN4&_nc_ht=scontent.ftun4-2.fna&oh=03_AdQx7_bbw29ZdqtR9qGCausXkWocwcFYXtlbvJv21-heCA&oe=642ED383" alt="user"/></div>
                <h3 className={`${styles.mb}`}>{data.patient.name}<span style={{fontSize: "small"}}>(They/Them)</span></h3>
                <h1>{data.patient.email}</h1>

                <p> Patient</p> <a href="#" className={`${styles.mt} ${styles.wavesEffect} ${styles.wavesDark} ${styles.btn} ${styles.btnPrimary} ${styles.btnMd} ${styles.btnRounded}`} data-abc="true">Follow</a>
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
                <Patient/>
            </div>
        </div>
    </div>
        </div>
    )
}

export default Profile;