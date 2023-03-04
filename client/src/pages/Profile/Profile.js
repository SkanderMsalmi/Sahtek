import styles from "./Profile.module.scss";

function Profile(){
    return (
        
        <div className='flex-fill d-flex justify-content-center align-items-center'>
              <div>
        <div class={`${styles.card} card`}> 
        <img class={`${styles.cardImgTop}`} src="https://i.ytimg.com/vi/0Hp-U63b56s/maxresdefault.jpg" alt="Card image cap"/>
            <div class={`${styles.cardBody} ${styles.littleProfile} ${styles.textCenter}`}>
                <div class={`${styles.proImg}`}><img src="https://scontent.ftun14-1.fna.fbcdn.net/v/t1.6435-9/40389304_1784181445032214_8440292111726673920_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=iC-KEPLYaJgAX_cPRM0&_nc_ht=scontent.ftun14-1.fna&oh=00_AfCX4oDB8jckmCWAy6ZCkbZCmuP7jcQFWdmM_ln_CsOXhQ&oe=64295A58" alt="user"/></div>
                <h3 class={`${styles.mb}`}>Oumayma Hajri<span style={{fontSize: "small"}}>(They/Them)</span></h3>
                <p>M3a9da &amp; Developer</p> <a href="javascript:void(0)" class={`${styles.mt} ${styles.wavesEffect} ${styles.wavesDark} ${styles.btn} ${styles.btnPrimary} ${styles.btnMd} ${styles.btnRounded}`} data-abc="true">Follow</a>
                <div class={`${styles.row} ${styles.textCenter} ${styles.mt}`}>
                    <div class={`${styles.mt}`}>
                        <h3 class={`${styles.mb} font-light`}>10434</h3><small>Articles</small>
                    </div>
                    <div class={`${styles.mt}`}>
                        <h3 class={`${styles.mb}`}>1</h3><small>Followers</small>
                    </div>
                    <div class={`${styles.mt}`}>
                        <h3 class={`${styles.mb}`}>5454k</h3><small>Following</small>
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