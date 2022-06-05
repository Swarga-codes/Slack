import React, { useEffect } from 'react'
import Message from './Message'
import { useState } from 'react'
import './components.css'
import Thread from './Thread'
import axios from 'axios'

const Render = () => {

  var urlLink = window.location.href;
  var fl = urlLink.length;
  const[test, setTest] = useState([])
  const [query, setQuery] = useState("")
  const[threadCrumb, setThreadCrumb] = useState(false);
  
  let list = []
  const trialFetch = async(Swarga) => {
    // const day = getDate();
    // const month = getMonth();
    // const year = getFullYear();
//         const day = new Date();
// day.getDate();
// console.log(day);
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
let y,m,d;
let temp = []
console.log(Swarga)
// for(y=year;y<=year;y++){
// for( m=1;m<=12;m++){
//     for( d=1;d<=31;d++){
// let url = `https://slackbackend.taparia11.repl.co/api/data/fetch${Swarga}` ;
        // console.log(m)
        // try {
        //     let testdata = await fetch(url);
        //     let testedData = await testdata.json();
            // let combo = test.concat(testedData);
            // if(temp!==save){
            // setSave(testedData)
        //   setTest( test => [...test,testedData])
            // setTest(test => [...test, save])
            // temp=testedData;
            // console.log("helo"+temp)
            // }
            // list.push(...testedData);
        // console.log('data fetched succesfully...')
          // } catch(err) {
            // catches errors both in fetch and response.json
        //   console.log('error')
          // }
       
    // }
// }
// }
// list.pop();
// setTest(list)
// console.log(test); 
}
// const normalFetch = async(Swarga) => {
// let url = `https://slackbackend.taparia11.repl.co/api/data/fetch${Swarga}`
// let res = await fetch(url);
// let data = await res.json();
// setTest(data);
// }
async function normalFetch(Swarga) {
  // console.log("HII")
  let response = await axios.get(`https://slackbackend.taparia11.repl.co/api/data/fetch${Swarga}`);
console.log(response);
let data = await response.data;
         setTest(data);
}
useEffect(()=>{
trialFetch(urlLink.slice(22,fl));
// normalFetch(urlLink.slice(22,fl));   //(for localhost)
normalFetch(urlLink.slice(32,fl));
},[])
  return (
    <div className='dataContent'>
    <div className="archive">
    <div>
    <h1>Slack Archives</h1>
    {threadCrumb===false?
    <p className='breadCrumbs'>All &nbsp; &nbsp; &gt; &nbsp; &nbsp; #{urlLink.slice(32,fl)}</p>
    :
    <p className='breadCrumbs'>All &nbsp; &nbsp; &gt; &nbsp; &nbsp; #{urlLink.slice(32,fl)} &nbsp; &nbsp; &gt; &nbsp; &nbsp; Thread</p>
  }
    </div>
    <div>
    <form className="d-flex" role="search">
    <input className="form-control me-2" onChange={event => setQuery(event.target.value)} type="search" placeholder="Search in Slack" aria-label="Search" id='searchBar'/>
    <button className="btn btn-outline-dark" type="submit">Search</button>
  </form>
  </div>
  </div>
    <div className='messageBundle'>
  
  

    {
      test.filter(post => {
        if (query === '') {
          return post;
        } else if (post.text.toLowerCase().includes(query.toLowerCase())) {
          return post;
        }
      }).map((element,list,test,count) => {    //     const filterArray = element.filter((element,id) => 
      //     element.id !== id);
      //     setArticles(filterArray);
  // for(let i=0;i<list.length;i++){
    if (!element.parent_user_id) {
      
    
    try{
      
      // console.log(test)
    
  
                          return( 
                              
//   <h2>Hello</h2>
          // <h1 key={element.id}>{element.id}</h1>
         <>
             
        {/*<Message user={element['user']} message={element.text} time={element.thread_ts}/>*/}
        
        <Message fun={setThreadCrumb} count={element.reply_users_count} nreq={test.length} userid={element.user} user={element.user_profile.real_name} message={element.text} time={element.thread_ts} avatar={element.user_profile.image_72} data={test} thread={element.thread_ts > 1 ? element.thread_ts : 0}/>
          
        </>
          )
                          }
                          catch(err){
                            console.log('error occured');
                          }
                          // }
                        
                        }   })
      }
    
      
      </div>
     
    </div>
  )
}

export default Render