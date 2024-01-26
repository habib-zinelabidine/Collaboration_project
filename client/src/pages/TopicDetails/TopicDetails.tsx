import { useLocation } from "react-router-dom";
import style from "./TopicDetails.module.css";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  InsertImage,
  imagePlugin,
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
import {
  FaEdit,
  FaLayerGroup,
  FaObjectGroup,
  FaPaperPlane,
  FaPlus,
  FaTeamspeak,
  FaUsers,
} from "react-icons/fa";
import ShowMembers from "../../components/ShowMembers.tsx";

export default function TopicDetails() {
  let { state } = useLocation();
  const [socket, setsocket] = useState(null);
  const [messages, setmessages] = useState("");
  const [loadDiscussion, setloadDiscussion] = useState([]);
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeOut, setTypingTimeOut] = useState(null);
  const { currentUser } = useSelector((state) => state["user"]);
  const [showPopUp, setshowPopUp] = useState(false);
  const [showPopUpContent, setshowPopUpContent] = useState(0);

  const [user, setuser] = useState([]);

  const handleShowAddMembers = () => {
    setshowPopUp(!showPopUp);
    setshowPopUpContent(1);
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

  useEffect(() => {
    if (!socket) return;

    socket.on("message-from-server", (data: { data: any }) => {
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
    if (messages.trim() !== "") {
      socket.emit("send-message", {
        message: messages,
        topicId: state._id,
        senderId: currentUser._id,
      });
      setmessages("");
    }
  };
  const handleInput = (value) => {
    setmessages(value);
    socket.emit("start-typing");
    if (typingTimeOut) clearTimeout(typingTimeOut);
    setTypingTimeOut(
      setTimeout(() => {
        socket.emit("stop-typing");
      }, 1000)
    );
  };
  const handleSubmitForm = async (data) => {
    try {
      const response = await httpClient.patch(
        `/api/topic/update/${state._id}`,
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const showMembers = () => {
    setshowPopUp(!showPopUp);
    setshowPopUpContent(2);
  };

  return (
    <div className={style.container}>
      {
        <PopUp isOpen={showPopUp} onClose={() => setshowPopUp(false)}>
          {showPopUpContent === 1 ? (
            <AddMembers onSubmit={handleSubmitForm} />
          ) : showPopUpContent === 2 ? (
            <ShowMembers topicId={state._id}/>
          ) : null}
        </PopUp>
      }
      <div className={style.topic_disccussion}>
        <img src={state.imageUrl} />
        <div className={style.content}>
          <div className={style.members}>
            <div className={style.topic_header}>
              <h1>{state.topicName}</h1>
              <button onClick={showMembers}>
                <FaUsers />
              </button>
              <button>
                <FaEdit />
              </button>
            </div>
            <button type="button" onClick={handleShowAddMembers}>
              <FaPlus />
            </button>
          </div>
          <p>{state.description}</p>
          <div className={style.discussion}>
            {loadDiscussion.map((message) => (
              <DiscussionCard
                key={message._id}
                message={message.message}
                discussionTime={message.createdAt}
                senderId={message.senderId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* <form className={style.send_message} onSubmit={handleSubmit}>
        <input type="text" onChange={handleInput} value={messages} />
        <button type="submit">send</button>
      </form> */}
      <form onSubmit={handleSubmit}>
        <div className={style.messages}>
          <MDXEditor
            markdown={messages}
            contentEditableClassName="messages"
            onChange={handleInput}
            plugins={[
              imagePlugin({
                imageUploadHandler: () => {
                  return Promise.resolve("https://picsum.photos/200/300");
                },
                imageAutocompleteSuggestions: [
                  "https://picsum.photos/200/300",
                  "https://picsum.photos/200",
                ],
              }),
              toolbarPlugin({
                toolbarContents: () => (
                  <>
                    {" "}
                    <BoldItalicUnderlineToggles />
                    <InsertImage />
                  </>
                ),
              }),
            ]}
          />
        </div>
        <div className={style.form_button}>
          <button type="submit">
            Send <FaPaperPlane />{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
