import React from 'react'

const Trender = (props) => {
  return (
    <div className="threadmess">
    <div className="card-body">
    <h5 className="card-title">{props.user}  <span className="card-text"><small className="text-muted">12:00pm</small></span></h5>
    
      <p className="card-text">{props.message}</p>
    
   
    </div>
    </div>
  )
}

export default Trender