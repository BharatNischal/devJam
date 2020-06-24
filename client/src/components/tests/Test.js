import React,{useEffect,useState} from 'react';
import Modal from '../ui/modal/modal';
import Nav from '../profile/Nav/Nav';
import Select from "react-select";
import axios from "axios";
var allTests = [];
function Test(props) {

  const [tests,setTests] = useState([]);
 

  // Get data from the database
  useEffect(()=>{
    axios.get('/tests')
      .then(res=>{
        if(res.data.success){
          allTests = res.data.tests;
          setTests(res.data.tests);
        }else{
          console.log(res.data.msg);
        }
      })
      .catch(err=>{
        console.log(err.message);
      })
  },[]);


  // handle filters
  function handleFilter(choice){
    if(choice=="Draft"){
      console.log("Draft");
      setTests(allTests.filter(test=>{
        return test.status=="Draft";
      }));
    }else if(choice=="Published"){
      console.log("Published");
      setTests(allTests.filter(test=>{
        return test.status=="Published";
      }));
    }else if(choice=="Closed"){
      console.log("Closed");
      setTests(allTests.filter(test=>{
        return test.status=="Closed";
      }));
    }else{
      console.log("Clear");
      setTests(allTests);
    }
  }



  function handleNew() {
    axios.get('/test/new')
      .then(res=>{
        if(res.data.success){
          props.history.push(`/test/${res.data.test._id}`);
        }else{
          console.log(res.data.msg);
        }
      })
      .catch(err=>{
        console.log(err.message);
      })
  }

  const filterOptions=[
    {value:"Draft",label:"Draft"},
    {value:"Published",label:"Published"},
    {value:"Closed",label:"Closed"}
  ]

    return (
        <React.Fragment>
            <Nav show={true} menu={true} />
            <div className="bgwhiteoverlay"></div>
            <div className="container" style={{marginTop:"120px"}} >
                <div style={{display:"flex",justifyContent:"space-between"}} ><h1 className="topicTitle mainH text-left text-pink">Tests </h1>  <div> <button className="btn btn-outline-grad" onClick={handleNew}> Create </button> </div> </div>
                <div className="row my-5" >


                    <div className="col-lg-4 mt-1 order-lg-2">
                        <div className="p-3 shadow mt-lg-5" style={{borderRadius:"18px",minHeight:"200px",backgroundColor:"#f8f8f8"}}>
                            <h4 className="mb-2">Filters</h4>
                            <Select
                               className="Filter"
                               placeholder="Select Filter"
                               options={filterOptions}
                               
                               onChange={(e)=>handleFilter(e.value)}
                            />
                            {/* {showNumberOptions!=0?
                            <form className="values mt-2" onSubmit={filterAdvanceHandler}>
                                 <div className="px-2 mb-1">Number 1 &nbsp;&nbsp;&nbsp; <input type="Number" className="form-control " value={numbers[0]} onChange={(e)=>setNumbers([e.target.value,numbers[1]])} style={{width:"80px",display:"inline"}} />   </div>
                                 <div className="px-2 mb-1">{showNumberOptions==2?<React.Fragment>Number 2 &nbsp;&nbsp;&nbsp; <input type="Number" className="form-control " value={numbers[1]} onChange={(e)=>setNumbers([numbers[0],e.target.value])} style={{width:"80px",display:"inline"}} /> </React.Fragment>:null}<button className="btn btn-outline-grad float-right"> Filter </button>  </div>
                            </form>
                            :null
                            } */}
                            <button className="btn btn-link text-danger" onClick={()=>handleFilter("none")} >Clear</button>
                        </div>
                    </div>
                    <div className="col-lg-8 mt-2 mb-5 " >
                      {tests.map(test=>(
                        <div className="p-3 my-2" style={{position:"relative",borderRadius:"20px", boxShadow:"0px 4px  10px rgba(0,0,0,0.3)"}} key={test._id}>
                            <div className="align-center" style={{ display:"flex" , justifyContent:"space-between" }} >
                                <div className="cursor-pointer w-75 hover-pink text-left pt-1" onClick={()=>props.history.push(`/test/${test._id}`)} ><h3 className="topicTitle  d-inline mr-2" style={{fontSize:"20px"}} > {test.title}</h3><i style={{color:"#444"}} >{test.status}</i></div>
                                <div> <button className="btn btn-grad" > {test.status=="Draft"?("Publish"):(test.status=="Published"?"View Result":"Close Test")} </button> </div>
                            </div>
                        </div>
                      ))}
                    </div>
            </div>
            </div>
        </React.Fragment>
    )
}



export default Test;
