const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../models/index");
const middleware = require("../middleware");
const mailFunction = require("../mail");

// Router to get all the courses
router.get('/all/courses',function (req,res) {
    db.Course.find({})
      .then(courses=>{
        res.json({success:true,courses});
      })
      .catch(err=>{
        res.json({success:false,msg:err.message});
      })
})

// Route to create a new course
router.get('/course/new',function (req,res) {
  db.Course.create({})
  .then(course=>{
    res.json({success:true,course});
  })
  .catch(err=>{
    res.json({success:false,msg:err.message});
  })
})

// To get a specific course
router.get('/course/find/:id',function (req,res) {
    db.Course.findById(req.params.id).populate(['events.items.video','events.items.deliverable','events.items.test'])
    .then(course=>{
      res.json({success:true,course});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// To save the course as draft
router.put('/course/:id',function (req,res) {
    db.Course.findByIdAndUpdate(req.params.id,req.body.course)
    .then(course=>{
      res.json({success:true});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Route to give authorizaion to students for course and publish it ,send emails and notification
router.put('/course/publish/:id',middleware.isAdmin,function (req,res) {
    db.Course.findById(req.params.id)
      .then(course=>{
        let studentIds = [];
        const newStudents = req.body.students.map(student=>{
          studentIds.push(db.User.findById(student));
          return student
        });
        course.students = newStudents;
        course.status = "Published";
        course.save();
        Promise.all(studentIds)
          .then(responses=>{
            console.log(responses);
            let authorizedStudents = [];
            responses.forEach(response=>{
              response.username?authorizedStudents.push(response.username):console.log("username unavailable for",response._id);
            })
            // Send emails
            var fullUrl = `${req.protocol}://${req.get('host')}/learner/course/${req.params.id}`;
            const msg = {
              from: '"Learner Platform" <manjotsingh16july@gmail.com>', // sender address (who sends)
              to: authorizedStudents.join(","), // list of receivers (who receives)
              subject: 'You are Authorized for the Course', // Subject line
              text: `Dear student \n Congratulations you are authorized for Course ${course.title}\n please click on below link to start \n
                      ${fullUrl}`
            };



            mailFunction.mailFunction(msg,(err,info)=>{
              if(!err){
                  console.log(info);
                  res.json({success:true,course});
              }else{
                res.json({success:false,msg:err.message});
              }
            });

            db.Notification.create({
              title:`Dear student \n Congratulations you are authorized for Course ${course.title}. `,
              link:fullUrl,
              type:"course"
            }).then(notification=>{
              responses.forEach(st=>{
                st.notifications.push(
                  {notification:notification}
                );
                st.save();
              })
            }).catch(Err=>{
              console.log(Err);
            });
          })
      })
      .catch(err=>{
        res.json({success:false,msg:err.message});
      })
})

// Route to close a course
router.get('/course/close/:id',function (req,res) {
  db.Course.findByIdAndUpdate(req.params.id,{status:"Closed"})
  .then(course=>{
    res.json({success:true});
  })
  .catch(err=>{
    res.json({success:false,msg:err.message});
  })
})

// Route to get all the videos topicwise
router.get('/videos/all',function (req,res) {
  db.Topic.find({}).populate('items.video')
    .then(topics=>{
      res.json({success:true,topics})
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Route to get all the videos topicwise
router.get('/deliverables/all',function (req,res) {
  db.Topic.find({}).populate('items.deliverable')
    .then(topics=>{
      res.json({success:true,topics})
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Router to get all the tests
router.get('/tests/all',function (req,res) {
  db.Test.find({})
  .then(tests=>{
    res.json({success:true,tests})
  })
  .catch(err=>{
    res.json({success:false,msg:err.message});
  })
})

// Router to change dueDate of deliverables
router.put('/deliverables/dateChange',function (req,res) {
  Promise.all(req.body.deliverables.map(d=>(
        db.Deliverable.findByIdAndUpdate(d,{dueDate:req.body.date})
      )))
    .then(responses=>{
      res.json({success:true})
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Router to change start and end time of tests
router.put('/course/test/dateChange',function (req,res) {
  console.log("inside test time route",req.body.tests);
  Promise.all(req.body.tests.map(t=>(
        db.Deliverable.findByIdAndUpdate(t,{startTime:req.body.startTime,endTime:req.body.endTime})
      )))
    .then(responses=>{
      res.json({success:true})
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// To create a new Generic Event
router.post('/gevent/new',function (req,res) {
    console.log("inside gevent create route",req.body.event);
    db.GEvent.create(req.body.event)
      .then(event=>{
        res.json({success:true,event});
      })
      .catch(err=>{
        res.json({success:false,msg:err.message});
      })
})

module.exports = router;
