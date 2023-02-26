import { useContext } from 'react';
import { AuthContext } from '../../context';
import styles from './Profile.module.scss';
function Profile(){
    const {user} = useContext(AuthContext);
    return (
        <div className='flex-fill d-flex justify-content-center align-items-center'>
            <div className={`${styles.profileContainer} card p-20`}>
                <ul>
                    <li>Nom : {user.name}</li>
                    <li>Email : {user.email}</li>
                </ul>
            </div>
        </div>
    )
}

export default Profile;