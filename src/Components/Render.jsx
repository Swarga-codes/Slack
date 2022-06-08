import { useEffect } from 'react'
import * as React from 'react';
import Message from './Message'
import { useState } from 'react'
import Switch from '@mui/material/Switch';
import './components.css'
import Thread from './Thread'
import axios from 'axios'
const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Render = () => {

  var urlLink = window.location.href;
  var fl = urlLink.length;
  const[test, setTest] = useState([])
  const [components, setComponents] = useState([]); 
  const [uniquei, setUniquei] = useState([]); 
  const [uniquec, setUniquec] = useState([]); 
  const [query, setQuery] = useState("")
  const[threadCrumb, setThreadCrumb] = useState(false);
  const[thread, setThread] = useState(false)
  
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

function addComponent(e) { 
  // refclose.current.click();
  
  setComponents(test) 
  console.log(components)
  // document.getElementById('thred').innerHTML = 'Thread';
    // thread_ts && parent_user_id
    // const id = e.target.id;
    setUniquei(e.target.id)
    setUniquec(e.currentTarget.className.slice(10,e.currentTarget.className.length))
  e.preventDefault();
  setThreadCrumb(true)
  setThread(true)
} 

useEffect(()=>{
trialFetch(urlLink.slice(32,fl));
// normalFetch(urlLink.slice(32,fl));   //(for localhost)
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
   {/* <form className="d-flex" role="search">
    <input className="form-control me-2" onChange={event => setQuery(event.target.value)} type="search" placeholder="Search in Slack" aria-label="Search" id='searchBar'/>
    <button className="btn btn-outline-dark" type="submit">Search</button>
</form>*/}
  </div>
  <div className="calendars">
  <span class="datepicker-toggle">
  <span class="datepicker-toggle-button"></span>
  <input type="date" class="datepicker-input"/>
</span>
</div>

  <div className="dropdown">
  <button className="btn btn-secondary-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
  </button>
  
  <div className="dropdown-menu" id='drop'>
<label htmlFor="">Search For</label>
<input type="text" placeholder='Enter phrase...'  onChange={event => setQuery(event.target.value)}/>
<label htmlFor="">In channel</label>
<select id="channels" name="channels">
<option value="all">All channels</option>
<option value="current">{urlLink.slice(32,fl)}</option>
</select>
<label htmlFor="">From user</label>
<input type="text" placeholder='Display name or id...' onChange={event => setQuery(event.target.value)}/>
<label htmlFor="">Sort by</label>
<div>
<select id="channels" name="channels">
<option value="all">Newest First</option>
<option value="current">Oldest First</option>
</select>
</div>
<p>
Match exact phrase
<Switch {...label}/>
</p>
<div className='byDate'>
Filter by dates
<span>
<Switch {...label} />
</span>
</div>
<button className='btn btn-success'>Search</button>


  </div>
</div>
  </div>
  <div className="MessSection">
    <div className='messageBundle'>
  
  

    {
      test.filter(post => 
        { let ik = "name"
          try {
            
             ik = post.user_profile.real_name 
             // != undefined ? post.user_profile.real_name : 0;
            } catch (error) {
              
              console.log("Error hai")
            }
            // let na = test.filter(user => Object.values(user.user_profile).reduce((a,b,c,d) => d).toLowerCase().includes(query.toLowerCase()));
            // console.log(ik)
        if (query === '') {
          return post;
        } else if (post.text.toLowerCase().includes(query.toLowerCase()) || ik.toLowerCase().includes(query.toLowerCase()) ) {
          return post;
        }
      }
      ).map((element,list,test,count) => {    //     const filterArray = element.filter((element,id) => 
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
          <Message nreq={test.length} userid={element.user} user={element.user_profile.real_name} message={element.text} time={element.thread_ts} avatar={element.user_profile.image_72} data={test} thread={element.thread_ts > 1 ? element.thread_ts : 0}/>   
          {element.thread_ts ? <button className={`ThreadBtn ${element.user}`} id={`${element.thread_ts}`} onClick={addComponent}>{element.reply_users_count} Replies</button> : <h4></h4>}
</>)
              }
                          catch(err){
                            console.log('error occured');
                          }
                          // }
                        
                        }   })
      } </div>
      {thread === true?
    <div className="threadmess">
    <div className='threadHead'>
    <div>
      <h1>Thread</h1>
    
      </div>
      <div className='cross' onClick={() => {
        setThread(false)
      setThreadCrumb(false)
      }}>
      <p>X</p>
      </div>
      </div>
      <div className="ThreadContainer">
    {components.map((elmt)=>{
      console.log(uniquei)
      if ( uniquei == elmt.thread_ts  && uniquec == elmt.parent_user_id ) {
      
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
      :
      <div></div>
  }
      </div>
    </div>
  )
}

export default Render