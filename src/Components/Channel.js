import React from 'react'

const Channel = (props) => {
    let {name} = props;
    return (
        <>
       
        <p><a href={name} class="w3-bar-item w3-button">#{name}</a></p>
       
      
        
        </>
    )
}

export default Channel