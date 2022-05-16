import React, { useEffect } from 'react'
import { useRef } from 'react';
const Message = (props) => {
  var date;
  const TimeConv = (time) => {
    date = new Date(time);
    console.log(date)

  }
  useEffect(()=>{
    // TimeConv(date);
  },[])
  return (
    <div className="card mb-3">
    <div className="card-body">
    <h5 className="card-title">{props.user}</h5>
    <p className="card-text"><small className="text-muted">{props.time}</small></p>
      <p className="card-text">{props.message}</p>
    
   
    </div>
  </div>
  )
}

export default Message