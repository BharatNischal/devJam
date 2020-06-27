import React, { useState, useEffect,useContext } from 'react';
import TopBar from "../../learnerPlatform/TopBar";
import Axios from 'axios';
import {CurUserContext} from '../../../contexts/curUser';

function Tests(props) {
    const [tests,setTests] = useState([]);

    // Login state
    const {user} = useContext(CurUserContext);

    useEffect(function(){
      if(user.loggedIn && user.student){
        Axios.get("/allReleasedTests")
        .then(function(res){
            if(res.data.success){
                setTests(res.data.tests);
            }else{
                console.error(res.data.msg);
                alert(res.data.msg);
            }
        }).catch(function(err){
            alert(err.message);
        })
      }else{
        props.history.push(user.loggedIn?'/profiles':'/login')
      }

    },[])

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


export default Tests
