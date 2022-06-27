import { useEffect, createRef } from "react";
import * as React from "react";
import Message from "./Message";
import "reactjs-popup/dist/index.css";
import { useState, useRef } from "react";
import "./components.css";
import Thread from "./Thread";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import "react-autocomplete-input/dist/bundle.css";

const Render = ({
  masterData,
  getUserProfile,
  getEmoji,
  getSearchBar,
  searchResults,
  focusMessage,
  setFocusMessage,
  inThread,
  setInThread,
  getSearchResults,
}) => {
  const navigation = useNavigate();
  const [currentChannel, setCurrentChannel] = useState("");
  const [channelMessages, setChannelMessages] = useState([]);
  const [threadParentTs, setThreadParentTs] = useState({});
  const [refs, setRefs] = useState({});

  const [components, setComponents] = useState([]);
  const [uniquei, setUniquei] = useState([]);
  const [threadCrumb, setThreadCrumb] = useState(false);
  const [thread, setThread] = useState(0);

  const resize = useRef();

  useEffect(() => {
    if (!focusMessage || !refs[focusMessage]) return;

    if (!refs[focusMessage].current) {
      if (!inThread || !refs[threadParentTs[inThread]]) return;

      refs[threadParentTs[inThread]].current?.scrollIntoView({
        behaviour: "smooth",
        block: "start",
      });
      addComponent(inThread);
    } else {
      refs[focusMessage].current.scrollIntoView({
        behaviour: "smooth",
        block: "start",
      });
    }
  }, [focusMessage, refs, inThread, thread]);

  const messageFetch = async () => {
    let data;
    if (!masterData[currentChannel]) {
      let response = await axios.get(
        `https://slackbackend.taparia11.repl.co/api/data/dynamic/collections/${currentChannel}`
      );
      data = response.data.filter((a) => {
        if (a.blocks) return a;
      });
    } else {
      data = masterData[currentChannel];
    }
    setChannelMessages(data);

    const threadp = {};
    data.forEach((nx) => {
      if (!nx.parent_user_id && nx.thread_ts) threadp[nx.thread_ts] = nx.ts;
    });
    setThreadParentTs(threadp);

    const messageRefs = {};
    data.forEach((nx) => (messageRefs[nx.ts] = createRef()));
    setRefs(messageRefs);
  };
  useEffect(() => {
    messageFetch(currentChannel);
  }, [currentChannel]);

  const addComponent = (id) => {
    setUniquei(id);
    setComponents(
      masterData[currentChannel] ? masterData[currentChannel] : channelMessages
    );
    setThreadCrumb(true);
    setThread(Date.now());
  };

  useEffect(() => {
    const urlLink = window.location.href;
    const channel = urlLink.split("/")[3];
    setCurrentChannel(channel);

    const focus = urlLink.split("/")[4];
    setFocusMessage(focus);

    const thread = urlLink.split("/")[5];
    setInThread(thread);
  }, [window.location.href]);

  const processSideWindow = () => {
    if (searchResults > thread) return getSearchResults(navigation);

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
                setThread(0);
                setThreadCrumb(false);
                setFocusMessage("");
                setInThread("");
              }}
            >
              <p>X</p>
            </div>
          </div>
          <div className="ThreadContainer">
            {components
              .filter((a) => {
                if (uniquei == a.thread_ts && a.parent_user_id && a.ts)
                  return a;
              })
              .sort((a, b) => {
                return parseInt(a.ts) - parseInt(b.ts);
              })
              .map((elmt) => {
                var iTime = elmt.ts.slice(0, 10).toString();
                var fTime = elmt.ts.slice(11, 14).toString();
                if (!elmt.user_profile)
                  elmt.user_profile = getUserProfile(elmt.user);
                return (
                  <Thread
                    user={elmt.user_profile?.real_name}
                    blocks={elmt.blocks}
                    attachments={elmt.attachments}
                    getUserProfile={getUserProfile}
                    getEmoji={getEmoji}
                    time={parseInt(iTime + fTime)}
                    avatar={elmt.user_profile?.image_72}
                    key={elmt.ts}
                    ref={refs[elmt.ts]}
                    ts={elmt.ts}
                    focused={focusMessage}
                    link={`${window.location.origin}/${currentChannel}/${elmt.ts}/${elmt.thread_ts}`}
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
                setThread(0);
                setThreadCrumb(false);
                setFocusMessage("");
                setInThread("");
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
        {getSearchBar()}
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
                if (!a.parent_user_id && a.ts) return a;
              })
              .sort((a, b) => {
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
                    <div className="date" key={element.ts + "date-change"}>
                      <text>{cur}</text>
                    </div>
                  );

                if (!element.user_profile)
                  element.user_profile = getUserProfile(element.user);
                var iTime = element.ts.slice(0, 10).toString();
                var fTime = element.ts.slice(11, 14).toString();

                result.push(
                  <Message
                    nreq={channelMessages.length}
                    userid={element.user}
                    user={element.user_profile?.real_name}
                    blocks={element.blocks}
                    attachments={element.attachments}
                    getUserProfile={getUserProfile}
                    getEmoji={getEmoji}
                    time={element.ts.slice(0, 10)}
                    time1={parseInt(iTime + fTime)}
                    avatar={element.user_profile?.image_72}
                    data={channelMessages}
                    thread={element.thread_ts > 1 ? element.thread_ts : 0}
                    ref={refs[element.ts]}
                    key={element.ts}
                    ts={element.ts}
                    focused={focusMessage}
                    link={`${window.location.origin}/${currentChannel}/${element.ts}`}
                  />
                );
                if (element.thread_ts)
                  result.push(
                    <button
                      className={`ThreadBtn ${element.user}`}
                      onClick={() => addComponent(element.thread_ts)}
                      key={"thread-btn" + element.ts}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="MessIcon"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chat-left-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                      </svg>
                      {element.reply_users_count} Replies
                    </button>
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
