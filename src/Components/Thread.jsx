import React from 'react'

const Thread = (props) => {
  return (
    <div className='thread'>
    {/* <h2>Thread</h2> */}
    <div className="threadmess"> 
  
    <img src={props.avatar} className="card-img-top" alt="..."/>
  
    <div className="card-body">
    <h5 className="card-title">{props.user}  <span className="card-text"><small className="text-muted">12:00pm</small></span></h5>
    
      <p className="card-text">{props.message}</p>
    
   
    </div>
    </div>
    </div>
  )
}

export default Thread