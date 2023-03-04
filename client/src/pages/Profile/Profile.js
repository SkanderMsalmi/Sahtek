import styles from "./Profile.module.scss";
import { useQuery, gql } from "@apollo/client";

const USER_PROFILE = gql`{
getFeedbacks {
    remarks
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
        <img className={`${styles.cardImgTop}`} src="https://i.ytimg.com/vi/0Hp-U63b56s/maxresdefault.jpg" alt="Card cap"/>
            <div className={`${styles.cardBody} ${styles.littleProfile} ${styles.textCenter}`}>
                <div className={`${styles.proImg}`}><img src="https://scontent.ftun14-1.fna.fbcdn.net/v/t1.6435-9/40389304_1784181445032214_8440292111726673920_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=iC-KEPLYaJgAX_cPRM0&_nc_ht=scontent.ftun14-1.fna&oh=00_AfCX4oDB8jckmCWAy6ZCkbZCmuP7jcQFWdmM_ln_CsOXhQ&oe=64295A58" alt="user"/></div>
                <h3 className={`${styles.mb}`}>Oumayma Hajri<span style={{fontSize: "small"}}>(They/Them)</span></h3>
                <h1>{data.getFeedbacks[0].remarks}</h1>

                <p>M3a9da &amp; Developer</p> <a href="#" className={`${styles.mt} ${styles.wavesEffect} ${styles.wavesDark} ${styles.btn} ${styles.btnPrimary} ${styles.btnMd} ${styles.btnRounded}`} data-abc="true">Follow</a>
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