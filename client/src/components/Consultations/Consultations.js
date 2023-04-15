import { useSelector } from "react-redux";
import { selectUser } from "../../store/users/users.selectors";
import { Button, Spinner } from "reactstrap";
import { gql, useQuery } from "@apollo/client";
import withAuth from "../Guard/WithAuth";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import styles from "./Consultations.module.scss"
import moment from "moment";

const GET_CONSULTATIONS_QUERY = gql`
query GetAppointmentsByPatient($id: ID!) {
    getAppointmentsByPatient(ID: $id) {
      id
      date
      therapist {
        id
        name
        profileImage
      }
      status
    }
  }
`

function Consultation() {

    const user = useSelector(selectUser);
    const { loading, error, data } = useQuery(GET_CONSULTATIONS_QUERY, {
        variables: { id: user.id },
    });
    if (loading) return <center> <Spinner /> <br /></center>;
    if (error) return <p>Error :(</p>;
    if (data.getAppointmentsByPatient?.length === 0) return <p>No appointments this week :(</p>;
    return (
        <div className="d-flex justify-content-around" style={{ flexWrap: "wrap", columnGap: "5rem", rowGap: "4rem" }}>

            {data?.getAppointmentsByPatient?.map((appointment) => (
                <div className={`card ${styles.c}`} style={{ width: "18rem" }}>
                    <img src={appointment.therapist.profileImage} className={`card-img-top ${styles.i}`} alt="..." />
                    <div className="card-body">
                        <Link to={`/profile/${appointment.therapist.id}`}><h5 className="card-title">{appointment.therapist.name}</h5></Link>
                        <p className="card-text">
                            {moment(appointment.date * 1).format("MM/DD/YYYY HH:mm")}
                            {/* {new Date(appointment.date * 1).getDate()}/{new Date(appointment.date * 1).getMonth() + 1}/{new Date(appointment.date * 1).getFullYear()} {new Date(appointment.date * 1).getHours() === 0 ? 11 : new Date(appointment.date * 1).getHours() - 1}:00 */}
                            {/* {new Date(appointment.date * 1).getDate()}/{new Date(appointment.date * 1).getMonth()}/{new Date(appointment.date * 1).getFullYear()}   {new Date(appointment.date * 1).getHours()}:00 HH
                            <br />{new Date(appointment.date * 1).toLocaleString()} */}
                        </p>
                        {appointment.status !== "Confirmed" ? <p>Waiting for confirmation</p> : <br />}
                        <Button disabled={appointment.status !== "Confirmed"} tag={Link} to={`/videoCall/${appointment.id}`} className="btn btn-primary" style={{ borderRadius: "2em" }}>Go to call</Button>
                    </div>
                </div>


            ))}
        </div>

    )
}

export default withAuth(Consultation);
