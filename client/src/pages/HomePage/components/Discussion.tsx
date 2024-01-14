import { useEffect, useState } from "react";
import style from "./Discussion.module.css";
import { FaBell, FaPaperPlane } from "react-icons/fa";
import DarkMode from "../../../components/DarkMode";
import { useSelector } from "react-redux";
import httpClient from "../../../axios";
import { useNavigate } from "react-router-dom";


export default function Discussion() {
  const [showSettings, setshowSettings] = useState(false);
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.user.value);
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
    <div className={style.container}>
      <div className={style.user_details}>
        <h1>{username}</h1>
        <div className={style.icons}>
          <button>
            <FaBell />
          </button>
          <div style={{ marginRight: "10px" }}>
            <DarkMode />
          </div>
          <div onClick={() => setshowSettings(!showSettings)}>
            <img src="https://www.tu-ilmenau.de/unionline/fileadmin/_processed_/0/0/csm_Person_Yury_Prof_Foto_AnLI_Footgrafie__2_.JPG_94f12fbf25.jpg" />
          </div>
          {showSettings && (
            <div className={style.settings}>
              <ul>
                <li>Settings</li>
                <li style={{ color: "red" }} onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className={style.discussion}>
        <div className={style.discussion_content}>
          <div className={style.person_info}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg" />
            <h1>Habib</h1>
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
          <img src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pierre-Person.jpg/1200px-Pierre-Person.jpg" />
          <img src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" />
          <img src="https://engineering.unl.edu/images/staff/Kayla-Person.jpg" />
          <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/C597/production/_131938505_ind3bc40c5f1c10d4248e6bf848ae7033c8814005e9-1.jpg" />
          <img src="https://www.verywellmind.com/thmb/pwEmuUJ6KO9OF8jeiQCDyKnaVQI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1187609003-73c8baf32a6a46a6b84fe931e0c51e7e.jpg" />
          <img src="https://www.bentbusinessmarketing.com/wp-content/uploads/2013/02/35844588650_3ebd4096b1_b-1024x683.jpg" />
        </div>
      </div>
    </div>
  );
}
