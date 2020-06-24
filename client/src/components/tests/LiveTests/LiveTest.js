import React,{useEffect,useState} from 'react';
import TopBar from "../../learnerPlatform/TopBar";
import "./liveTest.css";
import StartPage from './startPage';
import Question from './question';

const lorem ="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

function LiveTest(props) {

  const [test,setTest] = useState({title:"Title",instructions:"",duration:-1});
  const [err,setErr] = useState("");

  useEffect(()=>{
    axios.get(`/livetest/${props.match.params.id}`)
      .then(res=>{
        if(res.data.success){
          const {title,instructions,duration} = res.data.test;
          setTest({title,instructions,duration});
        }else{
          setErr(res.data.msg);
        }
      })
      .catch(err=>{
        console.log(err.message);
      })
  },[])

    return (
        <React.Fragment>
            <TopBar/>
            <div className="bgwhiteoverlay"></div>

                <div className="frame p-4">

                    {/* Start Page Should only be shown when user has not started test yet, not when he refresh page */}
                    {/* <StartPage title="Maths Test" instruction={lorem} duration={30}  />   */}

                    <Question/>
                </div>

        </React.Fragment>
    )
}



export default LiveTest
