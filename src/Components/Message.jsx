import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './components.css'
import { processBlocks } from '../utils/processBlocks'
import { processAttachments } from '../utils/processAttachments'
import Thread from './Thread';
const Message = (props) => {
  const Navigate =  useNavigate();
  const [components, setComponents] = useState([]); 
  const [timeValue, settimeValue] = useState()
  const[times, setTimes] = useState([]);
  const threadVisibility = useRef();
  let list = []
  // let userTime = props.time
  // const[tdata, setTdata] = useState([]);
  // setTdata(props.data)
  // console.log(tdata)
  // var date;
  // const TimeConv = (time) => {
  //   date = new Date(time);
  //   console.log(date)
    // let timestamp = parseInt(props.time);
    // let date = new Date(timestamp);
  try{

  // console.log(props.time)

var n = [0,1]
  

}
catch(err){
  console.log('no time')
}
function addComponent(e) { 
  // refclose.current.click();
  if(components == []){
  setComponents(props.data) 
  }
  else
  {
    setComponents([])
    setComponents(props.data)
  }
  // console.log(components)
  document.getElementById('thred').innerHTML = 'Thread';
  document.getElementById('cross').innerHTML = 'X'
  threadVisibility.current.style.display="initial"
    // thread_ts && parent_user_id
    props.fun(true)
  e.preventDefault();
  
} 
// var userTime = parseInt(props.time1)
// var userDate = new Date(userTime);
// settimeValue(userDate)
// console.log(userDate)

const removeComponent = (e) =>{
  setComponents([])
 threadVisibility.current.style.display="none"
  // document.getElementById('thred').innerHTML = '';
  // document.getElementById('cross').innerHTML = ''
  props.fun(false);
  e.preventDefault();
}

  return (

    <div className="Card mb-5" >
    <div>
    <img src={props.avatar} className="card-img-top" alt="..."/>
    </div>
    <div className="card-body" id='cardBody'>
    <div className="message">
    <h5 className="card-title">{props.user}  
    <span className="card-text"><small className="text-muted">{`${new Date(props.time1)}`
    // `${new Date(props.time)}`
    // date.getDate()+
    //   "/"+(date.getMonth()+1)+
    //   "/"+date.getFullYear()+
    //   " "+date.getHours()+
    //   ":"+date.getMinutes()+
    //   ":"+date.getSeconds()
      }</small></span></h5>
    
      <p className="card-text">{processBlocks(props.blocks, props.getUserProfile, props.getEmoji)}</p>
   
      {processAttachments(props.attachments)}
    
    {/* {props.thread ? <button className='ThreadBtn' onClick={addComponent}>View Thread</button> : <h4></h4>} */}
    </div>
    <div className="threadmess" ref={threadVisibility}>
 
    <span id='thred'></span>
    <span id='cross' onClick={removeComponent}></span>
    
   
    
  
      {/* {components.map((item) => {
        return( 
        
          <div style={{overflowY:'scroll', width:'40%', overflowX:'hidden'}}>
          <Thread />
          </div>
        
        )
        })}  */}
       
{components
      .sort((a, b) => {
        if (!a.ts) return 1;
        if (!b.ts) return -1;
        return parseInt(a.ts) - parseInt(b.ts);
      }).map((elmt)=>{
      if ( props.thread == elmt.thread_ts  && props.userid == elmt.parent_user_id ) {
      
        try{
                              return( 
                                <>
                <Thread user={elmt.user_profile.real_name} blocks={elmt.blocks} attachments={elmt.attachments} getUserProfile={props.getUserProfile} getEmoji={props.getEmoji} time={elmt.thread_ts} avatar={elmt.user_profile.image_72} />
              
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