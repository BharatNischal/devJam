import React from 'react';
import Nav from './components/profile/Nav/Nav';

// import codingImg from "./homeImages/Coding-Geospatial 1.png";
// import content from "./homeImages/Group 10.png";

function Home(props) {
    return (
        <React.Fragment>
            <Nav show={true} menu={true}/>
            <div className="bgwhiteoverlay"></div>
            <div className="container" style={{marginTop:"120px"}}>
                <h1 className="text-pink">Dashboard</h1>
                <p className="homeDesc" > Click On Specific Card to Perform desired operation. </p>

                <div className="d-flex border p-lg-5 justify-content-center mt-4" style={{flexWrap:"wrap"}} >
                    <div className="homepage card" style={{background:`url("./homeImages/codingImg.png")`}} >
                        <h2> Competitive Coding </h2>
                        <div className="overlay"></div>
                    </div>
                    <div className="homepage card" style={{background:`url("./homeImages/testPaper1.png")`}} >
                        <h2> Frontend Coding </h2>
                        <div className="overlay"></div>
                    </div>
                    <div className="homepage card" style={{background:`url("./homeImages/Group10.png")`}} >
                        <h2> Content </h2>
                        <div className="overlay"></div>
                    </div>
                    <div className="homepage card" style={{background:`url("./homeImages/onlinecouse.png")`}} >
                        <h2> Courses </h2>
                        <div className="overlay"></div>
                    </div>
                    <div className="homepage card" style={{background:`url("./homeImages/testPaper1.png")`}} >
                        <h2> Tests </h2>
                        <div className="overlay"></div>
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
    )
}



export default Home;
