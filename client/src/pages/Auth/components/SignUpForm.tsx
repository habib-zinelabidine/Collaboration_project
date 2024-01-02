import { Link, useNavigate } from "react-router-dom";
import style from "./SignIn.module.css";
import { useState } from "react";
import httpClient from "../../../axios";

export default function SignUn() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await httpClient.post("/api/auth/signup", {
        username,
        email,
        password,
      });
      console.log(response);
      navigate("/home");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <h1>Collabory</h1>
        <h2>Sign up with an account</h2>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className={style.btn}>Sign Up</button>
        <p>
          You have an account?{" "}
          <Link to="/signin" className={style.create_account}>
            Sign in here
          </Link>
        </p>
      </form>
    </div>
  );
}
