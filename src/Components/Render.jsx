import { useEffect } from "react";
import * as React from "react";
import Message from "./Message";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import "./components.css";
import Thread from "./Thread";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import SearchItem from "./SearchItem";
const label = { inputProps: { "aria-label": "Switch demo" } };

const Render = () => {
  const navigation = useNavigate();
  var urlLink = window.location.href;
  const [channelMessages, setChannelMessages] = useState([]);
  const [components, setComponents] = useState([]);
  const [uniquei, setUniquei] = useState([]);
  const [uniquec, setUniquec] = useState([]);
  const [threadCrumb, setThreadCrumb] = useState(false);
  const [thread, setThread] = useState(false);
  const [channels, setChannels] = useState([]);
  const [users, setUsers] = useState({});
  const [emojis, setEmojis] = useState({});
  const [masterData, setMasterData] = useState({});
  const [jointData, setJointData] = useState([]);
  const [phraseFilter, setPhraseFilter] = useState("");
  const [channelFilter, setChannelFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [dateFilter, setDateFilter] = useState({ from_date: 0, to_date: 0 });

  async function normalFetch(Swarga) {
    let response = await axios.get(
      `https://slackbackend.taparia11.repl.co/api/data/dynamic/collections/${Swarga}`
    );
    console.log(response);
    let data = await response.data;
    setChannelMessages(data);
  }

  const channelFetch = async () => {
    const response = await axios.get(
      "https://slackbackend.taparia11.repl.co/api/data/fetchallchannel"
    );
    setChannels(response.data);
  };

  const emojiFetch = async () => {
    const result = await axios.get(
      "https://slackbackend.taparia11.repl.co/api/data/fetchallemoji"
    );
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
    setUsers(map);
  };
  const getUserProfile = (id) => {
    return users[id];
  };

  const masterDataFetch = async () => {
    const result = await axios.get(
      "https://slackbackend.taparia11.repl.co/api/data/dynamic/collections/allData"
    );

    const master = {};
    for (const d of result.data.messages) master[d.name] = d.messages;
    setMasterData(master);

    const collective = [];
    Object.entries(master).map(([key, value]) =>
      value.map((message) => {
        message.channel = key;
        collective.push(message);
      })
    );
    setJointData(collective);
  };

  function addComponent(e) {
    e.preventDefault();

    setComponents(channelMessages);
    setUniquei(e.target.id);
    setUniquec(
      e.currentTarget.className.slice(10, e.currentTarget.className.length)
    );
    setThreadCrumb(true);
    setThread(true);
  }

  useEffect(() => {
    const channel = urlLink.split("/").pop();
    normalFetch(channel);
    channelFetch();
    userFetch();
    emojiFetch();
    masterDataFetch();
  }, []);

  const processSideWindow = () => {
    if (phraseFilter || channelFilter || userFilter || dateFilter.from_date) {
      return (
        <div className="threadmess">
          <div className="threadHead">
            <div>
              <h1>
                Search Results
                {channelFilter && channelFilter.length ? (
                  <text className="search-channel">
                    &nbsp; &nbsp; #{channelFilter}
                  </text>
                ) : (
                  ""
                )}
              </h1>
            </div>
            <div
              className="cross"
              onClick={() => {
                setPhraseFilter("");
                setChannelFilter("");
                setUserFilter("");
                setDateFilter({ from_date: 0, to_date: 0 });
              }}
            >
              <p>X</p>
            </div>
          </div>
          <div className="ThreadContainer">
            {(channelFilter ? masterData[channelFilter] : jointData)
              .filter((a) => {
                if (!a.user_profile) a.user_profile = getUserProfile(a.user);
                if (!a.user_profile || !a.thread_ts) return;

                let valid = !a.parent_user_id && a.ts;
                valid &=
                  !phraseFilter ||
                  a.text.toLowerCase().includes(phraseFilter.toLowerCase());
                valid &=
                  !userFilter ||
                  a.user_profile.real_name
                    ?.toLowerCase()
                    .includes(userFilter.toLowerCase());

                let ts = parseInt(a.ts) * 1000;
                valid &=
                  !dateFilter.from_date ||
                  (ts >= dateFilter.from_date && ts <= dateFilter.to_date);

                if (valid) return a;
              })
              .sort((a, b) => {
                if (!a.ts) return 1;
                if (!b.ts) return -1;
                return parseInt(a.ts) - parseInt(b.ts);
              })
              .map((elmt) => {
                var iTime = elmt.ts.slice(0, 10).toString();
                var fTime = elmt.ts.slice(11, 14).toString();
                if (!elmt.user_profile)
                  elmt.user_profile = getUserProfile(elmt.user);
                if (!elmt.user_profile) return;
                return (
                  <SearchItem
                    channel={!elmt.channelFilter ? elmt.channel : ""}
                    user={elmt.user_profile?.real_name}
                    blocks={elmt.blocks}
                    attachments={elmt.attachments}
                    getUserProfile={getUserProfile}
                    getEmoji={getEmoji}
                    time={parseInt(iTime + fTime)}
                    avatar={elmt.user_profile?.image_72}
                    key={elmt.ts}
                  />
                );
              })}
          </div>
        </div>
      );
    }

    if (thread) {
      return (
        <div className="threadmess">
          <div className="threadHead">
            <div>
              <h1>Thread</h1>
            </div>
            <div
              className="cross"
              onClick={() => {
                setThread(false);
                setThreadCrumb(false);
              }}
            >
              <p>X</p>
            </div>
          </div>
          <div className="ThreadContainer">
            {components
              .filter((a) => {
                if (uniquei == a.thread_ts && uniquec == a.parent_user_id)
                  return a;
              })
              .sort((a, b) => {
                if (!a.ts) return 1;
                if (!b.ts) return -1;
                return parseInt(a.ts) - parseInt(b.ts);
              })
              .map((elmt) => {
                var iTime = elmt.ts.slice(0, 10).toString();
                var fTime = elmt.ts.slice(11, 14).toString();
                return (
                  <Thread
                    user={elmt.user_profile.real_name}
                    blocks={elmt.blocks}
                    attachments={elmt.attachments}
                    getUserProfile={getUserProfile}
                    getEmoji={getEmoji}
                    time={parseInt(iTime + fTime)}
                    avatar={elmt.user_profile.image_72}
                    key={elmt.ts}
                  />
                );
              })}
          </div>
        </div>
      );
    }
  };
  return (
    <div className="dataContent">
      <div className="archive">
        <div>
          <h1>Slack Archives</h1>
          <p className="breadCrumbs">
            <span onClick={() => navigation(-1)}>All</span>&nbsp; &nbsp; &gt;
            &nbsp; &nbsp;<span>#{urlLink.split("/").pop()}</span>
            {threadCrumb ? (
              <text>&nbsp; &nbsp; &gt; &nbsp; &nbsp; Thread</text>
            ) : (
              ""
            )}
          </p>
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
              value={phraseFilter}
              onChange={(e) => setPhraseFilter(e.target.value)}
            />
            <label htmlFor="">In channel</label>
            <select
              id="channels"
              name="channels"
              value={channelFilter}
              onChange={(e) => {
                if (e.target.selectedIndex) setChannelFilter(e.target.value);
              }}
            >
              <option value="all">All channels</option>
              {channels.map((channel) => {
                return <option value={channel.name}>{channel.name}</option>;
              })}
            </select>
            <label htmlFor="">From user</label>
            <input
              type="text"
              placeholder="Display name or id..."
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
            />
            <label htmlFor="">Sort by</label>
            <div>
              <select id="channels" name="channels">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
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
            <div className="calendars">
              <div className="calendar-block">
                <text>From Date:</text>
                <input
                  type="date"
                  class="datepicker-input"
                  // value={dateFilter.from_date}

                  onChange={(event) => {
                    if (!event.target.valueAsNumber) return;
                    setDateFilter({
                      from_date: event.target.valueAsNumber,
                      to_date: dateFilter.to_date
                        ? dateFilter.to_date
                        : event.target.valueAsNumber,
                    });
                  }}
                />
              </div>
              <div className="calendar-block">
                <text>To Date:</text>
                <input
                  type="date"
                  class="datepicker-input"
                  // value={dateFilter.to_date}

                  onChange={(event) => {
                    setDateFilter({
                      from_date: dateFilter.from_date
                        ? dateFilter.from_date
                        : event.target.valueAsNumber,
                      to_date: event.target.valueAsNumber,
                    });
                  }}
                />
              </div>
            </div>
            <button className="btn btn-success">Search</button>
          </div>
        </div>
      </div>

      <div className="MessSection">
        <div className="messageBundle">
          {channelMessages
            .filter((a) => {
              if (!a.parent_user_id && a.thread_ts) return a;
            })
            .sort((a, b) => {
              if (!a.ts) return 1;
              if (!b.ts) return -1;
              return parseInt(a.ts) - parseInt(b.ts);
            })
            .map((element, idx, channelMessages) => {
              const result = [];

              const curDate = new Date(parseInt(element.ts) * 1000);
              let cur = formatDate(curDate);
              const detectChange = () => {
                const prevDate = new Date(
                  parseInt(channelMessages[idx - 1].ts) * 1000
                );
                let prev = formatDate(prevDate);
                return cur != prev;
              };

              if (idx === 0 || detectChange())
                result.push(
                  <div className="date">
                    <text>{cur}</text>
                  </div>
                );

              if (!element.user_profile)
                element.user_profile = getUserProfile(element.user);
              if (!element.user_profile) return;
              var iTime = element.thread_ts.slice(0, 10).toString();
              var fTime = element.thread_ts.slice(11, 14).toString();

              result.push(
                <>
                  <Message
                    nreq={channelMessages.length}
                    userid={element.user}
                    user={element.user_profile.real_name}
                    blocks={element.blocks}
                    attachments={element.attachments}
                    getUserProfile={getUserProfile}
                    getEmoji={getEmoji}
                    time={element.thread_ts.slice(0, 10)}
                    time1={parseInt(iTime + fTime)}
                    avatar={element.user_profile.image_72}
                    data={channelMessages}
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
            })}
        </div>

        {processSideWindow()}
      </div>
    </div>
  );
};

export default Render;
