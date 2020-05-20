import React,{Component} from "react";
import "./profile.css"
import Section from "./section/section";
import Nav from "./Nav/Nav";
import Rating from "../ui/rating/rating";
import Education from "./education/education";
import Experience from "./experience/experience";
import Skill from "../ui/skill/skill";

class Profile extends Component{
    state={
        dim:false,
        dp:`url("https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png")`,
        showNav:false
    }

    componentDidMount(){
        window.addEventListener("scroll",(e)=>{
          
            if(window.scrollY>10){
                this.setState({dim:true});
            }else{
                this.setState({dim:false});
            }
            
            
            if(window.scrollY> 150){
                this.setState({showNav:true});
            }else{
                this.setState({showNav:false});
            }
        })
    }

    render(){
        
        return (
            <div>
                <Nav show={this.state.showNav} dp={this.state.dp} name="Manjot Singh"  ></Nav>
                <header id="hero" className={this.state.dim?"header dim":"header"}>
                    <div className="profileImg">
                        <div style={{backgroundImage:this.state.dp}}></div>
                    </div>
                    <h1 className="heading"> Manjot Singh </h1>
                    <h4 className="sub"> Full Stack Developer </h4>
                </header>
                <main>
                    <div className="cont" >
                        <Section  heading="Education"  style={{gridColumnStart:"1",gridColumnEnd:"3"}} >
                            <Education/>
                            {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat autem rerum molestias aut modi labore, excepturi reiciendis asperiores! Rerum nesciunt quia nostrum porro sequi animi soluta optio quam facilis consectetur?</p> */}
                        </Section>
                        <Section  heading="Rating" ><Rating val="3" size="28px" showText={true} /></Section>
                        <Section heading="Experience" style={{gridColumnEnd:"4",gridColumnStart:"1" }}>
                            <Experience/>
                        </Section>
                        <div className="superHeadingCont text-left p-4 pr-0" style={{gridColumnEnd:"4",gridColumnStart:"1" }}>
                            <h1 className="superHeading " >Hard Skills</h1>
                            
                            <Rating val="1" size="16px" inline={true} /> &nbsp;&nbsp; Not confident<br/>                   
                            <Rating val="2" size="16px" inline={true} /> &nbsp;&nbsp; Need practice but understand concepts<br/>
                            <Rating val="3" size="16px" inline={true} /> &nbsp;&nbsp; Have some practice & can build tech with this skill<br/>
                            <Rating val="4" size="16px" inline={true} /> &nbsp;&nbsp; Fairly confident & have solid understanding of concepts<br/>
                            <Rating val="5" size="16px" inline={true} /> &nbsp;&nbsp; Fairly confident & have solid understanding of concepts<br/>
                        </div>
                        <Section heading="Languages" >
                            <Skill icon="mysql" experience="2" rating="4" />
                        </Section>
                        <Section heading="Frontend">
                            <Skill icon="mysql" experience="3" rating="5" />
                        </Section>
                        <Section heading="Backend">
                            <Skill icon="mongo" experience="2" rating="5" />
                            <Skill icon="mysql" experience="2" rating="5" />
                        </Section>
                        <Section heading="Database">
                            <Skill icon="mongo" experience="2" rating="5" />
                        </Section>
                        <Section heading="Mobile Tools">
                            <Skill icon="mysql" experience="2" rating="5" />
                        </Section>


                    </div>
                </main>
            </div>
        )
    }
}

export default Profile;