import { selectUser } from "../../store/users/users.selectors";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PatientList from "../../components/PatientFile/PatientList";
function Patients() {
    const user = useSelector(selectUser);
    let { id } = useParams();
    return (
        <PatientList user={user} />
    )
}

export default Patients;