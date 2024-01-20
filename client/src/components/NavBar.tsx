import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import style from "./NavBar.module.css";
import { FaBell } from "react-icons/fa";
import { useState } from "react";
import httpClient from "../axios";
import logo from "../assets/teamwork.svg";

export default function NavBar() {
  const { currentUser } = useSelector((state) => state["user"]);
  const [showSettings, setshowSettings] = useState(false);
  const navigate = useNavigate();

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

  return (
    currentUser! && (
      <div className={style.container}>
        <div className={style.logo}>
          <Link to={"/home"}>
            <img src={logo} alt="TeamWork Logo" />
          </Link>
          <h1>Collabory</h1>
        </div>
        <div className={style.user_details}>
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
    )
  );
}
