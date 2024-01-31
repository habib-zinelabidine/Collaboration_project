import { useDispatch, useSelector } from "react-redux";
import style from "./Profile.module.css";
import { useRef, useState } from "react";
import httpClient from "../../axios";
import { login } from "../../redux/features/user";
import DarkMode from "../../components/DarkMode";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { toastError, toastSuccess } from "../../components/Toast";

export default function Profile() {
  const { currentUser } = useSelector((state) => state["user"]);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [changePassword, setchangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setshowNewPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

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
      setchangePassword(false);
      toastSuccess("Updated Successfully!");
    } catch (error) {
      toastError(error.response.data.error);
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
            {changePassword ? (
              <>
                <div className={style.password_field}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Current password"
                    name="currentPassword"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className={style.password_field}>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New password"
                    name="newPassword"
                  />
                  <button
                    type="button"
                    onClick={() => setshowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className={style.password_field}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat password"
                    name="confirmPassword"
                  />
                  <button
                    type="button"
                    onClick={() => setshowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </>
            ) : (
              <label onClick={() => setchangePassword(!changePassword)}>
                Change password
              </label>
            )}
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
