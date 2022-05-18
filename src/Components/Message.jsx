import React, { useEffect } from 'react'
import { useRef } from 'react';
import './components.css'
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
    <div className="Card mb-5" >
    <div>
    <img src={props.avatar} className="card-img-top" alt="..."/>
    </div>
    <div className="card-body">
    <h5 className="card-title">{props.user}  <span className="card-text"><small className="text-muted">{props.time}</small></span></h5>
    
      <p className="card-text">{props.message}</p>
    
   
    </div>
  </div>
  )
}

export default Message