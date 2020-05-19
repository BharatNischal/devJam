import React,{Component} from "react";
import "./profile.css"
import Section from "./section/section";
import Nav from "./Nav/Nav";

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
                    <div className="container" >
                        <Section  heading="Experience"  style={{gridColumnStart:"1",gridColumnEnd:"3"}} />
                        <Section  heading="Rating" type="rating" rating="3" />
                    </div>
                </main>
            </div>
        )
    }
}

export default Profile;