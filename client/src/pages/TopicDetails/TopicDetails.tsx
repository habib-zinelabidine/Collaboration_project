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
import removeMd from "remove-markdown";
import ShowMembers from "../../components/ShowMembers.tsx";
import EditMembers from "../../components/EditMembers.tsx";

export default function TopicDetails() {
  let { state } = useLocation();

  const [socket, setsocket] = useState(null);
  const [messages, setmessages] = useState("");
  const [loadDiscussion, setloadDiscussion] = useState([]);
  const [typing, setTyping] = useState(false);
  const [typingTimeOut, setTypingTimeOut] = useState(null);
  const { currentUser } = useSelector((state) => state["user"]);
  const [showPopUp, setshowPopUp] = useState(false);
  const [showPopUpContent, setshowPopUpContent] = useState(0);
  const [image, setimage] = useState(null);
  const [blobUrl, setblobUrl] = useState("");
  const [newFile, setnewFile] = useState(null);
  const fileName = "example.jpg";

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
    convertBlobToFile(blobUrl, fileName);
  }, [socket]);
  console.log(newFile);
  console.log(image);
  function removeMarkdownImageSyntax(text) {
    // Regular expression to match Markdown image syntax
    const regex = /!\[\]\([^)]*\)/g;
    return text.replace(regex, "");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    socket.emit("send-message", {
      message: messages,
      topicId: state._id,
      senderId: currentUser._id,
    });
    console.log(messages);

    setmessages("");
  };
  const handleInput = (value) => {
    const match = value.match(/\!\[\]\((.*?)\)/);
  
    // Check if a match is found and extract the link
    const imageUrls = match ? match[1] : null;
    setmessages(imageUrls);
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  /*   async function imageUploadHandler(image: File) {
    const formData = new FormData();
    formData.append("text", image);
    const response = await httpClient.post("/api/message", formData);
    console.log(response.data);
    return Promise.resolve(URL.createObjectURL(image));
  } */
  async function imageUploadHandler(image: File) {
    const formData = new FormData();
    formData.append("imageUrl", image);
    console.log(image);

    // send the file to your server and return
    // the URL of the uploaded image in the response
    const response = await httpClient.post("/api/upload/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });/* 
    console.log(response.data);
    console.log(response.data.imageUrl.replace(/!\[\]\([^)]*\)/g, "")); */
    setmessages(response.data.imageUrl);

    return(
      response.data.imageUrl
    );
  }
  const markdownString = "![](http://localhost:3000/uploads\\1706397213585.jpeg)";

  // Use a regular expression to extract the link from Markdown image syntax
  const match = markdownString.match(/\!\[\]\((.*?)\)/);
  
  // Check if a match is found and extract the link
  const imageUrls = match ? match[1] : null;
  
  console.log(imageUrls);
  // Example usage
  const markdownText =
    "![](http://example.com/image.jpg) Some text with an image.";
  const textWithoutMarkdownImage = markdownText.replace(/!\[\]\([^)]*\)/g, "");
  console.log(textWithoutMarkdownImage);
  async function convertBlobToFile(blobUrl, fileName) {
    try {
      // Fetch the Blob data from the Blob URL
      const response = await fetch(blobUrl);
      const blobData = await response.blob();

      // Create a new File object from the Blob data
      const file = new File([blobData], fileName, { type: blobData.type });

      // Now you can use the 'file' object as needed
      console.log("Converted file:", file);
      setnewFile(file);
      return file;
    } catch (error) {
      console.error("Error converting Blob to File:", error);
      return null;
    }
  }

  return (
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
        <img src={state.imageUrl} />
        <div className={style.content}>
          <div className={style.members}>
            <div className={style.topic_header}>
              <h1>{state.topicName}</h1>
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

      <form onSubmit={handleSubmit}>
        <div className={style.messages}>
          <MDXEditor
            markdown={messages}
            contentEditableClassName="messages"
            onChange={handleInput}
            plugins={[
              imagePlugin({
                imageUploadHandler,
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
