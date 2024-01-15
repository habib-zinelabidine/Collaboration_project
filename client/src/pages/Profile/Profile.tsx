import { useSelector } from "react-redux";
import style from "./Profile.module.css";
import { useRef, useState } from "react";
import httpClient from "../../axios";
import { data } from "jquery";

export default function Profile() {
  const { currentUser } = useSelector((state) => state["user"]);
  const fileRef = useRef(null);

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [avatar, setavatar] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("avatar", avatar);
    console.log(formData);
    try {
      const response = await httpClient.patch(
        `/api/user/update/${currentUser._id}`,formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      localStorage.setItem("dataKey", JSON.stringify(response.data));

      console.log(response.data);
      console.log(currentUser._id);
      console.log(username);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    currentUser! && (
      <form className={style.container} onSubmit={handleSubmit}>
        <div className={style.content}>
          <input
            type="file"
            ref={fileRef}
            hidden
            onChange={(e) => setavatar(e.target.files[0])}
          />
          <img
            onClick={() => fileRef.current.click()}
            src={currentUser.avatar}
          />
          <input
            type="text"
            placeholder="username"
            defaultValue={currentUser.username}
            onChange={(e) => setusername(e.target.value)}
            id={currentUser.username}

          />
          <input
            type="email"
            placeholder="email"
            defaultValue={currentUser.email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            defaultValue={currentUser.password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button>Save</button>
        </div>
      </form>
    )
  );
}
