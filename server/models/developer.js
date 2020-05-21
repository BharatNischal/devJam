var mongoose=require("mongoose");

var developerSchema=new mongoose.Schema({
    profilePic:{
      type:String,
      default: 'https://c8.alamy.com/comp/HBFR2F/male-profile-avatar-with-brown-hair-over-white-background-vector-illustration-HBFR2F.jpg'
    },
    rating:{
      type: Number,
      required: [1,2,3,4,5],
      default: 1
    },
    personalInfo:{
        firstName: {
            type: String,
            required: true
          },
        lastName: {
            type: String,
            required: true
          },
        title:"String",
    },
    education:[{
        schoolName:{
          type: String,
          required: true
        },
        degree:{
          type: String,
          required: true
        },
        subject:{
          type: String,
          required: true
        },
        from:{
          type: Date,
          required: true
        },
        to:{
          present:{
            type: Boolean,
            default: false
          },
          date:Date
        }
    }],
    experience:[{
        company:{
          type: String,
          required:true
        },
        position:{
          type:String,
          required:true
        },
        from:{
          type: Date,
          required: true
        },
        to:{
          present:{
            type: Boolean,
            default: false
          },
          date:Date
        },
        description: {
            type: String,
            required: true
        }
    }],
    languages:[{
        name:{
          type: String,
          required: true
        },
        rating:{
          type: Number,
          required: [1,2,3,4,5],
          default: 1
        },
        experience:{
          type:Number,
          required:true
        }
    }],
    frontend:[{
        name:{
          type: String,
          required: true
        },
        rating:{
          type: Number,
          required: [1,2,3,4,5],
          default: 1
        },
        experience:{
          type:Number,
          required:true
        }
    }],
    backend:[{
        name:{
          type: String,
          required: true
        },
        rating:{
          type: Number,
          required: [1,2,3,4,5],
          default: 1
        },
        experience:{
          type:Number,
          required:true
        }
    }],
    database:[{
        name:{
          type: String,
          required: true
        },
        rating:{
          type: Number,
          required: [1,2,3,4,5],
          default: 1
        },
        experience:{
          type:Number,
          required:true
        }
    }],
    tools:[{
        name:{
          type: String,
          required: true
        },
        rating:{
          type: Number,
          required: [1,2,3,4,5],
          default: 1
        },
        experience:{
          type:Number,
          required:true
        }
    }],
    softSkills:[{
        name:{
          type: String,
          required: true
        },
        rating:{
          type: Number,
          required: [1,2,3,4,5],
          default: 1
        },
        description:String
    }],
    hobbies:[{
      type:String
    }],
    contact:{
        email: String,
        phone: Number,
        github: String,
        youtube: String
    }
});


module.exports=mongoose.model("Developer",developerSchema);
