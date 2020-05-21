const Db = require('./models/index');

const developer = {
    personalInfo:{
        firstName: "Bharat",
        lastName: "Nischal",
        title: "Student",
    },
    education:[{
        schoolName:"Shiv Jyoti public school",
        degree: "B Tech",
        subject:"Computer Science",
        from: Date.now(),
        to:{
          present:true
        }
    }],
    experience:[{
        company:"Cess",
        position:"Technical Head",
        from:Date.now(),
        to:{
          present:true
        },
        description: "Making Coding fun in the campus"
    }],
    languages:[{
        name:"Javascript",
        rating:4
    },{
        name:"C++",
        rating:4
    },{
        name:"Python",
        rating:2
    }],
    frontend:[{
        name:"React",
        rating:3
    },{
        name:"Bootstrap",
        rating:3
    },{
        name:"HTML CSS",
        rating:4
    }],
    backend:[{
        name:"NodeJs",
        rating:4
    }],
    database:[{
        name:"MongoDB",
        rating:3
    },{
        name:"MySQL",
        rating:3
    }],
    tools:[{
        name:"Git",
        rating:3
    },{
        name:"Chrome Extension",
        rating:2
    }],
    softSkills:[{
        name:"Communication",
        rating:3
    }],
    hobbies:["Cricket","Games"],
    contact:{
        email: "nischalbharat4819@gmail.com",
        phone: 1234567890,
        github: "github.com/BharatNischal",
        youtube: ""
    }
}

Db.Developer.create(developer)
  .then(profile=>{
    console.log(profile);
  })
  .catch(err=>{
    console.log(err);
  });