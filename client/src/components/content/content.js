import React, { useState, useEffect } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import "./content.css";
import ContentSection from "./contentSection";
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import axios from "axios";

const Content = (props)=>{
    const [showSidebar,setShowSideBar] = useState(false);
    const [saveActive,setSaveActive] = useState(false);
    const [topics,setTopics]=useState([
        {   _id:"1",
            title:"First Slide",
            items:[
                {video:{
                    _id:"x1",
                    title:"Video of first"
                }},
                {deliverable:{
                    _id:"d1",
                    title:"Deliverable of first"
                }}
        ]},{
            _id:"2",
            title:"Second Topic",
            items:[
                {video:{
                    _id:"x1",
                    title:"Video of first"
                }},
                {deliverable:{
                    _id:"d1",
                    title:"Deliverable of first"
                }}
        ]}]);
    
    useEffect(()=>{
        axios.get("/getContent")
        .then(res=>{
            if(res.data.success){
                setTopics(res.data.content.topics);
            }
        }).catch(err=>{
            console.log(err);
        })
    },[])
    const onSortEnd = ({oldIndex, newIndex}) => {
        setTopics(topic => (
            arrayMove(topic, oldIndex, newIndex)
        ));
       if(oldIndex!==newIndex){
           setSaveActive(true);
       }
    };
        
    const SortableItem = sortableElement(({item}) => {  
            return( <ContentSection  id={"a"+item._id} title={item.title} data={item.items}  />)
        });
    
    const SortableContainer = sortableContainer(({children}) => {
        return <div>{children}</div>;
        });    

    return (
        <div className="w-100 bg-light" style={{minHeight:"100vh"}}>
            <div className="row mx-0">
                <div className={showSidebar?"col-lg-3 sidebar show":"col-lg-3 sidebar"}  >
                        <div className="mt-5 " ></div>
                        {topics.map(t=>(
                            <Link key={t._id} className="sidebarLink " activeClass="active shadow" to={"a"+t._id} spy={true} smooth={true} offset={-70} duration={500}>
                                <div>{t.title}</div>
                            </Link>
                        ))}     
                           
                        
                    
                    <button className="expand" onClick={()=>setShowSideBar(!showSidebar)} > > </button>
                </div>
                <div className="col-lg-3"></div>
                <div className="col-lg-9 text-left">
                    <div className="mt-3">
                        <button className="btn-outline-grad p-2"> + Create </button>
                        <button 
                            className={saveActive?" float-right saveBtn active p-2 px-3":" float-right saveBtn p-2 px-3"} 
                            disabled={!saveActive}  onClick={()=>alert("Hello")}> Save
                        </button>
                    </div>
                    
                    <SortableContainer onSortEnd={onSortEnd} distance={1} >
                        {topics.map((item, index) => (
                            <SortableItem key={item._id} index={index} item={item} />
                        ))}
                    </SortableContainer>
                    {/* {topics.map((item) => (
                            <ContentSection  id={"a"+item._id} title={item.title} data={item.items}  />
                        ))} */}
                    
                    <div style={{minHeight:"40vh"}}></div>
                </div>
            </div>
        </div>
    )
};

export default Content;