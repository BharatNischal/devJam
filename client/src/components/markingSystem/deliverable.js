import React,{useState,useEffect,useContext} from 'react';
import Nav from '../profile/Nav/Nav';
import UserImg from "../profile/CLIP.png";
import Select from "react-select";
import axios from "axios";
import {CurUserContext} from '../../contexts/curUser';

var submissions = [];
var average=0;
function Deliverable2(props) {
    const [filterVal, setFilterVal] = useState("none");
    const [sortVal,setSortVal] = useState("Ascending");

    const [filteredSubmissions,setFilteredSubmissions] = useState([]);
    const [deliverable,setDeliverable] = useState(null);
    const {user} = useContext(CurUserContext);

    //UI STATES
    const [showNumberOptions, setshowNumberOptions] = useState(0);
    const [numbers,setNumbers]=useState([0,0]);

    useEffect(()=>{
        // Redirect to desired location
        if(!user.loggedIn){
          props.history.push('/login');
        }else if(user.student){
          props.history.push('/studDash');
        }else{
            if(props.location.deliverable){
              // Deliverable data passed as prop during redirect
              console.log("called");
              const {title,dueDate,points,instruction} = props.location.deliverable;
              submissions = props.location.deliverable.submissions;

              // Calculate average
              submissions.forEach(sub=>{
                average += sub.submissionId?(sub.submissionId.marks==-1?0:sub.submissionId.marks):0;
              });
              if(submissions.length>0){
                  average = (average/submissions.length).toFixed(2);
              }


              setFilteredSubmissions(props.location.deliverable.submissions);
              setDeliverable({title,dueDate,points,instruction});
            }else{
              // To get the data from database in case of refresh
              axios.get(`/deliverableFull/${props.match.params.id}`)
                .then(res=>{
                  if(res.data.success){
                    console.log(res.data);
                    const {title,dueDate,points,instruction} = res.data.deliverable;
                    submissions = res.data.deliverable.submissions;

                    // Calculate average
                    submissions.forEach(sub=>{
                      average += sub.submissionId?(sub.submissionId.marks==-1?0:sub.submissionId.marks):0;
                    });
                    if(submissions.length>0){
                        average = (average/submissions.length).toFixed(2);
                    }


                    setFilteredSubmissions(res.data.deliverable.submissions);
                    setDeliverable({title,dueDate,points,instruction});
                  }else{
                    alert(res.data.msg);
                  }
                })
                .catch(err=>{
                  console.log(err.message);
                })
            }
        }
      },[])


      // Function to sort the submissions based on sort method choosen
  function handleSort(choice,array=filteredSubmissions) {
        // Note we will be using -1 for default value rather than -1 to differentiate b/w 0 marks and unmarked

        if(choice=="Ascending"){
        setFilteredSubmissions(array.slice().sort(function(first,second){
            const x = Number(first.submissionId?first.submissionId.marks:-1); //Giving unsubmitted submission as -1(default)
            const y = Number(second.submissionId?second.submissionId.marks:-1);
            return x-y;
        }))
        }else { //Descending
        setFilteredSubmissions(array.slice().sort(function(first,second){
            const x = Number(first.submissionId?first.submissionId.marks:-1);
            const y = Number(second.submissionId?second.submissionId.marks:-1);
            return y-x;
        }))
        }
        setSortVal(choice);
    }

    // Function to filter submissions based on filter method applied
  function handleFilter(choice,a,b){
    let array = []; //Used to hold the filtered array
    if(choice=="Greater than"){
      console.log("Greater than");
      array = submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a<0:submission.submissionId.marks>a) : a<0;
      });
    }else if(choice=="Less than"){
      console.log("Less than");
      array = submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a>0:submission.submissionId.marks<a) : a>0;
      });
    }else if(choice==="Greater than or equal to"){
      console.log("Greater than or equal to");
      array = submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a<=0:submission.submissionId.marks>=a) : a<=0;
      });
    }else if(choice=="Less than or equal to"){
      console.log("Less than or equal to");
      array = submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a>=0:submission.submissionId.marks<=a) : a>=0;
      });
    }else if(choice==="Is equal to"){
      console.log("Is equal to");
      array = submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a==0:submission.submissionId.marks==a) : a==0;
      });
    }else if(choice=="Is not equal to"){
      console.log("Is not equal to");
      array = submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a!=0:submission.submissionId.marks!=a) : a!=0;
      });
    }else if(choice=="Is between"){
      console.log("Is between");
      array = submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?(a<=0 && b>=0):(a<=submission.submissionId.marks && b>=submission.submissionId.marks)) : (a<=0 && b>=0);
      });
    }else if(choice=="Is not between"){
      console.log("Is not between");
      array = submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1 ? !(a<=0 && b>=0):!(a<=submission.submissionId.marks && b>=submission.submissionId.marks)) : !(a<=0 && b>=0);
      });
    }else if(choice=="Unmarked"){
      console.log("Unmarked");
      array = submissions.filter(submission=>{
        return submission.submissionId && submission.submissionId.marks==-1;
      });
    }else if(choice=="Not submitted"){
      console.log("Not submitted");
      array = submissions.filter(submission=>{
        return !submission.submissionId;
      });
    }else if(choice=="Late"){
      console.log("Late");
      array = submissions.filter(submission=>{
        const subDate = submission.submissionId?new Date(submission.submissionId.timestamp):null;
        const dueDate = new Date(deliverable.dueDate);
        return submission.submissionId && subDate.getTime()>dueDate.getTime();
      });
    }else{  //For None
      console.log("none");
      array = submissions;
    }
    handleSort(sortVal,array);
  }

    const filterOoptions=[
        {value:"none",label:"None"},
        {value:"Greater than",label:"Greater Than"},
        {value:"Less than",label:"Less Than"},
        {value:"Greater than or equal to", label:"Greater than or equal to"},
        {value:"Less than or equal to",label:"Less than or equal to"},
        {value:"Is equal to",label:"Is equal to"},
        {value:"Is not equal to",label:"Is not equal to"},
        {value:"Is between",label:"Is between"},
        {value:"Is not between",label:"Is not between"},
        {value:"Unmarked",label:"Unmarked"},
        {value:"Not submitted",label:"Not submitted"},
        {value:"Late",label:"Late"}

    ];
    const sortOptions=[
        {value:"Ascending",label:"Ascending"},
        {value:"Descending",label:"Descending"}
    ]
    const filterChangeHandler=(e)=>{

        if(["none","Late","Unmarked","Not submitted"].includes(e.value)){
            setshowNumberOptions(0);
            handleFilter(e.value);
        }else if(["Greater than","Less than","Greater than or equal to","Less than or equal to","Is equal to","Is not equal to"].includes(e.value)){
            setshowNumberOptions(1);
        }else{
            setshowNumberOptions(2);
        }
        setFilterVal(e.value);
    }
    const filterAdvanceHandler=(e)=>{
        e.preventDefault();
        handleFilter(filterVal,numbers[0],numbers[1]);
        //setshowNumberOptions(-1);
    }
    return (
        <React.Fragment>
            <Nav show={true} />
            <div className="bgwhiteoverlay" ></div>
            <div className="container text-left" style={{marginTop:"100px"}}>
                <div className="row">
                    <div className="col-12 p-3">
                    <div className=" p-3  shadow" style={{borderRadius:"18px",backgroundColor:"rgb(255, 235, 249)"}}>
                        <h2 className="topicTitle mainH text-left text-pink" style={{display:"flex",justifyContent:"space-between"}}>
                                <div> {deliverable?deliverable.title:""}  </div>
                                <div className="p-lg-3 p-2 bg-grad text-white rounded-circle shadow " style={{fontSize:"20px",maxHeight:"54px"}}> {deliverable?deliverable.points:""} </div>
                        </h2>
                            <span className="cursor-pointer p-2 pb-4" onClick={()=>props.history.push("/marks")}><i className="fa fa-arrow-left anim-hil text-pink"></i> Go Back</span><br/>
                    </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="mt-3 p-0 p-md-3 d-flex ">
                            <div className="px-2 px-md-3">
                                <span className="bg-grad text-center text-white text-center rounded-circle shadow py-1" style={{fontSize:"19px",height:"39px",width:"39px",display:"inline-block"}}> <i className="fas fa-clipboard-check"> </i> </span>
                                <b className="pl-1 pl-md-2">{deliverable?deliverable.points:""} Points</b>
                            </div>
                            <div className="px-2 px-md-3">
                                <span className="bg-grad text-center text-white text-center rounded-circle shadow py-1" style={{fontSize:"19px",height:"39px",width:"39px",display:"inline-block"}}> <i className="fa fa-calendar-alt"> </i> </span>
                                <b className="pl-1 pl-md-2">{deliverable?deliverable.dueDate.substr(0,10):""}</b>
                            </div>

                        </div>
                        <div className="mt-3 pl-2 resp-70">
                            <h3>Instructions</h3>
                            <p>{deliverable?deliverable.instruction:""} </p>
                        </div>

                        <div className="mt-3 pl-2">
                            <h3 className="mb-0">Submissions</h3>
                        </div>

                    </div>
                    <div className="col-lg-4 mt-1 order-lg-2">
                        <div className="p-3 shadow mt-lg-5" style={{borderRadius:"18px",minHeight:"200px",backgroundColor:"#f8f8f8"}}>
                            <h4 className="mb-2">Filters</h4>

                            <Select
                                className="mb-2"
                                placeholder="Sort "
                                options={sortOptions}
                                onChange={(e)=>handleSort(e.value)}
                             />
                            <Select
                                options={filterOoptions}
                                value={{label:filterVal,value:filterVal}}
                                onChange={filterChangeHandler}
                            />
                            {showNumberOptions!=0?
                            <form className="values mt-2" onSubmit={filterAdvanceHandler}>
                                 <div className="px-2 mb-1">Number 1 &nbsp;&nbsp;&nbsp; <input type="Number" className="form-control " value={numbers[0]} onChange={(e)=>setNumbers([e.target.value,numbers[1]])} style={{width:"80px",display:"inline"}} />   </div>
                                 <div className="px-2 mb-1">{showNumberOptions==2?<React.Fragment>Number 2 &nbsp;&nbsp;&nbsp; <input type="Number" className="form-control " value={numbers[1]} onChange={(e)=>setNumbers([numbers[0],e.target.value])} style={{width:"80px",display:"inline"}} /> </React.Fragment>:null}<button className="btn btn-outline-grad float-right"> Filter </button>  </div>
                            </form>
                            :null
                            }
                            <button className="btn btn-link text-danger" onClick={()=>{handleFilter("none");setFilterVal("none")}}>Clear</button>
                        </div>
                    </div>
                    <div className="col-lg-8 mt-1 mb-5 " >
                        <div className="p-2" style={{position:"relative"}}>
                            <table class="table table-striped">
                                <thead style={{boxShadow:"0px 4px 8px rgba(0,0,0,0.5)"}}>
                                <tr>
                                    <th>Name</th>
                                    <th>Marks</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                  <td><b>Average</b></td>
                                  <td>{average}</td>
                                </tr>
                                {filteredSubmissions.map(sub=>{
                                    if(!deliverable)
                                      return null;
                                    const dueDate = new Date(deliverable.dueDate);
                                    const subDate = sub.submissionId?new Date(sub.submissionId.timestamp):null;
                                    const curDate = new Date();
                                    return (<tr key={sub._id}>
                                                <td>{sub.userId.name}</td>
                                                <td>
                                                  {sub.submissionId?(<span>
                                                                      {sub.submissionId.marks==-1?"Unmarked":sub.submissionId.marks}
                                                                      {dueDate.getTime()<subDate.getTime()?<b className="text-warning" style={{fontSize:"0.8em"}}> Done Late</b>:null}
                                                                    </span>)
                                                    :(dueDate.getTime()<curDate.getTime()?<span>0 <b className="text-danger" style={{fontSize:"0.8em"}}>Missing</b></span>:<span>0<b style={{fontSize:"0.8em"}}> Pending</b></span>)}
                                                </td>
                                            </tr>);
                                })}
                                </tbody>
                            </table>
                        </div>

                    </div>


                </div>
            </div>
        </React.Fragment>
    )
}



export default Deliverable2
