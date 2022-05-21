import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import './components.css'
const Message = (props) => {
  const[times, setTimes] = useState(0);
  // var date;
  // const TimeConv = (time) => {
  //   date = new Date(time);
  //   console.log(date)
  let timestamp = parseInt(props.time);
  let date = new Date(timestamp);
  try{

  console.log(props.time)
 


  
  
  console.log(""+date.getDate()+
            "/"+(date.getMonth()+1)+
            "/"+date.getFullYear()+
            " "+date.getHours()+
            ":"+date.getMinutes()+
            ":"+date.getSeconds());
            console.log(date.getMonth());
            // setTimes(date)
}
catch(err){
  console.log('no time')
}
  
  return (

    <div className="Card mb-5" >
    <div>
    {console.log(props.thread)}
    <img src={props.avatar} className="card-img-top" alt="..."/>
    </div>
    <div className="card-body">
    <h5 className="card-title">{props.user}  <span className="card-text"><small className="text-muted">{date.getDate()+
      "/"+(date.getMonth()+1)+
      "/"+date.getFullYear()+
      " "+date.getHours()+
      ":"+date.getMinutes()+
      ":"+date.getSeconds()}</small></span></h5>
    
      <p className="card-text">{props.message}</p>
    
   
    </div>
  </div>
  

  )
}

export default Message