import React, {useEffect, useState} from 'react'
import Channel from './Channel'
import './components.css'

import Render from './Render'
import Thread from './Thread'
const Sidebar = () => {

    let list = []
    const [articles, setArticles] = useState([])
   const[test, setTest] = useState([])
   const [save, setSave] = useState([])
    let lis = [0,1]
    const updateNews = async ()=>{
        const url = "https://slackbackend.taparia11.repl.co/api/data/fetchallchannel";
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(parsedData);
    }
    const trialFetch = async() => {
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
for(y=year-1;y<=year;y++){
    for( m=1;m<=12;m++){
        for( d=1;d<=31;d++){
    let url = `https://slackbackup.netlify.app/data/agency-life/${y}-${m}-${d}.json` ;
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
console.log(test); 
    }

    useEffect(() => {
        updateNews();
        //eslint-disable-next-line
    }, [])
    return (
        <>
        <div style={{display:'flex'}}>
            <div className="w3-sidebar w3-bar-block w3-light-grey w3-card" style={{width:"15%"}}>
           {articles.map((element) => {
            //    console.log(element);
                            return <>
                            <div>
                                <Channel name={element.name}/>
                            
                                </div>
                                </>
                        })}
            </div> 
       
            <div className='dataContent'>
            <h1>Slack Archives</h1>
            <div style={{display:'flex'}}>
    <div className='ren'>
    <Render/>
  
    </div>
      {/* <div style={{overflowY:'scroll', width:'23rem', overflowX:'hidden'}}>
      <Thread/>
      </div>  */}
    </div>
           
            </div>
            </div>
        </>
    )
}

export default Sidebar




