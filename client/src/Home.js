import React,{useContext} from 'react';
import Nav from './components/profile/Nav/Nav';
import {CurUserContext} from "./contexts/curUser";
import TopBar from './components/learnerPlatform/TopBar';

// import codingImg from "./homeImages/Coding-Geospatial 1.png";
// import content from "./homeImages/Group 10.png";

function Home(props) {
    const {setUser,user} = useContext(CurUserContext);
    return (
        <React.Fragment>
            {user.student?
            <TopBar/>:
            <Nav show={true} menu={true}/>
            }
            <div className="bgwhiteoverlay"></div>
            <div className="container-fluid" style={{marginTop:"120px"}}>
                <h1 className="text-pink">Dashboard</h1>
                <p className="homeDesc" > Click On Specific Card to Perform desired operation. </p>

                <div className="d-flex p-lg-5 justify-content-center mt-4" style={{flexWrap:"wrap"}} >
                    <div className="homepage card" style={{background:`url("./homeImages/codingImg.png")`}} onClick={()=>props.history.push("/codingQuestions")} >
                        <h2> Competitive Coding </h2>
                        <div className="overlay"></div>
                    </div>
                    <div className="homepage card" style={{background:`url("./homeImages/testPaper1.png")`}} onClick={()=>props.history.push("/uiquestions")} >
                        <h2> Frontend Coding </h2>
                        <div className="overlay"></div>
                    </div>
                    <div className="homepage card" style={{background:`url("./homeImages/Group10.png")`}} onClick={()=>props.history.push(user.student?"/studDash":"/content")} >
                        <h2> Content </h2>
                        <div className="overlay"></div>
                    </div>
                    <div className="homepage card" style={{background:`url("./homeImages/onlinecouse.png")`}} onClick={()=>props.history.push(user.student?"/learner/courses":"/courses")}  >
                        <h2> Courses </h2>
                        <div className="overlay"></div>
                    </div>
                    <div className="homepage card" style={{background:`url("./homeImages/testPaper1.png")`}}  onClick={()=>props.history.push(user.student?"/allTests":"/test")}  >
                        <h2> Tests </h2>
                        <div className="overlay"></div>
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
    )
}



export default Home;
