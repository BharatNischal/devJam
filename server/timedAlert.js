const mongoose = require("mongoose");
const db=require("../models/index");
const mailFunction = require("../mail");

try{
  var date = new Date();
    var h18 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18);
    if(date.getHours() >= 18) {
        h18.setDate(h17.getDate()+1);
    }
    h18 = h18.getTime();
    var diff = h18 - date.getTime();
    setTimeout(()=>{

      // call fxn

    },diff);
}
catch(err){

}

function timeAlert() {
  var month = new Date().getMonth()+1;
  db.Course.find({status:"Published",startMonth:{$lte:month},endMonth:{$gte:month}})
    .populate(['students','events.video','events.deliverable','events.test','events.event'])
      .then(courses=>{
          let promises = [];
          let newStudents=[];
          courses.forEach(course=>{

            // Get Tasks for Next Day
            var tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1,0);
            let listedEvents = [];
            course.events.forEach(e=>{
              if(e.date==tomorrow){
                  listedEvents = e.items.map(item=>{
                    if(item.video){
                      return item.video.title;
                    }else if(item.deliverable){
                      return item.deliverable.title;
                    }else if(item.test){
                      return item.test.title;
                    }else{
                      return item.event.title;
                    }
                  });
              }
            })

            const text = listedEvents.join("\n");
            course.students.forEach(student=>{

                  const msg = {
                    from: '"Learner Platform" <manjotsingh16july@gmail.com>', // sender address (who sends)
                    to: , // list of receivers (who receives)
                    subject: 'Daily Reminder', // Subject line
                    text: `Dear student your schedule for tommor for Course${course.title} is ${text}`
                  };

                  mailFunction.mailFunction(msg,(err,info)=>{
                    if(err){
                      console.log(err.message);
                    }
                  });

                  promises.push(db.Notification.create({
                    title:`Dear student your schedule for tommor for Course${course.title} is ${text}`,
                    link:fullUrl,
                    type:"course"
                  }));
                  newStudents.push(student);
            })

          })
          Promise.all(promises)
            .then(responses=>{
              responses.forEach((res,i)=>{
                newStudents[i].notifications.push(res);
                newStudents[i].save();
              })
            })
    })
    .catch(err=>{
      console.log(err.message);
    })
}
