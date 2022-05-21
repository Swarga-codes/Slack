import React, { useEffect, useState } from 'react'
import Channel from './Channel';
import './components.css'
const Welcome = () => {
  const[articles, setArticles] = useState([]);
  const updateNews = async ()=>{
    const url = "http://localhost:3000/data/channels.json";
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(parsedData);
}
useEffect(()=>{
  updateNews();
},[])
  return (
   
  <div className="Welcome">
 
  <h1>Categories</h1>
  {articles.map((elements) => {
    return(
    <div className="WelCards">
    <div className="card">
    <div className="card-body">
    <Channel name={elements.name}/>
    </div>
  </div>
  
    </div>
    )
  })}
 
  </div>
  )
}

export default Welcome