import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import './components.css'
import Thread from './Thread';
const Message = (props) => {
  const [components, setComponents] = useState([]); 
  const[times, setTimes] = useState([]);
  let list = []
  // const[tdata, setTdata] = useState([]);
  // setTdata(props.data)
  // console.log(tdata)
  // var date;
  // const TimeConv = (time) => {
  //   date = new Date(time);
  //   console.log(date)
  let timestamp = parseInt(props.time);
  let date = new Date(timestamp);
  try{

  // console.log(props.time)

var n = [0,1]
  
  
//   console.log(""+date.getDate()+
//             "/"+(date.getMonth()+1)+
//             "/"+date.getFullYear()+
//             " "+date.getHours()+
//             ":"+date.getMinutes()+
//             ":"+date.getSeconds());
//             console.log(date.getMonth());
//             // setTimes(date)
}
catch(err){
  console.log('no time')
}
function addComponent(e) { 
  // refclose.current.click();
  
  setComponents(props.data) 
  // console.log(components)
  document.getElementById('thred').innerHTML = 'Thread';
    // thread_ts && parent_user_id
  e.preventDefault();
  
} 
  return (

    <div className="Card mb-5" >
    <div>
    <img src={props.avatar} className="card-img-top" alt="..."/>
    </div>
    <div className="card-body" id='cardBody'>
    <div className="message">
    <h5 className="card-title">{props.user}  <span className="card-text"><small className="text-muted">{date.getDate()+
      "/"+(date.getMonth()+1)+
      "/"+date.getFullYear()+
      " "+date.getHours()+
      ":"+date.getMinutes()+
      ":"+date.getSeconds()}</small></span></h5>
    
      <p className="card-text">{props.message}</p>
   
    
    {/* {props.thread ? <button className='ThreadBtn' onClick={addComponent}>View Thread</button> : <h4></h4>} */}
    </div>
    <div className="threadmess">
    <h2 id='thred'></h2>
  
      {/* {components.map((item) => {
        return( 
        
          <div style={{overflowY:'scroll', width:'40%', overflowX:'hidden'}}>
          <Thread />
          </div>
        
        )
        })}  */}
       
{components.map((elmt)=>{
      if ( props.thread == elmt.thread_ts  && props.userid == elmt.parent_user_id ) {
      
        try{
                              return( 
                                <>
                <Thread user={elmt.user_profile.real_name} message={elmt.text} time={elmt.thread_ts} avatar={elmt.user_profile.image_72} />
              
            </>
              )
                              }
                              catch(err){
                                console.log('error occured');
                              }
      }
      // props.thread 
      
    })}
    </div>
    </div>
  </div>
  
  )
}

export default Message