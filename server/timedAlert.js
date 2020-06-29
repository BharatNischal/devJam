const mongoose = require("mongoose");
const db=require("./models/index");
const mailFunction = require("./mail");

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [year, month, day].join('-');
}

try{
  var date = new Date();
    var h18 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18);
    if(date.getHours() >= 18) {
        h18.setDate(h18.getDate()+1);
    }
    h18 = h18.getTime();
    var diff = h18 - date.getTime();
    setTimeout(()=>{

      // call fxn
      dailyInterval();
    },diff);
}
catch(err){

}

function dailyInterval(){
  timeAlert();
  setInterval(timeAlert,24*3600000);
}

function timeAlert() {
  var month = new Date().getMonth()+1;
  db.Course.find({status:"Published",startMonth:{$lte:month},endMonth:{$gte:month}})
    .populate(['students','events.items.video','events.items.deliverable','events.items.test','events.items.event'])
      .then(courses=>{
          let promises = [];
          let newStudents=[];
          courses.forEach(course=>{

            // Get Tasks for Next Day
            var tomorrow = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1,0);
            let listedEvents = [];
            course.events.forEach(e=>{
              console.log("db",e.date.toISOString().substr(0,10),"format",formatDate(tomorrow));
              if(e.date.toISOString().substr(0,10)==formatDate(tomorrow)){
                  listedEvents = e.items.map(item=>{
                    console.log("Item",item);
                    if(item.video){
                      return "Video "+item.video.title;
                    }else if(item.deliverable){
                      return "Deliverable "+item.deliverable.title;
                    }else if(item.test){
                      return "Test "+item.test.title;
                    }else{
                      return "Event "+item.event.title;
                    }
                  });
              }
            })

            const text = listedEvents.join("\n");
            course.students.forEach(student=>{

                  const msg = {
                    from: '"Learner Platform" <manjotsingh16july@gmail.com>', // sender address (who sends)
                    to: student.username, // list of receivers (who receives)
                    subject: 'Daily Reminder', // Subject line
                    text: `Dear student your schedule for tomorrow for Course ${course.title} is \n${text}`
                  };

                  mailFunction.mailFunction(msg,(err,info)=>{
                    if(err){
                      console.log(err.message);
                    }
                  });

                  promises.push(db.Notification.create({
                    title:`Dear student your schedule for tommor for Course ${course.title} is\n ${text}`,
                    link:"#",
                    type:"course"
                  }));
                  newStudents.push(student);
            })

          })
          Promise.all(promises)
            .then(responses=>{
              responses.forEach((res,i)=>{
                console.log(res);
                newStudents[i].notifications.push({notification:res._id});
                newStudents[i].save();
              })
            })
    })
    .catch(err=>{
      console.log(err.message);
    })
}
