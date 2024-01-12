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

export default function TopicDetails() {
  let { state } = useLocation();
  const [socket, setsocket] = useState(null);
  const [message, setmessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeOut, setTypingTimeOut] = useState(null)
  useEffect(() => {
    setsocket(io("http://localhost:3000"));
  }, []);
  useEffect(() => {
    if (!socket) return;
    socket.on("message-from-server", (data: { message: any }) => {
      setChat((prev) => [...prev, data.message]);
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
    socket.emit("send-message", { message });
    console.log(chat);
  };
  const handleInput = (e) => {
    setmessage(e.target.value);
    socket.emit("start-typing");
    if(typingTimeOut) clearTimeout(typingTimeOut);
    setTypingTimeOut(setTimeout(()=>{
      socket.emit("stop-typing")
    },1000))
  };
  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <div className={style.topic_disccussion}>
        <img src={state.imageUrl} />
        <div className={style.content}>
          <h1>{state.topicName}</h1>
          <p>{state.description}</p>
          <div className={style.discussion}>
            {chat.map((message) => (
              <DiscussionCard key={Math.random()} message={message} />
            ))}
          </div>
        </div>
      {typing ? "typing..." : ""}
      </div>
      <input type="text" onChange={handleInput} value={message} />
      <button type="submit">send</button>
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
    </form>
  );
}
