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
  const [isEventTimed,setIsEventTimed] = useState(false);
  const [dueDate,setDueDate] = useState("");
  const [startTime,setStartTime] = useState("");
  const [endTime,setEndTime] = useState("");

  useEffect(()=>{
    if(props.type=="video"){
      axios.get('/videos/all')
        .then(res=>{
          if(res.data.success){
            data = [];
            data = res.data.topics.map(topic=>{
              topic.items = topic.items.map(item=>{
                item.selected = false;
                return item;
              })
              return topic;
            });
            setFilteredData(data)
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
          data = [];
          data = res.data.topics.map(topic=>{
            topic.items = topic.items.map(item=>{
              item.selected = false;
              return item;
            })
            return topic;
          });
          setFilteredData(data)
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
          data = res.data.tests.map(test=>{
            test.selected = false;
            return test;
          });
          setFilteredData(data)
        }else{
          console.log(res.data.msg);
        }
      })
      .catch(err=>{
        console.log(err.message);
      })
    }else{
      // Generic event
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

  function handleChange(value,id) {
    if(props.type=="video"||props.type=="deliverable"){
      setFilteredData(JSON.parse(JSON.stringify(filteredData)).map(topic=>{
        topic.items = topic.items.map(item=>{
          if(id==item._id){
            item.selected = value;
          }
          return item;
        })
        return topic;
      }))
      data.map(topic=>{
        topic.items = topic.items.map(item=>{
          if(id==item._id){
            item.selected = value;
          }
          return item;
        })
        return topic;
      })
    }else if(props.type=="test"){
      setFilteredData(JSON.parse(JSON.stringify(filteredData)).map(test=>{
        if(test._id==id){
          test.selected = value;
        }
        return test;
      }))
      data.map(test=>{
        if(test._id==id){
          test.selected = value;
        }
        return test;
      })
    }
  }

  function handleAdd() {
    let list =[];
    if(props.type=="video"||props.type=="deliverable"){
        data.forEach(topic=>{
            topic.items.forEach(item=>{
              if(item.selected){
                props.type=="video"?list.push({video:item.video}):list.push({deliverable:item.deliverable});
                // item.selected = false;
              }
            })
        })
        if(props.type=="deliverable"){
          axios.put('/deliverables/dateChange',{date:dueDate?dueDate:props.date,deliverables:list.map(d=>d._id)})
            .then(res=>{
              if(res.data.success){
                console.log("success");
              }else{
                console.log(res.data.msg);
              }
            })
            .catch(err=>{
              console.log(err.message);
            })
        }
    }else if(props.type=="test"){
        data.forEach(test=>{
          if(test.selected){
            list.push({test})
            // test.selected = false;
          }
        })
        axios.put('/course/test/dateChange',{tests:list.map(l=>(l.test._id)),startTime,endTime})
          .then(res=>{
            if(res.data.success){
              console.log("Success");
            }else{
              console.log(res.data.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })
    }else{

    }
    props.add(list,props.date);
    console.log(list);
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
                <div><button className="btn btn-outline-grad" onClick={handleAdd} > Add </button></div>
            </div>

            <div className="row align-content-center justify-content-center mt-3">
                {props.type!="event"?
                <React.Fragment>
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
                </React.Fragment>
                :null}
                {props.type=="video"||props.type=="deliverable"?
                  <React.Fragment>
                  <div className="col-md-3"></div>
                  <div className="col-md-8  pl-5 text-left " >
                    {filteredData.map(topic=>(
                        topic.items.map(item=>(
                          item[props.type]?
                          (<div key={item[props.type]._id} className={(srchTxt!=""?(item[props.type].title&&item[props.type].title.toLowerCase().includes(srchTxt.toLowerCase())?"custom-control custom-checkbox ml-4 mt-3":"custom-control custom-checkbox mt-3 ml-4 d-none"):"custom-control custom-checkbox ml-4 mt-3")} >
                              <input type="checkbox" className="custom-control-input" id={"s"+item[props.type]._id}  checked={item.selected} onChange={(e)=>handleChange(e.target.checked,item._id)} />
                              <label className="custom-control-label" htmlFor={"s"+item[props.type]._id} >
                                  {item[props.type].title}
                              </label>
                          </div>)
                          :<React.Fragment></React.Fragment>
                        ))
                    ))}
                    {props.type=="deliverable"?
                      <React.Fragment>
                        <b className="mt-2">Add Due Date</b>
                        <div className="form-group input-group ml-4 mt-2">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-calendar" ></i></div>
                            <input className="form-control" type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
                        </div>
                      </React.Fragment>
                    :null}
                </div>
                <div className="col-md-1"></div>
                </React.Fragment>:null}

                {props.type=="test"?
                <React.Fragment>
                  <div className="col-md-3"></div>
                  <div className="col-md-6  pl-5 text-left" >

                    {filteredData.map(test=>(
                      <div key={test._id} className={(srchTxt!=""?(test.title && test.title.toLowerCase().includes(srchTxt.toLowerCase())?"custom-control custom-checkbox mt-3":"custom-control custom-checkbox mt-3 d-none"):"custom-control custom-checkbox mt-3")} >
                          <input type="checkbox" className="custom-control-input" id={"s"+test._id}  checked={test.selected} onChange={(e)=>handleChange(e.target.checked,test._id)} />
                          <label className="custom-control-label" htmlFor={"s"+test._id} >
                              {test.title}
                          </label>
                      </div>
                    ))}

                  </div>
                  <div className="col-md-3"></div>
                  </React.Fragment>:null}


                 <div className="col-md-3" style={{position:"relative"}}>
                   {props.type=="event"?
                    <div  className="custom-control custom-checkbox mt-2" style={{position:"absolute",bottom:"30px"}} >
                      <input type="checkbox" className="custom-control-input" id="eventTime"  checked={isEventTimed} onChange={(e)=>{setIsEventTimed(e.target.checked)}} />
                      <label className="custom-control-label" htmlFor="eventTime" >
                          Add Time
                      </label>
                    </div>
                    :null}
                 </div>
                 <div className={"col-md-9"}>
                  {props.type=="event"?
                    <React.Fragment>
                      <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-pencil" ></i></div>
                            <input type="text" className="form-control"   placeholder="Enter Course Title" />
                        </div>
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-align-justify" ></i></div>
                            <textarea rows="3" placeholder="Enter Course Description  " className="form-control" ></textarea>

                        </div>
                    </React.Fragment>
                  :null}
                 {props.type=="test" || props.type=="event"?
                      <div className={props.type=="event" && !isEventTimed?"row mt-2 text-left d-none":"row mt-2 text-left"}>
                      <div className="col-md-6 mb-2" >
                          <b>Start Time: </b><br/>
                          <div className="form-group input-group px-lg-2">
                              <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-clock" ></i></div>
                              <input className="form-control" type="time" value={startTime} onChange={(e)=>setStartTime(e.target.value)}/>
                          </div>
                        </div>
                        <div className="col-md-6 mb-2" >
                          <b>End Time: </b><br/>
                        <div className="form-group input-group ">
                              <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-clock" ></i></div>
                              <input className="form-control" type="time" value={endTime} onChange={(e)=>setEndTime(e.target.value)} />
                          </div>
                        </div>
                      </div>
                    :null}
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
  );
}
