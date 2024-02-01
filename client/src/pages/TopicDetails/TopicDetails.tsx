import { useNavigate, useParams } from "react-router-dom";
import style from "./TopicDetails.module.css";

import "@mdxeditor/editor/style.css";
import DiscussionCard from "../../components/DiscussionCard";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import httpClient, { baseURL } from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../../components/PopUp";
import TopicForm from "../../components/TopicForm";
import AddMembers from "../../components/AddMembersForm.tsx";
import { FaEdit, FaPaperPlane, FaPlus, FaTrash, FaUsers } from "react-icons/fa";
import ShowMembers from "../../components/ShowMembers.tsx";
import MarkdownEditor from "../../components/MDXEditor.tsx";
import {
  deleteTopic,
  fetchTopics,
  updateTopic,
} from "../../redux/features/topics.tsx";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";

export default function TopicDetails() {
  const { topics, loading } = useSelector((state) => state["topics"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [socket, setsocket] = useState(null);
  const [messages, setmessages] = useState("");
  const [loadDiscussion, setloadDiscussion] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeOut, setTypingTimeOut] = useState(null);
  const { currentUser } = useSelector((state) => state["user"]);
  const [showPopUp, setshowPopUp] = useState(false);
  const [showPopUpContent, setshowPopUpContent] = useState(0);
  const params = useParams();
  const [loadingDiscussion, setloadingDiscussion] = useState(true);
  let state = topics?.find((topic) => topic._id === params.id);
  const ref = useRef(null);

  useEffect(() => {
    if (topics === null) {
      const getTopic = async () => {
        try {
          const response = await httpClient.get("/api/topic/findall");
          dispatch(fetchTopics(response.data));
        } catch (error) {
          console.log(error);
        }
      };
      getTopic();
    }
  }, []);
  const handleShowAddMembers = () => {
    setshowPopUp(!showPopUp);
    setshowPopUpContent(1);
  };
  useEffect(() => {
    if (state?._id) {
      setsocket(io(baseURL));
      const fetchDiscussion = async () => {
        try {
          setloadingDiscussion(true);
          const response = await httpClient.get(
            `/api/discussion/${state?._id}`
          );
          setloadDiscussion(response.data);
          setloadingDiscussion(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchDiscussion();
    }
  }, [state?._id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.emit("send-message", {
      message: messages,
      topicId: state._id,
      senderId: currentUser._id,
    });
    ref.current?.setMarkdown("");
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
    const formData = new FormData();
    formData.append("members",data.members);
    try {
      await httpClient.patch(
        `/api/topic/update/${state._id}`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };
  const showMembers = () => {
    setshowPopUp(!showPopUp);
    setshowPopUpContent(2);
  };
  const showEdit = () => {
    setshowPopUp(!showPopUp);
    setshowPopUpContent(3);
  };
  const handleEditSubmit = async (data) => {
    const formData = new FormData();
    formData.append("topicName", data.topicName);
    formData.append("description", data.description);
    formData.append("imageUrl", data.imageUrl);
    try {
      const response = await httpClient.patch(
        `api/topic/update/${state._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status === 200) {
        setshowPopUp(false);
        dispatch(updateTopic(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTopic = async () => {
    try {
      if (window.confirm("Are you sure you want to delete ?")) {
        const response = await httpClient.delete(
          `/api/topic/delete/${state._id}`
        );
        console.log(response.data);
        dispatch(deleteTopic(response.data._id));
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    state && (
      <div className={style.container}>
        {
          <PopUp isOpen={showPopUp} onClose={() => setshowPopUp(false)}>
            {showPopUpContent === 1 ? (
              <AddMembers onSubmit={handleSubmitForm} />
            ) : showPopUpContent === 2 ? (
              <ShowMembers topicId={state._id} />
            ) : (
              <TopicForm
                onClose={() => setshowPopUp(false)}
                onSubmit={handleEditSubmit}
                values={state}
              />
            )}
          </PopUp>
        }
        <div className={style.topic_disccussion}>
          <div className={style.header}>
            {loading ? (
              <LoadingSpinner className={style.loadingImg} circle={false} />
            ) : (
              <img src={state.imageUrl} />
            )}
            {currentUser._id === state.createrId ? (
              <button type="button" onClick={handleDeleteTopic}>
                <FaTrash />
              </button>
            ) : null}
          </div>
          <div className={style.content}>
            <div className={style.members}>
              <div className={style.topic_header}>
                {loading ? (
                  <LoadingSpinner className={style.topicName} circle={false} />
                ) : (
                  <h1>{state.topicName}</h1>
                )}
                <button onClick={showMembers}>
                  <FaUsers />
                </button>
                {currentUser._id === state.createrId ? (
                  <button onClick={showEdit}>
                    <FaEdit />
                  </button>
                ) : null}
              </div>
              {currentUser._id === state.createrId ? (
                <button type="button" onClick={handleShowAddMembers}>
                  <FaPlus />
                </button>
              ) : null}
            </div>
            {loading ? (
              <LoadingSpinner className={style.description} circle={false} />
            ) : (
              <p>{state.description}</p>
            )}
            <div className={style.discussion}>
              {loadDiscussion.map((message) => (
                <DiscussionCard
                  key={message._id}
                  message={message.message}
                  discussionTime={message.createdAt}
                  senderId={message.senderId}
                  loading={loadingDiscussion}
                />
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={style.messages}>
            <MarkdownEditor
              markdown={messages}
              onChange={handleInput}
              ref={ref}
            />
          </div>
          <div className={style.form_button}>
            <button type="submit">
              Send <FaPaperPlane />{" "}
            </button>
          </div>
        </form>
      </div>
    )
  );
}
