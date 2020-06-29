import React from 'react';

function Course(props) {
    return (
        <React.Fragment>
            <TopBar/>
            <div className="bgwhiteoverlay"></div>
            <div className="container" style={{marginTop:"120px"}} >
                <h1 className="text-pink"> View All Released Tests </h1>
                <div className="row mt-4 justify-content-center" >
                    <div className="col-lg-8">
                        {tests.map((test,i)=>(
                            <div className="p-3 my-3 pointer" style={{position:"relative",borderRadius:"20px", boxShadow:"0px 4px  10px rgba(0,0,0,0.3)"}} >
                                <div className="align-center" style={{ display:"flex" , justifyContent:"space-between" }} >
                                    <div className="pt-2 hover-pink" ><h3 className="topicTitle d-inline mr-2" style={{fontSize:"20px"}}> {test.title}</h3></div>
                                    <div> <button className="btn btn-grad ml-2" onClick={()=>props.history.push(`/resultSingleStudent/${test.students[0].testSubmissionId}`)} >View Result</button></div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default Course;

