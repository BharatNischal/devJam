import React,{useState,useEffect} from 'react';
import axios from 'axios';

export default function Test() {

  const [tests,setTests] = useState([]);
  var allTests = [];

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
      setTests(filter(test=>{
        return test.state=="Draft";
      }));
    }else if(choice=="Published"){
      console.log("Published");
      setTests(filter(test=>{
        return test.state=="Published";
      }));
    }else if(choice=="Closed"){
      console.log("Closed");
      setTests(filter(test=>{
        return test.state=="Closed";
      }));
    }else{
      console.log("Clear");
      setTests(allTests);
    }
  }


  return (
    <div>
      {tests.map(test=>(
        <div>test.state</div>
      ))}
    </div>
  )
}
