import React, { useEffect } from 'react'
import Message from './Message'
import { useState } from 'react'
import './components.css'
const Render = () => {
  var urlLink = window.location.href;
  var fl = urlLink.length;
  const[test, setTest] = useState([])
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
for(y=year-3;y<=year;y++){
for( m=1;m<=12;m++){
    for( d=1;d<=31;d++){
let url = `http://localhost:3000/data/${Swarga}/${y}-${m}-${d}.json` ;
        // console.log(m)
        try {
            let testdata = await fetch(url);
            let testedData = await testdata.json();
            // let combo = test.concat(testedData);
            // if(temp!==save){
            // setSave(testedData)
        //   setTest( test => [...test,testedData])
            // setTest(test => [...test, save])
            // temp=testedData;
            // console.log("helo"+temp)
            // }
            list.push(...testedData);
        
          } catch(err) {
            // catches errors both in fetch and response.json
        //   console.log('error')
          }
       
    }
}
}
// list.pop();
setTest(list)
// console.log(test); 
}
useEffect(()=>{
trialFetch(urlLink.slice(22,fl));
},[])
  return (
    <div className='dataContent'>
    {
      test.map((element) => {    //     const filterArray = element.filter((element,id) => 
      //     element.id !== id);
      //     setArticles(filterArray);
  // for(let i=0;i<list.length;i++){
                          return( 
                              
//   <h2>Hello</h2>
          // <h1 key={element.id}>{element.id}</h1>
          <Message user={element['user']} message={element.text} time={element.thread_ts}/>
          )
                          // }
      })
      } 
    </div>
  )
}

export default Render