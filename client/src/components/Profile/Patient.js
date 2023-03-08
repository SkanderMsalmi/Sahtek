import styles from "./Patient.module.scss";
import { useQuery, gql } from "@apollo/client";

const USER_PROFILE = gql`{
patient(ID: "63ff9da42965a563aa1f0070") {
    name
    email
  }
  }
`
function Patient(){
    const { data, loading, error } = useQuery(USER_PROFILE);
    if (loading) return "Loading...";
    return (
        <ul className={`${styles.posts}`}>
            <li>
                <div>
                    <div>
                        <img src="https://scontent.ftun4-2.fna.fbcdn.net/v/t1.15752-9/333283058_529606445925876_2882049250710820327_n.png?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=38Apb0TKnWwAX8L2nh9&_nc_oc=AQnTS7P_iemTztLpAs6g8DRadEpXGwr0CeYF15lajx_9QhaP8O1UR_SwzMz9JxCRnN4&_nc_ht=scontent.ftun4-2.fna&oh=03_AdQx7_bbw29ZdqtR9qGCausXkWocwcFYXtlbvJv21-heCA&oe=642ED383"/>
                        <div>
                            <a href="#">I have only recently found this particular solution.</a>
                            <p>Posted by {data.patient.name} on 12/12/2021</p>
                            <p className={`${styles.post}`}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat</p>
                        </div>
                    </div>
                    <div>
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg>
                        <span>25</span>
                    </div>
                </div>
            </li>
            <li>
                <div>
                    <div>
                        <img src="https://scontent.ftun4-2.fna.fbcdn.net/v/t1.15752-9/333283058_529606445925876_2882049250710820327_n.png?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=38Apb0TKnWwAX8L2nh9&_nc_oc=AQnTS7P_iemTztLpAs6g8DRadEpXGwr0CeYF15lajx_9QhaP8O1UR_SwzMz9JxCRnN4&_nc_ht=scontent.ftun4-2.fna&oh=03_AdQx7_bbw29ZdqtR9qGCausXkWocwcFYXtlbvJv21-heCA&oe=642ED383"/>
                        <div>
                            <a href="#">I have only recently found this particular solution.</a>
                            <p>Posted by {data.patient.name} on 12/12/2021</p>
                            <p className={`${styles.post}`}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat</p>
                        </div>
                    </div>
                    <div>
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg>
                        <span>25</span>
                    </div>
                </div>
            </li>
            <li>
                <div>
                    <div>
                        <img src="https://scontent.ftun4-2.fna.fbcdn.net/v/t1.15752-9/333283058_529606445925876_2882049250710820327_n.png?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=38Apb0TKnWwAX8L2nh9&_nc_oc=AQnTS7P_iemTztLpAs6g8DRadEpXGwr0CeYF15lajx_9QhaP8O1UR_SwzMz9JxCRnN4&_nc_ht=scontent.ftun4-2.fna&oh=03_AdQx7_bbw29ZdqtR9qGCausXkWocwcFYXtlbvJv21-heCA&oe=642ED383"/>
                        <div>
                            <a href="#">I have only recently found this particular solution.</a>
                            <p>Posted by {data.patient.name} on 12/12/2021</p>
                            <p className={`${styles.post}`}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat</p>
                        </div>
                    </div>
                    <div>
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg>
                        <span>25</span>
                    </div>
                </div>
            </li>
            <li>
                <div>
                    <div>
                        <img src="https://scontent.ftun4-2.fna.fbcdn.net/v/t1.15752-9/333283058_529606445925876_2882049250710820327_n.png?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=38Apb0TKnWwAX8L2nh9&_nc_oc=AQnTS7P_iemTztLpAs6g8DRadEpXGwr0CeYF15lajx_9QhaP8O1UR_SwzMz9JxCRnN4&_nc_ht=scontent.ftun4-2.fna&oh=03_AdQx7_bbw29ZdqtR9qGCausXkWocwcFYXtlbvJv21-heCA&oe=642ED383"/>
                        <div>
                            <a href="#">I have only recently found this particular solution.</a>
                            <p>Posted by {data.patient.name} on 12/12/2021</p>
                            <p className={`${styles.post}`}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat</p>
                        </div>
                    </div>
                    <div>
                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg>
                        <span>25</span>
                    </div>
                </div>
            </li>
        </ul>
    )
}
export default Patient;