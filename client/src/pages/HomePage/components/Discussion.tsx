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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Discussion({ showTopics, showDiscussionList }) {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state["user"]);
  const { currentUsers } = useSelector((state) => state["users"]);
  const [socket, setsocket] = useState(null);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [messages, setmessages] = useState("");
  const [friendId, setfriendId] = useState();
  const [users, setusers] = useState([]);
  const [discussionChat, setdiscussionChat] = useState([]);
  const [searchContact, setsearchContact] = useState(false);
  const [showDiscussion, setshowDiscussion] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setsocket(io(baseURL));
    getUsers().then((response) => {
      dispatch(fetchUsers(response.data));
      const filteredUsers = response.data.filter(
        (user) => user._id !== currentUser._id
      );

      setusers(filteredUsers);
    });
  }, []);
  useEffect(() => {
    if (!socket) return;
    socket.on("private-message-from-server", (data: { text: any }) => {
      setdiscussionChat((prev) => [...prev, data]);
    });
  }, [socket]);

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
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (messages.trim() !== "") {
      setmessages("");
      socket.emit("private-message", {
        senderId: currentUser._id,
        receiverId: friendId,
        text: messages,
      });
    } else return;
  };
  const handleSearch = (e) => {
    setusers(
      currentUsers.filter((user) =>
        user.username.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div
      className={
        showTopics
          ? style.showDiscussion
          : style.container && showDiscussionList
          ? style.showDiscussionList
          : style.container
      }
    >
      <div className={style.contact}>
        <h2>Contacts</h2>
        <div className={style.search_contact}>
          {searchContact ? (
            <div className={style.search_friend}>
              <input
                type="text"
                placeholder="Search friend"
                onChange={handleSearch}
              />
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
                  <p
                    key={msg._id}
                    className={
                      msg.senderId === currentUser._id
                        ? style.senderMessages
                        : style.receiverMessages
                    }
                  >
                    {msg.text}
                  </p>
                ))}
              </div>
            </div>
            <form className={style.send_message} onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type your message"
                onChange={(e) => setmessages(e.target.value)}
                value={messages}
              />
              <button type="submit">
                <FaPaperPlane />
              </button>
            </form>
          </div>
          <div className={style.discussion_people}>
            <Skeleton />
            {
              users.map((data) => (
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
            {users.map((data) => (
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
                <h2>{data.username}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
