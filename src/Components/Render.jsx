import { useEffect, createRef } from "react";
import * as React from "react";
import Message from "./Message";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useRef } from "react";
import Switch from "@mui/material/Switch";
import "./components.css";
import Thread from "./Thread";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { getCalendarDate } from "../utils/getCalendarDate";
import { SearchLoading } from "./SearchLoading";
import SearchItem from "./SearchItem";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";
const label = { inputProps: { "aria-label": "Switch demo" } };

const Render = ({ jointData, masterData, channels, users, emojis }) => {
  const navigation = useNavigate();
  var urlLink = window.location.href;
  const [currentChannel, setCurrentChannel] = useState("");
  const [channelMessages, setChannelMessages] = useState([]);
  const [refs, setRefs] = useState({});
  const [focusMessage, setFocusMessage] = useState("");
  const [components, setComponents] = useState([]);
  const [uniquei, setUniquei] = useState([]);
  const [uniquec, setUniquec] = useState([]);
  const [threadCrumb, setThreadCrumb] = useState(false);
  const [thread, setThread] = useState(false);
  const [phraseFilter, setPhraseFilter] = useState("");
  const [exactPhrase, setExactPhrase] = useState(false);
  const [channelFilter, setChannelFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [sortFilter, setSortFilter] = useState(1);
  const [dateActivator, setDateActivator] = useState(false);
  const [dateFilter, setDateFilter] = useState({ from_date: 0, to_date: 0 });
  const [searchResults, setSearchResults] = useState(false);
  const ref = useRef();
  const resize = useRef();
  const closeTooltip = () => {
    ref.current.close();
    setPhraseFilter("");
    setChannelFilter("");
    setUserFilter("");
    setDateFilter({ from_date: 0, to_date: 0 });
    setSearchResults(false);
  };

  useEffect(() => {
    if (!focusMessage) return;
    if (!refs[focusMessage]) return;
    refs[focusMessage].current.scrollIntoView({
      behaviour: "smooth",
      block: "start",
    });
  }, [focusMessage, refs]);

  const messageFetch = async () => {
    let data;
    if (!masterData[currentChannel]) {
      let response = await axios.get(
        `https://slackbackend.taparia11.repl.co/api/data/dynamic/collections/${currentChannel}`
      );
      data = response.data;
    } else {
      data = masterData[currentChannel];
    }
    setChannelMessages(data);

    const messageRefs = {};
    data.forEach((nx) => (messageRefs[nx.ts] = createRef()));
    setRefs(messageRefs);
  };
  useEffect(() => {
    messageFetch(currentChannel);
  }, [currentChannel]);

  const getEmoji = (name) => {
    return emojis[name];
  };

  const getUserProfile = (id) => {
    return users[id];
  };

  const addComponent = (e) => {
    e.preventDefault();

    setComponents(channelMessages);
    setUniquei(e.target.id);
    setUniquec(
      e.currentTarget.className.slice(10, e.currentTarget.className.length)
    );
    setThreadCrumb(true);
    setThread(true);
  };

  useEffect(() => {
    const channel = urlLink.split("/")[3];
    setCurrentChannel(channel);

    const focus = urlLink.split("/")[4];
    if (focus) setFocusMessage(focus);
  }, []);

  const processSideWindow = () => {
    if (searchResults) {
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
                setSearchResults(false);
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
                  (exactPhrase
                    ? a.text.toLowerCase().includes(phraseFilter.toLowerCase())
                    : phraseFilter
                        .toLowerCase()
                        .split(" ")
                        .map(
                          (word) => word && a.text.toLowerCase().includes(word)
                        )
                        .reduce((partial, next) => partial + next, 0));
                valid &=
                  !userFilter ||
                  a.user_profile.real_name
                    ?.toLowerCase()
                    .includes(userFilter.split("/")[0].trim().toLowerCase());

                let ts = (parseInt(a.ts) + 60 * 30 * 11) * 1000; //convert UTC seconds to IST milliseconds
                valid &=
                  !dateFilter.from_date ||
                  (ts >= dateFilter.from_date &&
                    ts < dateFilter.to_date + 1000 * 60 * 60 * 24); //increment to_date by 1 day

                if (valid) return a;
              })
              .sort((a, b) => {
                return (
                  (sortFilter ? 1 : -1) * (parseInt(a.ts) - parseInt(b.ts))
                );
              })
              .map((elmt) => {
                var iTime = elmt.ts.slice(0, 10).toString();
                var fTime = elmt.ts.slice(11, 14).toString();
                if (!elmt.user_profile)
                  elmt.user_profile = getUserProfile(elmt.user);
                if (!elmt.user_profile) return;
                return (
                  <SearchItem
                    matchingArray={
                      exactPhrase ? [phraseFilter] : phraseFilter.split(" ")
                    }
                    channel={!channelFilter ? elmt.channel : ""}
                    user={elmt.user_profile?.real_name}
                    blocks={elmt.blocks}
                    attachments={elmt.attachments}
                    getUserProfile={getUserProfile}
                    getEmoji={getEmoji}
                    time={parseInt(iTime + fTime)}
                    avatar={elmt.user_profile?.image_72}
                    key={elmt.ts}
                    focusMe={() => {
                      setCurrentChannel(elmt.channel);
                      setFocusMessage(elmt.ts);
                      window.history.pushState(
                        {},
                        "",
                        `/${elmt.channel}/${elmt.ts}`
                      );
                    }}
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
          <h1 onClick={() => navigation("/")}>Slack Archives</h1>
          <p className="breadCrumbs">
            <span onClick={() => navigation("/")}>All</span>
            &nbsp; &nbsp; &gt; &nbsp; &nbsp;
            <span
              onClick={() => {
                setThread(false);
                setThreadCrumb(false);
              }}
            >
              #{currentChannel}
            </span>
            {threadCrumb ? (
              <text>&nbsp; &nbsp; &gt; &nbsp; &nbsp; Thread</text>
            ) : (
              ""
            )}
          </p>
        </div>
        {jointData.length ? (
          <div>
            <form className="d-flex" role="search" id="Search">
              <input
                className="form-control me-2"
                value={phraseFilter}
                onChange={(event) => {
                  setPhraseFilter(event.target.value);
                  setSearchResults(event.target.value ? true : false);
                }}
                type="search"
                placeholder="Search in Slack"
                aria-label="Search"
                id="searchBar"
              />
              <Popup
                ref={ref}
                trigger={
                  <svg
                    data-8y3="true"
                    viewBox="0 0 20 20"
                    className="FilterCategory"
                  >
                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="13.5" cy="4.25" r="1.75"></circle>
                      <path
                        stroke-linecap="round"
                        d="M2.25 4.25h9m4 0h2.5"
                      ></path>
                      <circle cx="12.5" cy="15.75" r="1.75"></circle>
                      <path
                        stroke-linecap="round"
                        d="M2.25 15.75h8m4 0h3.5"
                      ></path>
                      <circle
                        r="1.75"
                        transform="matrix(-1 0 0 1 6.5 10)"
                      ></circle>
                      <path
                        stroke-linecap="round"
                        d="M17.75 10h-9.5M4.5 10H2.25"
                      ></path>
                    </g>
                  </svg>
                }
                modal
                nested
              >
                <div className="PopupContent">
                  <div className="PopupHeader">
                    <h1>Filter By</h1>
                    <svg
                      onClick={closeTooltip}
                      data-8y3="true"
                      viewBox="0 0 20 20"
                      className="FormCross"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-width="1.5"
                        d="m5.227 5.227 9.546 9.546m0-9.546-9.546 9.546"
                      ></path>
                    </svg>
                  </div>
                  <div className="PopupPlaceholders">
                    <label htmlFor="">Search For</label>
                    <input
                      type="text"
                      placeholder="Enter phrase..."
                      value={phraseFilter}
                      onChange={(e) => {
                        setPhraseFilter(e.target.value);
                      }}
                    />
                    <label htmlFor="">In channel</label>
                    <select
                      id="channels"
                      name="channels"
                      value={channelFilter ? channelFilter : "all"}
                      onChange={(e) => {
                        if (e.target.selectedIndex)
                          setChannelFilter(e.target.value);
                        else setChannelFilter("");
                      }}
                    >
                      <option value="all">All channels</option>
                      {channels.map((channel) => {
                        return (
                          <option value={channel.name}>{channel.name}</option>
                        );
                      })}
                    </select>
                    <label htmlFor="">From user</label>
                    <TextInput
                      placeholder="Display name or id..."
                      Component={"input"}
                      trigger=""
                      options={Object.entries(users).map(([key, value]) => {
                        return `${value.real_name} / ${key}`;
                      })}
                      value={userFilter}
                      onChange={(val) => {
                        setUserFilter(val);
                      }}
                      matchAny={true}
                      regex={"^[ a-zA-Z0-9_-]+$"}
                    />
                    <label htmlFor="">Sort by</label>
                    <div>
                      <select
                        id="sortFilter"
                        value={!sortFilter ? "newest" : "oldest"}
                        onChange={(e) => {
                          setSortFilter(e.target.selectedIndex);
                        }}
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                      </select>
                    </div>
                    <p>
                      Match exact phrase
                      <Switch
                        {...label}
                        checked={exactPhrase}
                        onChange={(e) => {
                          setExactPhrase(e.target.checked);
                        }}
                      />
                    </p>
                    <div className="byDate">
                      Filter by dates
                      <span>
                        <Switch
                          {...label}
                          checked={dateActivator}
                          onChange={(e) => {
                            setDateActivator(e.target.checked);
                            if (!e.target.checked)
                              setDateFilter({ from_date: 0, to_date: 0 });
                          }}
                        />
                      </span>
                    </div>
                    {dateActivator ? (
                      <div className="dateFilter">
                        <label>From</label>
                        <input
                          type="date"
                          value={getCalendarDate(dateFilter.from_date)}
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
                        <label className="ToDate">To</label>
                        <input
                          type="date"
                          value={getCalendarDate(dateFilter.to_date)}
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
                    ) : (
                      ""
                    )}
                    <div className="PopBtns">
                      <button className="btn btn-dark" onClick={closeTooltip}>
                        Cancel
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          setSearchResults(true);
                          ref.current.close();
                        }}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </Popup>

              <svg data-8y3="true" viewBox="0 0 20 20" className="searchIcon">
                <path
                  fill="currentColor"
                  d="M17.22 18.28a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM15 9a6 6 0 0 1-6 6v1.5A7.5 7.5 0 0 0 16.5 9H15Zm-6 6a6 6 0 0 1-6-6H1.5A7.5 7.5 0 0 0 9 16.5V15ZM3 9a6 6 0 0 1 6-6V1.5A7.5 7.5 0 0 0 1.5 9H3Zm6-6a6 6 0 0 1 6 6h1.5A7.5 7.5 0 0 0 9 1.5V3Zm4.47 11.53 3.75 3.75 1.06-1.06-3.75-3.75-1.06 1.06Z"
                ></path>
              </svg>
            </form>
          </div>
        ) : (
          <SearchLoading />
        )}
      </div>

      <div className="MessSection">
        <div
          ref={resize}
          className={thread || searchResults ? "messageBundle" : "messageOnly"}
        >
          <div className="MessageHeader">
            <h1># {currentChannel}</h1>
          </div>
          <div className="MessageContainer">
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
                      ref={refs[element.ts]}
                      key={element.ts}
                      ts={element.ts}
                      focused={focusMessage}
                      link={`${window.location.origin}/${currentChannel}/${element.ts}`}
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
        </div>
        {processSideWindow()}
      </div>
    </div>
  );
};

export default Render;
