import React, { useState, useEffect,useContext } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import "./content.css";
import ContentSection from "./contentSection";
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import axios from "axios";
import {CurUserContext} from "../../contexts/curUser";
import EmptyImg from "./emptyTopic.png";
import Nav from "../profile/Nav/Nav";

const Content = (props)=>{
    const [topics,setTopics]=useState([]);

    //UI STATES
    const [showSidebar,setShowSideBar] = useState(false);
    const [saveActive,setSaveActive] = useState(false);
    const [loading,setLoading] = useState(true);
    const {user} = useContext(CurUserContext);


    useEffect(()=>{
        if(user.loggedIn){  //Authorization for logged in users on;y i.e admins
          axios.get("/getContent")
          .then(res=>{
              console.log(res);
              if(res.data.success){
                  console.log(res.data.content.topics);
                  setTopics(res.data.content.topics);

              }
              setLoading(false);
          }).catch(err=>{
              console.log(err);
              setLoading(false);
          })
        }else{
          props.history.push("/login");
        }
    },[])

// Function to handle change of indices on sorting
    const onSortEnd = ({oldIndex, newIndex}) => {
        setTopics(topic => (
            arrayMove(topic, oldIndex, newIndex)
        ));
       if(oldIndex!==newIndex){
           setSaveActive(true);
       }
    };

// Creates a new topic with unique Id from database and then redirects to /topic/Id
    const handleNewTopic = ()=>{
      axios.get("/content/createTopic")
        .then(res=>{
            if(res.data.success){
              props.history.push(`/topic/${res.data.topicId}`);
            }else{
              console.log(res.data.msg);
            }
        })
        .catch(err=>{
            console.log(err.message);
        })
    }

// Fxn to delete video/deliverable from state
    const handleDelete=(id)=>{
        setTopics(topics.filter(t=>t._id!=id));
    }

// Function to save the current state in database
    const handleSave = ()=>{
        setLoading(true);
        const data = topics.map(topic=>topic._id);
        axios.put("/content",{data})
          .then(res=>{
              setLoading(false);
              console.log(res.data.success);
              setSaveActive(false);
          })
          .catch(err=>{
            console.log(err.message);
          })
    }

// React HOC for drag and drop items
    const SortableItem = sortableElement(({item}) => {
            return( <ContentSection  id={"a"+item._id} title={item.title} data={item.items} removeTopic={(id)=>handleDelete(id)} />)
        });

// React HOC for drag and drop container
    const SortableContainer = sortableContainer(({children}) => {
        return <div >{children}</div>;
        });

    return (
        <React.Fragment>
        <Nav  menu={true} show={true} />
        <div className="w-100 bg-light" style={{minHeight:"100vh"}}>

            <div className="row mx-0" >
                <div className={showSidebar?"col-sm-3 sidebar show":"col-sm-3 sidebar"}  >
                        <div style={{marginTop:"80px"}} ></div>
                        {topics.map(t=>(
                            <Link key={t._id} className="sidebarLink " activeClass="active shadow" to={"a"+t._id} spy={true} smooth={true} offset={-70} duration={500}>
                                <div>{t.title}</div>
                            </Link>
                        ))}



                    <button className="expand" onClick={()=>setShowSideBar(!showSidebar)} > > </button>
                </div>
                <div className="col-sm-3"></div>
                <div className="col-sm-9 text-left" style={{marginTop:"70px"}}>
                    <div className="mt-3">
                        <button className="btn-outline-grad p-2" onClick={handleNewTopic}> + Create </button>
                        <button
                            className={saveActive?" float-right saveBtn active p-2 px-3":" float-right saveBtn p-2 px-3"}
                            disabled={!saveActive}  onClick={handleSave}> Save
                        </button>
                    </div>
                    {topics.length==0?(
                        <div className="imgContainer">
                            <img className="img img-fluid" src={EmptyImg} alt="No Topics added" />
                        </div>
                    ):null}

                    {loading?
                    (<div className="text-center"> <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" /> </div>):
                    (
                        <SortableContainer onSortEnd={onSortEnd} distance={1} lockAxis="y" >
                            {topics.map((item, index) => (
                                <SortableItem key={item._id} index={index} item={item} disabled={window.innerWidth>=600?false:true}/>
                            ))}
                        </SortableContainer>
                    )}

                    {/* {topics.map((item) => (
                            <ContentSection  id={"a"+item._id} title={item.title} data={item.items}  />
                        ))} */}

                    <div style={{minHeight:"40vh"}}></div>

                </div>
            </div>
        </div>
        </React.Fragment>
    )
};

export default Content;
