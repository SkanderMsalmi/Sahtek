// import styles from "./Profile.module.scss";
import { useQuery, gql } from "@apollo/client";
import Patient from "../../components/Profile/Patient";

const USER_PROFILE = gql`{
therapist(ID: "63ff9e979b0ef818d5217aaf") {
    name
    email
    specialty
  }
  }
`
function Therapist(){
    const { data, loading, error } = useQuery(USER_PROFILE);
    if (loading) return "Loading...";
    return (
    <>

    </>
    )
}

export default Therapist;
