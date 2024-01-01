import { Link } from "react-router-dom";
import style from "./SignIn.module.css";

export default function SignIn() {
  return (
    <div className={style.container}>
      <form>
        <h1>Collabory</h1>
        <h2>Log in to your account</h2>
        <label>Email Address</label>
        <input type="email" />
        <div className={style.forgot_password}>
          <label>Password</label>
          <span>Forget password</span>
        </div>
        <input type="password" />
        <div className={style.check}>
          <input type="checkbox" />
          <p>Keep me signed in</p>
        </div>
        <button className={style.btn}>Login</button>
        <p>
          {`Don't have an account?`} <Link to="/signup" className={style.create_account}>Create here</Link>
        </p>
      </form>
    </div>
  );
}
