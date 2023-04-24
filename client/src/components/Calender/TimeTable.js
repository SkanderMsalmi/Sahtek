import { useSelector } from "react-redux";
import styles from "./TimeTable.module.scss";
import { selectUser } from "../../store/users/users.selectors";
import { Spinner } from "reactstrap";
import { gql, useQuery } from "@apollo/client";

const GET_CONSULTATIONS_QUERY = gql`
query GetAppointmentsByPatient($id: ID!) {
    getAppointmentsByPatient(ID: $id) {
      date
      therapist {
        name
      }
      status
    }
  }
`

function TimeTable() {
    const user = useSelector(selectUser);
    const { loading, error, data } = useQuery(GET_CONSULTATIONS_QUERY, {
        variables: { id: user.id },
    });
    if (loading) return <Spinner />;
    if (error) return <p>Error :</p>;
    if (data.getAppointmentsByPatient?.length === 0) return <p>No appointments this week :(</p>;
    return (

        <div className={styles.timeTable}>
            <table className="table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        <td><small className={styles.time}>9.00</small></td>
                        <td>
                            <h3>Dr. Tanner</h3>
                            <span>Dermatologists</span>
                        </td>
                        <td>
                            <h3>Dr. Kwak</h3>
                            <span>Ear, Nose</span>
                        </td>
                        <td>
                            <h3>Dr. Slaughter</h3>
                            <span>Neurologist</span>
                        </td>
                        <td></td>
                        <td>
                            <h3>Dr. Foley</h3>
                            <span>Oncologist</span>
                        </td>
                        <td>
                            <h3>Dr. Palmer</h3>
                            <span>Maxine lowe</span>
                        </td>
                    </tr>

                    <tr>
                        <td><small className={styles.time}>9.00</small></td>
                        <td></td>
                        <td>
                            <h3>Dr. Megahead</h3>
                            <span>Orthopedics</span>
                        </td>
                        <td>
                            <h3>Dr. Neupane</h3>
                            <span>Pain Management</span>
                        </td>
                        <td>
                            <h3>Dr. Breidin</h3>
                            <span>Radiologist</span>
                        </td>
                        <td></td>
                        <td>
                            <h3>Dr. Pipe</h3>
                            <span>Surgeons</span>
                        </td>
                    </tr>
                    <tr>
                        <td><small className={styles.time}>9.00</small></td>
                        <td>
                            <h3>Dr. Tanner</h3>
                            <span>Dermatologists</span>
                        </td>
                        <td>
                            <h3>Dr. Kwak</h3>
                            <span>Ear, Nose</span>
                        </td>
                        <td></td>
                        <td>
                            <h3>Dr. Slaughter</h3>
                            <span>Neurologist</span>
                        </td>
                        <td>
                            <h3>Dr. Foley</h3>
                            <span>Oncologist</span>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><small className={styles.time}>9.00</small></td>
                        <td>
                            <h3>Dr. Slaughter</h3>
                            <span>Neurologist</span>
                        </td>
                        <td>
                            <h3>Dr. Megahead</h3>
                            <span>Orthopedics</span>
                        </td>
                        <td>
                            <h3>Dr. Neupane</h3>
                            <span>Pain Management</span>
                        </td>
                        <td>
                            <h3>Dr. Breidin</h3>
                            <span>Radiologist</span>
                        </td>
                        <td>
                            <h3>Dr. Kwak</h3>
                            <span>Ear, Nose</span>
                        </td>
                        <td>
                            <h3>Dr. Pipe</h3>
                            <span>Surgeons</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}
export default TimeTable;