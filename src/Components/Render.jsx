import { useEffect } from "react";
import * as React from "react";
import Message from "./Message";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import "./components.css";
import Thread from "./Thread";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
const label = { inputProps: { "aria-label": "Switch demo" } };

const Render = () => {
  let months = {
    "01":"Jan",
    "02":"Feb",
    "03":"Mar",
    "04":"Apr",
    "05":"May",
    "06":"Jun",
    "07":"Jul",
    "08":"Aug",
    "09":"Sep",
    "10":"Oct",
    "11":"Nov",
    "12":"Dec"
  }
  // console.log(months["01"])
  const navigation = useNavigate();
  var urlLink = window.location.href;
  var fl = urlLink.length;
  const [test, setTest] = useState([]);
  const [components, setComponents] = useState([]);
  const [uniquei, setUniquei] = useState([]);
  const [uniquec, setUniquec] = useState([]);
  const [query, setQuery] = useState("");
  const [channelquery, setChannelQuery] = useState("");
  const [threadCrumb, setThreadCrumb] = useState(false);
  const [thread, setThread] = useState(false);
  const [timeValue, settimeValue] = useState("");
  const [users, setUsers] = useState({});
const[DateFilter, setDateFilter] = useState("");
const[monthFilter, setMonthFilter] = useState("");
const[yearFilter, setYearFilter] = useState("");
  let list = [];
  const [emojis, setEmojis] = useState({});
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
    let y, m, d;
    let temp = [];
    console.log(Swarga);
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
  };
  // const normalFetch = async(Swarga) => {
  // let url = `https://slackbackend.taparia11.repl.co/api/data/fetch${Swarga}`
  // let res = await fetch(url);
  // let data = await res.json();
  // setTest(data);
  // }
  async function normalFetch(Swarga) {
    // console.log("HII")
    let response = await axios.get(
      `https://slackbackend.taparia11.repl.co/api/data/dynamic/collections/${Swarga}`
    );
    console.log(response);
    let data = await response.data;
    setTest(data);
  }
 

const emojiFetch = async () => {
  const result = await axios.get(
    "https://slackbackend.taparia11.repl.co/api/data/fetchallemoji"
  );
  console.log(result.data[0]);
  setEmojis(result.data[0]);
};
const getEmoji = (name) => {
  return emojis[name];
};

  const userFetch = async () => {
    const result = await axios.get(
      "https://slackbackend.taparia11.repl.co/api/data/fetchallusers"
    );

    let map = {};
    for (const user of await result.data) {
      map[user.id] = user;
    }
    console.log(map);
    setUsers(map);
  };
  const getUserProfile = (id) => {
    return users[id];
  };

  function addComponent(e) {
    // refclose.current.click();

    setComponents(test);
    console.log(components);
    // document.getElementById('thred').innerHTML = 'Thread';
    // thread_ts && parent_user_id
    // const id = e.target.id;
    setUniquei(e.target.id);
    setUniquec(
      e.currentTarget.className.slice(10, e.currentTarget.className.length)
    );
    e.preventDefault();
    setThreadCrumb(true);
    setThread(true);
  }

