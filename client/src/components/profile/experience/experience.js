import React from "react";
import Exp from "./exp/exp";

const Experience =(props)=>(
    <div className="edCont">
        {props.data.map(ex=>(
            <Exp position={ex.position} key={ex._id} company={ex.company} from={ex.from} present={ex.to.present} to={ex.to.date} description={ex.description} />
        ))}



    </div>
);

export default Experience;
