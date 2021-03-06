import React,{Component} from "react";
import "./profile.css"
import Section from "./section/section";
import Nav from "./Nav/Nav";
import Rating from "../ui/rating/rating";
import Education from "./education/education";
import Experience from "./experience/experience";
import Skill from "../ui/skill/skill";
import axios from "axios";

class Profile extends Component{
    state={
        dim:false,
        dp:`url("https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png")`,
        showNav:false,
        notFound:false,
        profileData:{
            personalInfo:{
                firstName:"",
                lastName:"",
                title:""
            },
            contact:{
                email:"",
                phone:"",
                github:"",
                youtube:""
            },
            profilePic:"",
            hobbies:[],
            education:[],
            experience:[],
            languages:[],
            frontend:[],
            backend:[],
            database:[],
            tools:[],
            softSkills:[],
            rating:1


        },
        loading:true,
        copyAlert:false,
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
        });
        axios.get(`/profile/${this.props.match.params.id}`)
        .then(res=>{
            if(res.data.success){
                console.log("data",res);
                this.setState({profileData:res.data.data,loading:false});
            }else{
                this.setState({notFound:true});
            }

        }).catch(err=>{
            this.setState({notFound:true});
            console.log(err);

        });
    }

    copyToClipBoard=()=>{
        var textField = document.createElement('textarea')
        textField.innerText =window.location.href ;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        console.log("Coppied");
        this.setState({copyAlert:true});
        setTimeout(()=>{this.setState({copyAlert:false});},2000);
    }

    render(){

        const Comp=(
            <React.Fragment>
                <Nav show={this.state.showNav} dp={"url(" + this.state.profileData.profilePic +")"} name={this.state.profileData.personalInfo.firstName + " " +this.state.profileData.personalInfo.lastName  }  ></Nav>
                <header id="hero" className={this.state.dim?"header dim":"header"}>
                    <div className="profileImg">
                        <div style={{backgroundImage:"url(" + this.state.profileData.profilePic +")"}}></div>
                    </div>
                    <h1 className="heading"> {this.state.profileData.personalInfo.firstName + " " +this.state.profileData.personalInfo.lastName } </h1>
                    <h4 className="sub"> {this.state.profileData.personalInfo.title} </h4>

                </header>
                <main>
                    <div className="cont" >
                        <Section  heading="Education"  style={{gridColumnStart:"1",gridColumnEnd:"3"}} >
                            <Education data={this.state.profileData.education} />
                            {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat autem rerum molestias aut modi labore, excepturi reiciendis asperiores! Rerum nesciunt quia nostrum porro sequi animi soluta optio quam facilis consectetur?</p> */}
                        </Section>
                        <Section  heading="Rating" ><Rating val={this.state.profileData.rating} size="28px" showText={true} /></Section>
                        <Section heading="Experience" style={{gridColumnEnd:"4",gridColumnStart:"1" }}>
                            <Experience data={this.state.profileData.experience} />
                        </Section>
                        <Section heading="Technical Skills" style={{gridColumnEnd:"4",gridColumnStart:"1" }}>
                            <div className="row">
                            {this.state.profileData.languages.map(lang=>(
                                <Skill onlyIcon={true} icon={lang.name.toLowerCase()} key={lang._id} />
                            ))}
                            {this.state.profileData.frontend.map(lang=>(
                                <Skill onlyIcon={true} icon={lang.name.toLowerCase()} key={lang._id} />
                            ))}
                            {this.state.profileData.backend.map(lang=>(
                                <Skill onlyIcon={true} icon={lang.name.toLowerCase()} key={lang._id} />
                            ))}
                            {this.state.profileData.tools.map(lang=>(
                                <Skill onlyIcon={true} icon={lang.name.toLowerCase()} key={lang._id} />
                            ))}
                            </div>
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
                            {this.state.profileData.languages.map(lang=>(
                                <Skill icon={lang.name.toLowerCase()} experience={lang.experience} rating={lang.rating} key={lang._id} />
                            ))}

                        </Section>
                        <Section heading="Frontend">
                            {this.state.profileData.frontend.map(lang=>(
                                <Skill icon={lang.name.toLowerCase()} experience={lang.experience} rating={lang.rating} key={lang._id} />
                            ))}
                        </Section>
                        <Section heading="Backend">
                            {this.state.profileData.backend.map(lang=>(
                                <Skill icon={lang.name.toLowerCase()} experience={lang.experience} rating={lang.rating} key={lang._id} />
                            ))}
                        </Section>
                        <Section heading="Database">
                            {this.state.profileData.database.map(lang=>(
                                <Skill icon={lang.name.toLowerCase()} experience={lang.experience} rating={lang.rating} key={lang._id} />
                            ))}
                        </Section>
                        <Section heading="Mobile / Tools">
                            {this.state.profileData.tools.map(lang=>(
                                <Skill icon={lang.name.toLowerCase()} experience={lang.experience} rating={lang.rating} key={lang._id} />
                            ))}
                        </Section>
                        <div className="superHeadingCont text-left p-4 pr-0" style={{gridColumnEnd:"4",gridColumnStart:"1" }}>
                            <h1 className="superHeading " >Soft Skills</h1>

                            <Rating val="1" size="16px" inline={true} /> &nbsp;&nbsp; Not good, but trying<br/>
                            <Rating val="2" size="16px" inline={true} /> &nbsp;&nbsp; Trying, but can be more consistent<br/>
                            <Rating val="3" size="16px" inline={true} /> &nbsp;&nbsp; Decent & manageable to work with<br/>
                            <Rating val="4" size="16px" inline={true} /> &nbsp;&nbsp; Fairly good & consistent<br/>
                            <Rating val="5" size="16px" inline={true} /> &nbsp;&nbsp; Excellent<br/>
                        </div>

                        {this.state.profileData.softSkills.map((lang,i)=>(
                             <Section key={i} heading={lang.name}>
                                <Skill icon="softskills"  rating={lang.rating} key={lang._id}  description={lang.description} />
                            </Section>
                        ))}

                        <Section heading="Hobbies" style={{gridColumnStart:"1"}} >
                            <ul className="ml-3" >
                            {this.state.profileData.hobbies.map((hob,i)=>(
                                <li key={i}><b>{hob}</b></li>
                            ))}
                            </ul>
                        </Section>


                    </div>
                    <div className="social-floating">
                        <ul>
                           {this.state.profileData.contact.github?(<li ><i className="fab fa-github"> </i><a href={this.state.profileData.contact.github} target="__blank"> <span> Github </span>   </a></li>):null}
                           {this.state.profileData.contact.phone?(<li ><i className="fa fa-phone-alt"> </i><a href={"tel:"+this.state.profileData.contact.phone} target="__blank"> <span> {this.state.profileData.contact.phone} </span>   </a></li>):null}
                           {this.state.profileData.contact.email?(<li ><i className="fa fa-envelope"> </i><a href={"mailto:"+this.state.profileData.contact.email} target="__blank"> <span> {this.state.profileData.contact.email}</span>   </a></li>):null}
                           {this.state.profileData.contact.youtube?(<li ><i className="fab fa-youtube"> </i><a href={this.state.profileData.contact.youtube} target="__blank"> <span> Youtube </span>   </a></li>):null}
                           <li onClick={this.copyToClipBoard} className="mt-3" style={{cursor:"pointer"}} ><i className="fa fa-share"> </i> <span> Copy Link</span> </li>        
                        </ul>
                    </div>
                </main>
                {this.state.copyAlert?<div className="custom-alert"> Link Coppied to Clibard </div>:null}
            </React.Fragment>
        );

        return (
            <div>
                {this.state.notFound?<h1 className="display-4 text-b mt-5 text-light"> Page Not Found </h1>:this.state.loading?(<img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" />): Comp }
            </div>
        )
    }
}

export default Profile;
