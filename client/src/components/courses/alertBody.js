import React,{useState,useEffect} from 'react';
import Select from "react-select";
import axios from "axios";

var data = [];
export default function AlertBody(props) {

  const [filteredData,setFilteredData] = useState([]);
  //UI STATES
  const [focusInp,setFocusInp] = useState(false);
  const [srchTxt,setSrchTxt] = useState("");
  const [selectAll,setSelectAll] = useState(false);
  const [showConfirmation,setShowConfirmation] = useState(false);

  useEffect(()=>{
    if(props.type=="video"){
      axios.get('/videos/all')
        .then(res=>{
          if(res.data.success){
            data = res.data.topics;
            setFilteredData(res.data.topics)
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    }else if(props.type=="deliverable"){
      axios.get('/deliverables/all')
      .then(res=>{
        if(res.data.success){
          data = res.data.topics;
          setFilteredData(res.data.topics)
        }else{
          console.log(res.data.msg);
        }
      })
      .catch(err=>{
        console.log(err.message);
      })
    }else if(props.type=="test"){
      axios.get('/tests/all')
      .then(res=>{
        if(res.data.success){
          data = res.data.tests;
          setFilteredData(res.data.tests)
        }else{
          console.log(res.data.msg);
        }
      })
      .catch(err=>{
        console.log(err.message);
      })
    }else{

    }
  },[])

  function handleFilter(choice) {
    if(choice=="All"){
      setFilteredData(data);
      return;
    }
    setFilteredData(data.filter(d=>(
      d.title==choice
    )))
  }


  const topicOptions = [{value:"All",label:"All"},
                        ...data.map(d=>(
                          {value:d.title,label:d.title}
                        ))]

  return (
    <div className="container">
    <div className="row">
    <div className="col-12 mt-4">
        <div className="round border p-3" style={{minHeight:"200px",backgroundColor:"#fcfcfc"}}>
            <div className="d-flex justify-content-between align-content-center ">
                <h2> ADD {props.type.toUpperCase()} </h2>
                <div><button className="btn btn-outline-grad" onClick={console.log("add")} > Add </button></div>
            </div>
            <div className="row align-content-center justify-content-center mt-3">
                <div className="col-md-3 pt-2">
                    <div className="custom-control custom-checkbox d-inline" >
                        <input type="checkbox" className="custom-control-input" id="isSelectAll"  checked={selectAll} onChange={()=>setSelectAll(!selectAll) } />
                        <label className="custom-control-label" htmlFor="isSelectAll" >Select All</label>
                    </div>

                </div>
                <div className="col-md-9">

                    {props.type=="video"||props.type=="deliverable"?
                      <Select className="mb-2"
                        options={topicOptions}

                        onChange={(e)=>handleFilter(e.value)}
                      />
                      :null}

                    <div className={focusInp?"srch focus w-100 ml-0":"srch w-100 ml-0"} style={{height:"40px"}}>
                        <input type="text" onFocus={()=>{setFocusInp(true)}} onBlur={()=>{setFocusInp(false)}}   placeholder="Type to Search Students" value={srchTxt} onChange={(e)=>setSrchTxt(e.target.value)} ></input>
                        <span className="float-right pr-3 srchIcon"><i className="fa fa-search"></i></span>
                    </div>
                </div>
                {props.type=="video"||props.type=="deliverable"?
                  <div className="col-md-6  pl-5" style={{height:"500px"}}>
                    {filteredData.map(topic=>(
                        topic.items.map(item=>(
                          item[props.type]?
                          (<div key={item[props.type]._id} className={(srchTxt!=""?(item[props.type].title&&item[props.type].title.toLowerCase().includes(srchTxt.toLowerCase())?"custom-control custom-checkbox mt-3":"custom-control custom-checkbox mt-3 d-none"):"custom-control custom-checkbox mt-3")} >
                              <input type="checkbox" className="custom-control-input" id={"s"+item[props.type]._id}  checked={item[props.type].selected} onChange={()=>console.log("checked")} />
                              <label className="custom-control-label" htmlFor={"s"+item[props.type]._id} >
                                  {item[props.type].title}
                              </label>
                          </div>)
                          :<React.Fragment></React.Fragment>
                        ))
                    ))}
                </div>:null}

                {props.type=="test"?
                  <div className="col-md-6  pl-5 text-left" style={{height:"500px"}}>
                    {filteredData.map(test=>(
                      <div key={test._id} className={(srchTxt!=""?(test.title && test.title.toLowerCase().includes(srchTxt.toLowerCase())?"custom-control custom-checkbox mt-3":"custom-control custom-checkbox mt-3 d-none"):"custom-control custom-checkbox mt-3")} >
                          <input type="checkbox" className="custom-control-input" id={"s"+test._id}  checked={test.selected} onChange={()=>console.log("checked")} />
                          <label className="custom-control-label" htmlFor={"s"+test._id} >
                              {test.title}
                          </label>
                      </div>
                    ))}

                  </div>:null}

            </div>
        </div>
    </div>
    </div>
    </div>
  );
}
