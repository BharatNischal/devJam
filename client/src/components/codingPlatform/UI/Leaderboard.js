import React,{useEffect,useState} from 'react';
import axios from 'axios';

function Leaderboard(props) {

    const [students,setStudents] = useState([]);

    useEffect(()=>{

      axios.get(`/leaderboard/frontendquestion/${props.match.params.id}`)
        .then(res=>{
          if(res.data.success){
            setStudents(res.data.students);
            console.log(res.data.students);
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })

    },[])

    return (
        <div className="p-3">
        <h3><b> Leaderboard </b></h3><hr/>
        <div className="p-3">
            <table className="table table-striped">
                <thead style={{boxShadow:"0px 4px 8px rgba(0,0,0,0.5)"}}>
                <tr>
                    <th>Rank</th>
                    <th>Student</th>
                    <th>Points</th>
                </tr>
                </thead>
                <tbody>

                  {students.map((stu,i)=>(
                    <tr>
                        <td>{i+1}</td>
                        <td>{stu.userId.name}</td>
                        <td>{stu.maxMarks?stu.maxMarks:0}</td>
                    </tr>

                  ))}

                </tbody>
            </table>
        </div>
    </div>
    )
}

export default Leaderboard
