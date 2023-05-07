import { useSelector } from "react-redux";
import { selectUser } from "../../../store/users/users.selectors";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GET_PATIENTS } from "../../../apis/users";
import { GET_APPOINTMENTS_BYTHERAPIST } from "../../../pages/AppoinmentForTherapist/appforTherapist";
import loader from "../../../assets/img/loading.gif";

const TherapistDashboard = () => {
  const user = useSelector(selectUser);

  const [patients, setPatients] = useState([]);
  const [lastPatient, setLastPatient] = useState("");
  const [numberAppointements, setnumberAppointements] = useState("");
  const { data, loading, error } = useQuery(GET_PATIENTS, {
    variables: { id: user.id },
  });
  const {
    loading: loadingapp,
    error: errorapp,
    data: dataapp,
  } = useQuery(GET_APPOINTMENTS_BYTHERAPIST, {
    variables: { therapist: user.id },
  });
  console.log(dataapp);

  useEffect(() => {
    if (data) {
      setPatients(data?.getPatientsByTherapist);
      setnumberAppointements(dataapp?.getAppointmentsByTherapist?.length);
      setLastPatient(patients.at(0));
    }
  }, [data, patients, dataapp]);

  if (error) {
    return <h1>Error</h1>;
  }
  if (errorapp) {
    return <h1>Error</h1>;
  }
  if (loadingapp) {
    return (
      <div className=" section d-flex justify-content-center align-items-center">
        <img src={loader} alt="Loading..." />
      </div>
    );
  }
  if (loading) {
    return (
      <div className=" section d-flex justify-content-center align-items-center">
        <img src={loader} alt="Loading..." />
      </div>
    );
  }
  return (
    <div
      class="container-fluid py-4"
      style={{ marginTop: "4rem", minHeight: "100vh" }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Welcome Doctor, <span style={{ fontWeight: "bold" }}> {user.name}</span>
      </h1>
      <div class="row">
        <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-header p-3 pt-2">
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize">Patient Number</p>
                <h4 class="mb-0">{patients?.length}</h4>
              </div>
            </div>
            <hr class="dark horizontal my-0" />
            <div class="card-footer p-3">
              <p class="mb-0">
                <span class="text-success text-sm font-weight-bolder">
                  +55%{" "}
                </span>
                than last week
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-header p-3 pt-2">
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize">
                  Appointements This week
                </p>
                <h4 class="mb-0">{numberAppointements}</h4>
              </div>
            </div>
            <hr class="dark horizontal my-0" />
            <div class="card-footer p-3">
              <p class="mb-0">
                <span class="text-success text-sm font-weight-bolder">
                  +3%{" "}
                </span>
                than last week
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-sm-6 mb-xl-0 mb-4">
          <div class="card">
            <div class="card-header p-3 pt-2">
              <div class="text-end pt-1">
                <p class="text-sm mb-0 text-capitalize">New Client</p>
                <h4 class="mb-0">{lastPatient?.name}</h4>
              </div>
            </div>
            <hr class="dark horizontal my-0" />
            <div class="card-footer p-3">
              <p class="mb-0">
                <span class="text-danger text-sm font-weight-bolder">-2%</span>{" "}
                say hi
              </p>
            </div>
          </div>
        </div>
      </div>
      <h3>Patients</h3>
      <table class="table align-items-center mb-0">
        <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Patient
            </th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
              Gender
            </th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Email
            </th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              Profile
            </th>
          </tr>
        </thead>
        <tbody>
          {patients?.map((p) => {
            return (
              <tr>
                <td class="text-center">
                  <div class="d-flex px-2 py-1">
                    <div>
                      <h6 class="mb-0 text-center">{p.name}</h6>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  <div class="d-flex px-2 py-1">
                    <div>
                      <h6 class="mb-0 text-center">{p.gender}</h6>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  <div class="d-flex px-2 py-1">
                    <div>
                      <h6 class="mb-0 text-center">{p.email}</h6>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  <Link to={`/profile/${p.id}`} className="btn btn-primary">
                    {" "}
                    Go To Profile
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TherapistDashboard;
