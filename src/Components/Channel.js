import React from 'react'

const Channel = (props) => {
    let {name} = props;
    return (
        <>
        <div className="Channel">
        <a href={name} class="w3-bar-item w3-button">{name}</a>
        </div>
      
        
        </>
    )
}

export default Channel