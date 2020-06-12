import React,{useContext, useEffect, useState} from "react";
import {Link, withRouter} from "react-router-dom";
import TopBar from "./TopBar";
import "./learnerStyle.css";
import curve from "./curve.svg";
import Axios from "axios";
import {CurUserContext} from "../../contexts/curUser";
import Skeleton from 'react-loading-skeleton';

var initialTopics=[];
const Content = (props)=>{
    // To get details for logged in user
    const {setUser,user} = useContext(CurUserContext);
    // Search related states
    const [searchText,setSearchText] = useState("");
    const [topics,setTopics]=useState(initialTopics);
    const [focusInp,setFocusInp]=useState(false);

    // UI STATES
    const [loading, setloading] = useState(true);
    // To get the data from database on component mount
    useEffect(()=>{
        if(user.loggedIn){
            Axios.get("/getMinContent")
            .then(res=>{
                if(res.data.success){
                    setTopics(res.data.content.topics);
                    initialTopics=res.data.content.topics;
                    console.log(res.data.content.topics);
                }
                else{
                    alert(res.data.message);
                }
                setloading(false);
            })
            .catch(err=>{
                console.log(err.message);
                setloading(false);
            })
        }else{
            console.log("THIS REDIRECT HAPPENING");
            props.history.push("/login");
        }

    },[]);

    // Search topics
    const searchChangeHandler = (e)=>{
        setSearchText(e.target.value);
        if(e.target.value===""){
            setTopics(initialTopics);
        }else{


            setTopics(initialTopics.filter( t=> {
                return (t.title.toLowerCase().includes(e.target.value.toLowerCase()))
            } ));
        }
    }
    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }

    const loader=[];
    for(let i=0;i<2;i++){
        loader.push((<div  className="col-lg-3 col-md-4 col-6  py-3" >
                           
        <div className="customCard" >
            <div className="card-body">
                <div className="iconWrap text-center">
                    <Skeleton circle={true} height={50} width={50}></Skeleton>
                </div>
                <h2 className="card-title"><Skeleton></Skeleton></h2>
                <p className="card-desc"><Skeleton count={3}></Skeleton> </p>

            </div>

            <div className="bgcurve"> <img src={curve} /></div>
        </div>
        
    </div>));
    }

    return(
        <React.Fragment>
            <TopBar/>
            <div className="bgwhiteoverlay"></div>
            <div className="cust-Container container" style={{marginTop:"140px"}}>
                <div className="row">
                    <div className="col-12"style={{marginBottom:"28px"}}>
                        <h1>Topics<span className="underline"></span></h1>
                    </div>
                    <div className="col-12" style={{marginBottom:"28px"}}>
                        <div className={focusInp?"srch focus":"srch"}>
                            <input type="text" onFocus={()=>{setFocusInp(true)}} onBlur={()=>{setFocusInp(false)}} value={searchText} onChange={(e)=>searchChangeHandler(e)}  placeholder="Type to Search Topics" ></input>
                            <span className="float-right pr-3 srchIcon"><i className="fa fa-search"></i></span>
                        </div>
                    </div>
                                        
                    {loading?loader:null}
                    
                    
                    {topics.map((t,i)=>(
                        <div key={t._id} className="col-lg-3 col-md-4 col-6  py-3" >
                            <Link to={`/topic/${t._id}/${t.items.length>0?t.items[0].video?t.items[0].video:t.items[0].deliverable:"empty"}`} >
                            <div className="customCard" >
                                <div className="card-body">
                                    <div className="iconWrap text-center">
                                        <i className="fa fa-book bg-grad icon"></i>
                                    </div>
                                    <h2 className="card-title">{t.title }</h2>
                                    <p className="card-desc"> {t.description.substr(0,75)}..... </p>

                                </div>

                                <div className="bgcurve"> <img src={curve} /></div>
                            </div>
                            </Link>
                        </div>
                    ))}



                </div>
            </div>
        </React.Fragment>
    )

};

export default withRouter(Content);
