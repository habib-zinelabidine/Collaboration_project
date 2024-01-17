import { useEffect, useState } from "react";
import style from "./Discussion.module.css";
import { FaBell, FaSearch, FaPaperPlane } from "react-icons/fa";
import DarkMode from "../../../components/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import httpClient, { baseURL } from "../../../axios";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../APi/getUsers";
import { fetchUsers } from "../../../redux/features/users";
import { io } from "socket.io-client";

export default function Discussion() {
  const [showSettings, setshowSettings] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state["user"]);
  const { currentUsers } = useSelector((state) => state["users"]);
  const [socket, setsocket] = useState(null);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [messages, setmessages] = useState("");
  const [discussion, setDiscussion] = useState([]);
  const [friendId, setfriendId] = useState();
  const [discussionChat, setdiscussionChat] = useState([]);
  const [searchContact, setsearchContact] = useState(false);
  const [showDiscussion, setshowDiscussion] = useState(false);
  const [OnlineUsers, setOnlineUsers] = useState([]);
  const [Chat, setChat] = useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    setsocket(io(baseURL));
    getUsers().then((response) => dispatch(fetchUsers(response.data)));
  }, []);
  useEffect(() => {
    if (!socket) return;
    socket.on("private-message-from-server", (data: { message: any }) => {
      setChat((prev) => [...prev, data]);
      console.log(Chat);
      
      
    });
  }, [socket]);
  const handleLogout = async () => {
    try {
      const response = await httpClient.get("/api/auth/logout");
      if (response.status === 200) {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDiscussion = async (data) => {
    setshowDiscussion(true);
    setUsername(data.username);
    setAvatar(data.avatar);
    setfriendId(data._id);

    try {
      const response = await httpClient.get(
        `/api/message/${currentUser._id}/${data._id}`
      );
      setdiscussionChat(response.data);
      socket.emit("private-message", {
        senderId: currentUser._id,
        receiverId: friendId,
        text: messages,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    setmessages("");
    try {
      const response = await httpClient.post("/api/message", {
        senderId: currentUser._id,
        receiverId: friendId,
        text: messages,
      });
      setDiscussion(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    currentUser! && (
      <div className={style.container}>
        <div className={style.user_details}>
          <h1>{currentUser.username}</h1>
          <div className={style.icons}>
            <button>
              <FaBell />
            </button>
            <div style={{ marginRight: "10px" }}>
              <DarkMode />
            </div>
            <div onClick={() => setshowSettings(!showSettings)}>
              <img src={currentUser.avatar} />
            </div>
            {showSettings && (
              <div className={style.settings}>
                <ul>
                  <li
                    onClick={() => {
                      navigate("/home/profile");
                      setshowSettings(false);
                    }}
                  >
                    Settings
                  </li>
                  <li style={{ color: "red" }} onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className={style.contact}>
          <h2>Contacts</h2>
          <div className={style.search_contact}>
            {searchContact ? (
              <div className={style.search_friend}>
                <input type="text" placeholder="Search friend" />
                <button
                  onClick={() => {
                    setsearchContact(false);
                  }}
                >
                  X
                </button>
              </div>
            ) : (
              <button onClick={() => setsearchContact(true)}>
                <FaSearch />
              </button>
            )}
          </div>
        </div>
        {showDiscussion ? (
          <div className={style.discussion}>
            <div className={style.discussion_content}>
              <div className={style.person_info}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={avatar} />
                  <h1>{username}</h1>
                </div>
                <div>
                  <button onClick={() => setshowDiscussion(false)}>X</button>
                </div>
              </div>
              <div className={style.message}>
                <div className={style.personal_message}>
                  {discussionChat.map((msg) => (
                    <p key={msg._id}>{msg.text}</p>
                  ))}
                </div>
              </div>
              <div className={style.send_message}>
                <input
                  type="text"
                  placeholder="Type your message"
                  onChange={(e) => setmessages(e.target.value)}
                  value={messages}
                />
                <button onClick={handleSendMessage}>
                  <FaPaperPlane />
                </button>
              </div>
            </div>
            <div className={style.discussion_people}>
              {currentUsers! &&
                currentUsers.map((data) => (
                  <img
                    src={data.avatar}
                    title={data.username}
                    key={data._id}
                    onClick={() => handleDiscussion(data)}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className={style.users_list}>
            {currentUsers! &&
              currentUsers.map((data) => (
                <div
                  style={{ position: "relative" }}
                  className={
                    showDiscussion
                      ? style.users_showDiscussion
                      : style.users_container
                  }
                  onClick={() => handleDiscussion(data)}
                  key={data._id}
                >
                  <img src={data.avatar} title={data.username} />
                  <h2>{showDiscussion! || data.username}</h2>
                </div>
              ))}
          </div>
        )}
      </div>
    )
  );
}
