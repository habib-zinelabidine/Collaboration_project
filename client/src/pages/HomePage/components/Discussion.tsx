import { useEffect, useState } from "react";
import style from "./Discussion.module.css";
import { FaBell, FaSearch, FaPaperPlane } from "react-icons/fa";
import DarkMode from "../../../components/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import httpClient from "../../../axios";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../APi/getUsers";
import { fetchUsers } from "../../../redux/features/users";

export default function Discussion() {
  const [showSettings, setshowSettings] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state["user"]);
  const { currentUsers } = useSelector((state) => state["users"]);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [discussion, setDiscussion] = useState([]);
  const [searchContact, setsearchContact] = useState(false);
  const [showDiscussion, setshowDiscussion] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getUsers().then((response) => dispatch(fetchUsers(response.data)));
  }, []);

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
  const handleDiscussion = (data) => {
    setshowDiscussion(true);
    setUsername(data.username);
    setAvatar(data.avatar);
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
          <div onClick={() => setsearchContact(true)}>
            {searchContact ? (
              <div className={style.search_friend}>
                <input type="text" placeholder="Search friend" />
                <button onClick={() => {setsearchContact(false);
                console.log("ok");
                }}>X</button>
              </div>
            ) : (
              <button>
                <FaSearch />
              </button>
            )}
          </div>
          {/* <button onClick={handleSearch}>
            {searchContact ? <div className={style.search_friend}>
              <input type="text" placeholder="Search friend"/>
            </div> : <FaSearch />}
          </button> */}
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
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit, laboriosam! Lorem ipsum
                  </p>
                </div>
                <div className={style.personal_message}>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit, laboriosam! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Amet, dolor.
                  </p>
                </div>
                <div className={style.personal_message}>
                  <p>Lorem ipsum dolor sit</p>
                </div>
                <div className={style.personal_message}>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit,
                  </p>
                </div>
                <div className={style.personal_message}>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit, laboriosam!
                  </p>
                </div>
                <div className={style.personal_message}>
                  <p>Lorem ipsum dolor sit</p>
                </div>
              </div>
              <div className={style.send_message}>
                <input type="text" placeholder="Type your message" />
                <button>
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
                  <img src={data.avatar} title={data.username}  />
                  <h2>{showDiscussion! || data.username}</h2>
                </div>
              ))}
          </div>
        )}
      </div>
    )
  );
}
