import loader from "../assets/img/loading.gif";

const Loading = () => {
    return (
        <div style={{ position: "relative", height:"90vh"}} >

       <div  style={{ margin: 0, position: "absolute", top:"50%", left: "50%" , transform: "translate(-50%,-50%)"}}>

    <img src={loader} alt="Loading..." />
    </div>
    </div>)
}

export default Loading;