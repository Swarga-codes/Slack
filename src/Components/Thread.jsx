import React from 'react'
import { processBlocks } from '../utils/processBlocks'
import { processAttachments } from '../utils/processAttachments'

const Thread = (props) => {
  return (
    <div className='thread'>
    {/* <h2>Thread</h2> */}
    <div className="threadmess"> 
  
    <img src={props.avatar} className="card-img-top" alt="..."/>
  
    <div className="card-body">
    <h5 className="card-title">{props.user}  <span className="card-text"><small className="text-muted">{`${new Date(props.time)}`}</small></span></h5>
    
      <p className="card-text">{processBlocks(props.blocks, props.getUserProfile, props.getEmoji)}</p>
    
    {processAttachments(props.attachments)}
   
    </div>
    </div>
    </div>
  )
}

export default Thread