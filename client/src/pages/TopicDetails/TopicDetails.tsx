import { useLocation } from "react-router-dom";
import style from "./TopicDetails.module.css";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import DiscussionCard from "../../components/DiscussionCard";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import httpClient, { baseURL } from "../../axios";
import { useSelector } from "react-redux";
import PopUp from "../../components/PopUp";
import TopicForm from "../../components/TopicForm";
import AddMembers from "../../components/AddMembersForm.tsx";
import type { RootState } from '../../redux/store.tsx'

export default function TopicDetails() {
  let { state } = useLocation();
  const [socket, setsocket] = useState(null);
  const [message, setmessage] = useState("");
  const [loadDiscussion, setloadDiscussion] = useState([]);
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeOut, setTypingTimeOut] = useState(null);
  const { currentUser } = useSelector((state : RootState) => state.user);
  const [showPopUp, setshowPopUp] = useState(false);


  const [user, setuser] = useState([]);

  const handleShowPopUp = () => {
    setshowPopUp(!showPopUp);
  };

  useEffect(() => {
    setsocket(io(baseURL));
    const fetchDiscussion = async () => {
      try {
        const response = await httpClient.get(`/api/discussion/${state._id}`);
        setloadDiscussion(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDiscussion();
  }, [state._id]);
/*   useEffect(() => {
    const fetchUserDiscussion = async () => {
      const response = await httpClient.get(
        `/api/discussion/user/${currentUser._id}`
      );
      setuser(response.data);
    };
    fetchUserDiscussion();
  }, []); */

  useEffect(() => {
    if (!socket) return;

    socket.on("message-from-server", (data: { message: any }) => {
      setloadDiscussion((prev) => [...prev, data]);
    });
    socket.on("typing-started-from-server", () => {
      setTyping(true);
    });
    socket.on("typing-stoped-from-server", () => {
      setTyping(false);
    });
  }, [socket]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setmessage("");
    socket.emit("send-message", {
      message,
      topicId: state._id,
      senderId: currentUser._id,
    });
  };
  const handleInput = (e) => {
    setmessage(e.target.value);
    socket.emit("start-typing");
    if (typingTimeOut) clearTimeout(typingTimeOut);
    setTypingTimeOut(
      setTimeout(() => {
        socket.emit("stop-typing");
      }, 1000)
    );
  };

  return (
    <div className={style.container} onSubmit={handleSubmit}>
      {
        <PopUp isOpen={showPopUp} onClose={() => setshowPopUp(false)}>
          <AddMembers />
        </PopUp>
      }
      <div className={style.topic_disccussion}>
        <img src={state.imageUrl} />
        <div className={style.content}>
          <div className={style.members}>
            <h1>{state.topicName}</h1>
            <button type="button" onClick={handleShowPopUp}>
              Add members
            </button>
          </div>
          <p>{state.description}</p>
          <div className={style.discussion}>
            {loadDiscussion.map((message) => (
              <DiscussionCard
                key={Math.random() * 1000}
                message={message.message}
                discussionTime={message.createdAt}
                senderId={message.senderId}
                
              />
            ))}
          </div>
        </div>
      </div>
      <div className={style.typing}>
        {typing ? `${currentUser.username} is typing...` : ""}
      </div>
      <form className={style.send_message}>
        <input type="text" onChange={handleInput} value={message} />
        <button type="submit">send</button>
      </form>
      {/* <div className={style.message}>
        <MDXEditor markdown={"# Hello World"} plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <div>
              <BoldItalicUnderlineToggles />
            </div>
          )
        })
      ]} />
      </div> */}
    </div>
  );
}
