import { Link } from "react-router-dom";
import style from "./SignIn.module.css";
import httpClient from "../../../axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/features/user.tsx";
import DarkMode from "../../../components/DarkMode.tsx";

export default function SignIn() {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await httpClient.post("/api/auth/signin", {
        email,
        password,
      });
      localStorage.setItem("dataKey", JSON.stringify(response.data));

      console.log(response);
      setLoading(false);
      dispatch(login(response.data));
      navigate("/home");
      seterror(response.data.message);
    } catch (err) {
      setLoading(false);
      seterror(true);
      seterrorMessage(err.response.data.message);
    }
  };
  return (
    <div className={style.container}>

      <form onSubmit={handleSubmit}>
        <h1>Collabory</h1>
        <h2>Log in to your account</h2>
        <label>Email Address</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setemail(e.target.value)}
        />
        <div className={style.forgot_password}>
          <label>Password</label>
          <span>Forget password</span>
        </div>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setpassword(e.target.value)}
        />
        <div className={style.check}>
          <input type="checkbox" />
          <p>Keep me signed in</p>
        </div>
        {error && <p className={style.error_message}>{errorMessage}</p>}
        <button className={style.btn}>
          {loading ? "Loading..." : "Login"}
        </button>
        <p>
          {`Don't have an account?`}{" "}
          <Link to="/signup" className={style.create_account}>
            Create here
          </Link>
        </p>
      </form>
    </div>
  );
}
