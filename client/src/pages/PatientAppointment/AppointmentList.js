import Consultation from "../../components/Consultations/Consultations"


function AppointmentList() {

    return (
        <>
            <div
                className="section-appo"
                style={{
                    backgroundImage:
                        "url(" + require("../../assets/img/dylan-ferreira-HJmxky8Fvmo-unsplash.jpg") + ")",
                    marginTop: 0,
                    opacity: 0.9
                }}
            >

            </div>
            <br />
            <Consultation />
        </>
    )
}
export default AppointmentList