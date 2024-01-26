import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import style from "./NavBar.module.css";
import { FaBell, FaComment, FaEllipsisV } from "react-icons/fa";
import { useState } from "react";
import httpClient from "../axios";
import logo from "../assets/teamwork.svg";
import { logout } from "../redux/features/user.js";

export default function NavBar({
  setshowTopics,
  showTopics,
  showDiscussionList,
  setshowDiscussionList,
}) {
  const {currentUser} = useSelector((state)=>state["user"]);
  const [showSettings, setshowSettings] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await httpClient.get("/api/auth/logout");
      if (response.status === 200) {
        navigate("/signin");
        dispatch(logout());
        localStorage.removeItem("dataKey");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className={style.container}>
        <div className={style.logo}>
          <Link to={"/home"}>
            <img src={logo} alt="TeamWork Logo" />
          </Link>
          <h1>Collabory</h1>
        </div>
        <div className={style.user_details}>
          <div className={style.options}>
            <button
              className={style.topics}
              onClick={() => {
                setshowTopics(!showTopics);
                setshowDiscussionList(false);
              }}
            >
              <FaEllipsisV />
            </button>
            <button
              className={style.messages}
              onClick={() => {
                setshowDiscussionList(!showDiscussionList);
                setshowTopics(false);
              }}
            >
              <FaComment />
            </button>
          </div>
          <h1>{currentUser.username}</h1>
          <div className={style.icons}>
            <button>
              <FaBell />
            </button>

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
      </div>
    
  );
}