useEffect(() => {
  const channel = urlLink.split("/").pop();
  trialFetch(channel);
  normalFetch(channel);
  userFetch();
  emojiFetch();
}, []);
  return (
    <div className="dataContent">
      <div className="archive">
        <div>
          <h1>Slack Archives</h1>

          {threadCrumb === false ? (
            <p className="breadCrumbs">
              <span onClick={() => navigation(-1)}>All</span>&nbsp; &nbsp; &gt;
              &nbsp; &nbsp;<span>#{urlLink.slice(32, fl)}</span>
            </p>
          ) : (
            <p className="breadCrumbs">
              <span
                onClick={() => {
                  navigation(-1);
                }}
              >
                All
              </span>
              &nbsp; &nbsp; &gt; &nbsp; &nbsp;
              <span
                onClick={() => {
                  setThread(false);

                  setThreadCrumb(false);
                }}
              >
                #{urlLink.slice(32, fl)}
              </span>
              &nbsp; &nbsp; &gt; &nbsp; &nbsp; Thread
            </p>
          )}
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
            <input
              type="date"
              class="datepicker-input"
              onChange={(event) => {
                setDateFilter(event.target.value.slice(8, 10).toString());
                setMonthFilter(event.target.value.slice(5,7).toString());
                setYearFilter(event.target.value.slice(0,4).toString());
                // console.log(event.target.value.slice(0,4).toString())
              }}
            />
          </span>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-secondary-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>

          <div className="dropdown-menu" id="drop">
            <label htmlFor="">Search For</label>
            <input
              type="text"
              placeholder="Enter phrase..."
              onChange={(event) => setQuery(event.target.value)}
            />
            <label htmlFor="">In channel</label>
            <select id="channels" name="channels">
              <option value="all">All channels</option>
              <option value="current">{urlLink.slice(32, fl)}</option>
            </select>
            <label htmlFor="">From user</label>
            <input
              type="text"
              placeholder="Display name or id..."
              onChange={(event) => setChannelQuery(event.target.value)}
            />
            <label htmlFor="">Sort by</label>
            <div>
              <select id="channels" name="channels">
                <option value="all">Newest First</option>
                <option value="current">Oldest First</option>
              </select>
            </div>
            <p>
              Match exact phrase
              <Switch {...label} />
            </p>
            <div className="byDate">
              Filter by dates
              <span>
                <Switch {...label} />
              </span>
            </div>
            <button className="btn btn-success">Search</button>
          </div>
        </div>
      </div>
      <div className="MessSection">
        <div className="messageBundle">
         
{test
  .filter((post) =>{
    let ik = "name";
    let timeStamp = "";
  let merge,mergeSlice,t1,t2;
    // let t1 = timeStamp.toString().slice(0,10)
    // let t2 = timeStamp.toString().slice(11,14)
    try {
      // console.log(new Date(timeStamp))
      ik = post.user_profile.real_name;
      timeStamp = post.thread_ts;
       t1=timeStamp.slice(0,10).toString();
      t2 = timeStamp.slice(11,14).toString();
     merge = new Date(parseInt(t1+t2)).toString();
    //  console.log(merge.slice(11,15))
    //  mergeSlice = merge.slice(8,10);
      // console.log(merge.slice(8,10))
      // console.log(DateFilter);
      // != undefined ? post.user_profile.real_name : 0;
    } catch (error) {
      // console.log("Error hai");
    }
    // let na = test.filter(user => Object.values(user.user_profile).reduce((a,b,c,d) => d).toLowerCase().includes(query.toLowerCase()));
    // console.log(ik)
    try{
    if (query === "" && channelquery === "" && DateFilter === "" && monthFilter ==="" && yearFilter ==="") {
     
      return post;
    }    else if (
      post.text.toLowerCase().includes(query.toLowerCase()) &&
      channelquery === "" && query!=""
      && DateFilter==="" && monthFilter ==="" && yearFilter ===""
    ) {
      
      return post;
    } else if (
      ik.toLowerCase().includes(channelquery.toLowerCase()) &&
      query === "" && channelquery!=""
      && DateFilter==="" && monthFilter ==="" && yearFilter ===""
    ) {
   
      return post;
    } 
   else if (
    post.text.toLowerCase().includes(query.toLowerCase()) &&
     ik.toLowerCase().includes(channelquery.toLowerCase()) && DateFilter==="" && monthFilter ==="" && yearFilter ===""
  ) {
   
    return post;
  }    
     else if(new Date(parseInt(t1+t2)).toString().slice(8,10).includes(DateFilter.toString().toLowerCase()) && new Date(parseInt(t1+t2)).toString().slice(4,7).toLowerCase().includes(months[monthFilter].toString().toLowerCase()) && new Date(parseInt(t1+t2)).toString().slice(11,15).includes(yearFilter.toString().toLowerCase()) &&  post.text.toLowerCase().includes(query.toLowerCase()) && ik.toLowerCase().includes(channelquery.toLowerCase()) && query!="" && channelquery!=""){
      
      return post;
     }  else if(new Date(parseInt(t1+t2)).toString().slice(8,10).includes(DateFilter.toString().toLowerCase()) && new Date(parseInt(t1+t2)).toString().slice(4,7).toLowerCase().includes(months[monthFilter].toString().toLowerCase()) && new Date(parseInt(t1+t2)).toString().slice(11,15).includes(yearFilter.toString().toLowerCase()) &&  post.text.toLowerCase().includes(query.toLowerCase()) && channelquery === "" && query!=""){
     
      return post;
     }else if(new Date(parseInt(t1+t2)).toString().slice(8,10).includes(DateFilter.toString().toLowerCase()) && new Date(parseInt(t1+t2)).toString().slice(4,7).toLowerCase().includes(months[monthFilter].toString().toLowerCase()) && new Date(parseInt(t1+t2)).toString().slice(11,15).includes(yearFilter.toString().toLowerCase()) && query ==="" &&  ik.toLowerCase().includes(channelquery.toLowerCase()) && channelquery!=""){
      return post;
     }
     else if(new Date(parseInt(t1+t2)).toString().slice(8,10).includes(DateFilter.toString().toLowerCase()) && new Date(parseInt(t1+t2)).toString().slice(4,7).toLowerCase().includes(months[monthFilter].toString().toLowerCase()) && new Date(parseInt(t1+t2)).toString().slice(11,15).includes(yearFilter.toString().toLowerCase()) && query ==="" && channelquery === ""){
      return post;
     }
    }
    catch(err){
      // console.log("Error Lag Gyaaa............")
    }
  }).filter((a) => {
    if (!a.parent_user_id) return a;
  })
  .sort((a, b) => {
    if (!a.ts) return 1;
    if (!b.ts) return -1;
    return parseInt(a.ts) - parseInt(b.ts);
  })
  .map((element, idx, test) => {
      try {
        const result = [];
        if (idx != 0) {
          const curDate = new Date(parseInt(element.ts) * 1000);
          const prevDate = new Date(parseInt(test[idx - 1].ts) * 1000);

          let cur = formatDate(curDate);
          let prev = formatDate(prevDate);

          if (cur != prev)
            result.push(
              <div className="date">
                <text>{cur}</text>
              </div>
            );
        }
        
        var iTime = element.thread_ts.slice(0, 10).toString();
        var fTime = element.thread_ts.slice(11, 14).toString();

        result.push(
          <>
            <Message
              nreq={test.length}
              userid={element.user}
              user={element.user_profile.real_name}
              blocks={element.blocks}
              attachments={element.attachments}
              getUserProfile={getUserProfile}
              getEmoji={getEmoji}
              time={element.thread_ts.slice(0, 10)}
              time1={parseInt(iTime + fTime)}
              avatar={element.user_profile.image_72}
              data={test}
              thread={element.thread_ts > 1 ? element.thread_ts : 0}
            />
            {element.thread_ts ? (
              <button
                className={`ThreadBtn ${element.user}`}
                id={`${element.thread_ts}`}
                onClick={addComponent}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="MessIcon"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chat-left-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                </svg>
                {element.reply_users_count} Replies
              </button>
            ) : (
              <h4></h4>
            )}
          </>
        );
        return result;
      } catch (err) {
        console.log("error occured");
      }
  })}
</div>

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
    {components
      .sort((a, b) => {
        if (!a.ts) return 1;
        if (!b.ts) return -1;
        return parseInt(a.ts) - parseInt(b.ts);
      }).map((elmt)=>{
      console.log(uniquei)
      if ( uniquei == elmt.thread_ts  && uniquec == elmt.parent_user_id ) {
      
        try{var iTime = elmt.ts.slice(0,10).toString()
          var fTime = elmt.ts.slice(11,14).toString()
                              return( 
                                <>
                <Thread user={elmt.user_profile.real_name} blocks={elmt.blocks} attachments={elmt.attachments} getUserProfile={getUserProfile} getEmoji={getEmoji} time={parseInt(iTime+fTime)} avatar={elmt.user_profile.image_72} />
              
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
  );
};

export default Render;
