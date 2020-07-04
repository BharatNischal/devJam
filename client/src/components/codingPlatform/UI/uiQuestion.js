import React, { useState, useRef, useEffect,useContext} from 'react';
import "./ui.css";
import Layout1 from "./Layout1";
import AceEditor from "react-ace";
import Alert from "../../ui/alert/alert";
import {CurUserContext} from '../../../contexts/curUser';
import axios from 'axios';

// Editor languages
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/mode-css";


import "ace-builds/src-noconflict/theme-monokai";
import Layout2 from './Layout2';
import Submission from './submission/submission';
import Leaderboard from './Leaderboard';

function UIQuestion(props) {
    const [html, setHtml] = useState("<!-- Write Body Of HTML page Only -->");
    const [css, setCss] = useState("");
    const [js, setJs] = useState(null);

    const [activeTab,setActiveTab] = useState("description");
    const [layout, setLayout] = useState(3);
    const [showSettings, setShowSettings] = useState(false);
    const [question,setQuestion] = useState({title:"",description:"",sampleUrl:"",points:0})
    const [timer,setTimer] = useState(0); //Time in seconds
    const [allowed,setAllowed] = useState(true);
    const [started,setStarted] = useState(false)
    const [time,setTime] = useState(null);
    const [maxScore,setMaxScore] = useState(0);
    const {user} = useContext(CurUserContext);
    const [isDynamic, setIsDynamic] = useState(false);
    const [showLeaderboardAlert, setShowLeaderboardAlert] = useState(false);
    const [showSubmisssionAler, setShowSubmisssionAler] = useState(false);
    const [loading,setLoading] = useState(false);

    const iframe = useRef(null);
    const timerRef = useRef(null);

    let timeLeft = 0;

    useEffect(()=>{
      if(user.loggedIn){

        axios.get(`/frontend/taketest/${props.match.params.id}`)
          .then(res=>{
            if(res.data.success){
              console.log(res.data.question);

              // user has already started the test yet
              setTime(res.data.question.time);
              console.log("time",res.data.question.time);
              const {title,description,sampleUrl,points} = res.data.question;
              setQuestion({title,description,sampleUrl,points});
              setMaxScore(res.data.question.students[res.data.userIndex].maxMarks?res.data.question.students[res.data.userIndex].maxMarks:0);
              console.log("startTime",res.data.question.students[res.data.userIndex].startTime);
              if(res.data.question.time && res.data.question.students[res.data.userIndex].startTime){

                // Timer
                setStarted(true);
                const curtime = new Date();
                const starttime = new Date(res.data.question.students[res.data.userIndex].startTime);
                let timeDiff = Math.floor((curtime.getTime()-starttime.getTime())/1000);
                timeLeft = res.data.question.time*60-timeDiff;
                if(timeLeft<=0){
                  // Test is over
                  setAllowed(false);
                }else{
                  timerRef.current =setInterval(()=>{
                    setTimer(--timeLeft)
                  },1000);
                }
              }

            }else{
              console.log(res.data.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })

      }else{
        props.history.push('/login');
      }

},[])


    useEffect(()=>{

        if(iframe.current.contentDocument){
        const document = iframe.current.contentDocument;
        const documentContents = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}
            <script> ${isDynamic?js:""} </script>
          </body>
          </html>
        `;

        document.open();
        document.write(documentContents);
        document.close();
        }
    },[html,css])


    function startTimer() {
      console.log("start timer called");
      axios.get(`/frontendtest/${props.match.params.id}/timer`)
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
        if(question.time&&question.time>0){
          timeLeft = question.time*60;
          timerRef.current =setInterval(()=>{
            setTimer(--timeLeft)
          },1000);
        }
    }

    useEffect(()=>{
      if(timer<0){
        clearInterval(timerRef.current);
        setAllowed(false);
      }
    },[timer])

    function onFocus() {
      if(!started){
        startTimer();
        setStarted(true);
      }
    }


    function handleSubmit() {
      setLoading(true);
      axios.post(`/frontend/question/${props.match.params.id}/evaluation`,{html,css,js})
        .then(res=>{
          if(res.data.success){
            console.log(res.data.marks);
          }else{
            console.log(res.data.msg);
          }
          setLoading(false);
        })
        .catch(err=>{
          console.log(err.message);
        })
    }

    function secondsToHms(d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);
      return `${h}:${m}:${s}`;
  }


    return (
        <React.Fragment>
        <div className="topBar text-white">
            <div>
                <span className="h2 ml-2 pointer"> <i className="fa fa-arrow-left"></i> </span>
                <h2 className="d-inline" >
                    <b> {question.title} </b>
                </h2>
            </div>
            <div>
              {time?<h4 className="text-center text-pink p-2 " style={{backgroundColor:"#f1f1f1" ,borderRadius:"12px", border:"1px solid #bbb" }}  >
                  <b>{started?(timer<0?secondsToHms(0):secondsToHms(timer)):secondsToHms(time*60)}</b>
              </h4>:null}
            </div>
            <div className="pointer h2 ">
                <button className="btn text-white py-2 mr-3 topbarLink " onClick={()=>setShowLeaderboardAlert(true)}> <b>Leaderboard</b> </button>
                <button className="btn text-white py-2 mr-3 topbarLink " onClick={()=>setShowSubmisssionAler(true)} > <b>Submissions</b> </button>
                {allowed?<button className="btn-outline-grad btn mr-3" onClick={handleSubmit} > Submit</button>:<span className="mr-2">Time Out</span>}
                {!isDynamic?<i className="fas fa-cog " onClick={()=>setShowSettings(true)}></i>:null}
            </div>
        </div>
        {showSubmisssionAler?
            <Alert style={{maxWidth:"90%"}} cancel={()=>setShowSubmisssionAler(false)} >
                <Submission/>

            </Alert>
        :null}
        {showLeaderboardAlert?
            <Alert style={{maxWidth:"90%"}} cancel={()=>setShowLeaderboardAlert(false)}>
                <Leaderboard/>
            </Alert>
        :null}

        {showSettings?
        <React.Fragment>
            <div className="d-backdrop" onClick={()=>setShowSettings(false)}></div>
            <div className="dropdown " style={{width:"200px",height:"250px"}}>
                <h3 className="my-3"> <b>Set Layout</b> </h3>
                <div className="mt-2"><button className={layout==1?"btn-grad btn ml-2" :"btn-outline-grad btn ml-2" } onClick={()=>{setLayout(1);setCss(css+" ")}} > Layout 1 </button></div>
                <div className="mt-2"><button className={layout==2?"btn-grad btn ml-2" :"btn-outline-grad btn ml-2" } onClick={()=>{setLayout(2);setCss(css+" ")}} > Layout 2 </button></div>
                <div className="mt-2"><button className={layout==3?"btn-grad btn ml-2" :"btn-outline-grad btn ml-2" } onClick={()=>{setLayout(3);setCss(css+" ")}} > Layout 3 </button></div>

            </div>
        </React.Fragment>
        :null}

        <div className="bgwhiteoverlay" ></div>

        {layout==1 && !isDynamic ?
            <Layout1 iframe={iframe} html={html} css={css} setHtml={setHtml} setCss={setCss} />
        :null}

        {layout==2 && !isDynamic?
            <Layout2 iframe={iframe} html={html} css={css} setHtml={setHtml} setCss={setCss} />
        :null}

        {layout==3 || isDynamic?
            <div className="mainGrid ui" style={{gridTemplateRows:"1fr",gridTemplateColumns:"1fr 1fr"}} >
                <div className="tabLayoutMain" style={{position:"relative"}}>
                    <div className=" tabs d-flex " style={{height:"50px",position:"absolute",top:"0",width:"100%",borderBottom:"1px solid #e1e1e1" }}>
                        <div className={activeTab=="description"?" active tab px-3 py-2":"tab px-3 py-2 " } onClick={()=>setActiveTab("description")} > <b>Description</b> </div>
                        <div className={activeTab=="HTML"?" active tab px-3 py-2":"tab px-3 py-2" } onClick={()=>setActiveTab("HTML")} > <b>HTML</b> </div>
                        <div className={activeTab=="CSS"?" active tab px-3 py-2":"tab px-3 py-2" } onClick={()=>setActiveTab("CSS")} > <b>CSS</b> </div>
                        {isDynamic?<div className={activeTab=="JS"?" active tab px-3 py-2":"tab px-3 py-2" } onClick={()=>setActiveTab("JS")} > <b>JS</b> </div>:null}
                    </div>
                    <div className="uitabCont  text-left " style={{height:"100%",paddingTop:"50px"}} >
                        {activeTab=="description"?
                            <div className="p-2">
                                <h2>Description</h2>
                            </div>
                        :null}
                        {activeTab=="HTML"?
                            <AceEditor
                                mode={"html"}
                                theme={"monokai"}
                                name="UNIQUE_ID_OF_DIV"
                                editorProps={{ $blockScrolling: true }}
                                setOptions={{
                                    enableBasicAutocompletion: true,
                                    enableLiveAutocompletion: true,
                                    enableSnippets: true,
                                    showLineNumbers: true,
                                }}
                                placeholder="Code Will be here"
                                fontSize={18}
                                showPrintMargin={false}
                                showGutter={true}
                                highlightActiveLine={true}
                                width="100%"
                                height="100%"
                                onFocus={onFocus}
                                onChange={(newValue)=>setHtml(newValue)}
                                defaultValue={html}


                            />
                        :null}
                        {activeTab=="CSS"?
                            <AceEditor
                                mode={"css"}
                                theme={"monokai"}
                                name="UNIQUE_ID_OF_DIV"
                                editorProps={{ $blockScrolling: true }}
                                setOptions={{
                                    enableBasicAutocompletion: true,
                                    enableLiveAutocompletion: true,
                                    enableSnippets: true,
                                    showLineNumbers: true,
                                }}
                                placeholder="Write your CSS code here"
                                fontSize={18}
                                showPrintMargin={false}
                                showGutter={true}
                                highlightActiveLine={true}
                                width="100%"
                                height="100%"
                                onFocus={onFocus}
                                onChange={(newValue)=>setCss(newValue)}
                                defaultValue={css}


                            />
                        :null}
                        {activeTab=="JS"?
                            <AceEditor
                                mode={"javascript"}
                                theme={"monokai"}
                                name="tabsjsDIV"
                                editorProps={{ $blockScrolling: true }}
                                setOptions={{
                                    enableBasicAutocompletion: true,
                                    enableLiveAutocompletion: true,
                                    enableSnippets: true,
                                    showLineNumbers: true,
                                }}
                                placeholder="Write Javascript Here"
                                fontSize={18}
                                showPrintMargin={false}
                                showGutter={true}
                                highlightActiveLine={true}
                                width="100%"
                                height="100%"
                                onFocus={onFocus}
                                onChange={(newValue)=>setJs(newValue)}
                                defaultValue={js}


                            />
                        :null}
                    </div>
                </div>

                <div className=" bg-white"  >
                    <iframe style={{width:"100%",height:"100%"}} ref={iframe} >
                    </iframe>
                </div>
            </div>
        :null}
        </React.Fragment>
    )
}


export default UIQuestion
