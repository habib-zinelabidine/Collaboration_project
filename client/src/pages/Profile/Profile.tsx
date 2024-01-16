import { useDispatch, useSelector } from "react-redux";
import style from "./Profile.module.css";
import { useRef, useState } from "react";
import httpClient from "../../axios";
import { login } from "../../redux/features/user";

export default function Profile() {
  const { currentUser } = useSelector((state) => state["user"]);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  console.log(currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("username"));
    console.log(currentUser._id);

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
    currentUser! && (
      <form className={style.container} onSubmit={handleSubmit}>
        <div className={style.content}>
          <input type="file" ref={fileRef} hidden name="avatar" />
          <img
            onClick={() => fileRef.current.click()}
            src={currentUser.avatar}
          />
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
            name="password"
            defaultValue={currentUser.password}
          />
          <button>Save</button>
        </div>
      </form>
    )
  );
}
