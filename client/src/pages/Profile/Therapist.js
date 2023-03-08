import styles from "./Profile.module.scss";
import { useQuery, gql } from "@apollo/client";
import Patient from "../../components/Profile/Patient";
import Therapist from "../../components/Profile/Therapist";

// const USER_PROFILE = gql`{
//     therapist(ID: "63ff9e979b0ef818d5217aaf") {
//         id
//         name
//         email
//         password
//         license
//         specialty
//         description
//         availability
//         education
//         experience
//         languages
//         fees
//         ratings
//         reviews
      
//       }
//   }
// `
function TherapistProfile(){
    // const { data, loading, error } = useQuery(USER_PROFILE);
    // if (loading) return "Loading...";
    return (
        
        <div className='flex-fill d-flex justify-content-center align-items-center'>
              <div>
        <div className={`${styles.card} card`}> 
        <img className={`${styles.cardImgTop}`} src="https://scontent.ftun4-2.fna.fbcdn.net/v/t39.30808-6/279018839_3337570976474814_838771906380505204_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_ohc=_Dl1ECjGCFYAX9Phanm&_nc_oc=AQk217Vi7dMpOCORcI0bQ8wauTSiCmVikTmXcxOoufubYkbC1rHLd4hVBQ8hJbP2c0g&_nc_ht=scontent.ftun4-2.fna&oh=00_AfDhX8OyB9UnIWTrBqqn__raB6f6hawp6TnfYC6NrsUYMA&oe=640D0C04" alt="Card cap"/>
            <div className={`${styles.cardBody} ${styles.littleProfile} ${styles.textCenter}`}>
                <div className={`${styles.proImg}`}><img src="https://scontent.ftun4-2.fna.fbcdn.net/v/t1.15752-9/333283058_529606445925876_2882049250710820327_n.png?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=38Apb0TKnWwAX8L2nh9&_nc_oc=AQnTS7P_iemTztLpAs6g8DRadEpXGwr0CeYF15lajx_9QhaP8O1UR_SwzMz9JxCRnN4&_nc_ht=scontent.ftun4-2.fna&oh=03_AdQx7_bbw29ZdqtR9qGCausXkWocwcFYXtlbvJv21-heCA&oe=642ED383" alt="user"/></div>
                {/* <h1>Dr. {data.therapist.name}</h1> */}
                <h1>Dr. Dre</h1>

                {/* <h3 className={`${styles.mb}`}>{data.therapist.specialty}</h3> */}
                <h3 className={`${styles.mb}`}>Speciality</h3>

                {/* <p> PhD in {data.therapist.license}</p>  */}
                <p> PhD in Anixiety</p> 
                <a href="#" className={`${styles.mt} ${styles.wavesEffect} ${styles.wavesDark} ${styles.btn} ${styles.btnPrimary} ${styles.btnMd} ${styles.btnRounded}`} data-abc="true">Contact</a>
                <div className={`${styles.row} ${styles.textCenter} ${styles.mt}`}>
                    <div className={`${styles.mt}`}>
                        <h3 className={`${styles.mb} font-light`}>10434</h3><small>Reviews</small>
                    </div>
                    <div className={`${styles.mt}`}>
                        <h3 className={`${styles.mb}`}>4</h3><small>Stars</small>
                    </div>
                    <div className={`${styles.mt}`}>
                        <h3 className={`${styles.mb}`}>50<small>TND</small></h3><small>Per session</small>
                    </div>
                </div>
                <hr/>
                {/* <Therapist therapist={data.therapist}/> */}
            </div>
        </div>
    </div>
        </div>
    )
}

export default TherapistProfile;