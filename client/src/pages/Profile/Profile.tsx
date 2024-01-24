import { useDispatch, useSelector } from "react-redux";
import style from "./Profile.module.css";
import { useRef, useState } from "react";
import httpClient from "../../axios";
import { login } from "../../redux/features/user";
import DarkMode from "../../components/DarkMode";

export default function Profile() {
  const { currentUser } = useSelector((state) => state["user"]);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await httpClient.patch(
        `/api/user/update/${currentUser._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(login(response.data));
      localStorage.setItem("dataKey", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className={style.container}>
        <h1>Settings</h1>
        <fieldset>
          <legend>Personal settings</legend>

          <form className={style.person_info} onSubmit={handleSubmit}>
            <div className={style.avatar}>
              <input type="file" ref={fileRef} hidden name="avatar" />
              <img
                onClick={() => fileRef.current.click()}
                src={currentUser.avatar}
              />
            </div>
            <div className={style.user_info}>
              <input
                type="text"
                placeholder="username"
                defaultValue={currentUser.username}
                name="username"
                id={currentUser.username}
              />
              <input
                type="email"
                placeholder="email"
                name="email"
                defaultValue={currentUser.email}
              />
              <input
                type="password"
                placeholder="password"
                /* name="password" */
                defaultValue={currentUser.password}
                disabled
              />
              <button>Save</button>
            </div>
          </form>
        </fieldset>
        <fieldset className={style.theme_settings}>
          <legend>Theme</legend>
          <p>Change Theme</p>
          <div style={{ marginRight: "10px" }}>
            <DarkMode />
          </div>
        </fieldset>
      </div>
    
  );
}
