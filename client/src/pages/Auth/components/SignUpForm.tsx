import { Link } from "react-router-dom";
import style from "./SignIn.module.css";

export default function SignUn() {
  return (
    <div className={style.container}>
      <form>
        <h1>Collabory</h1>
        <h2>Sign up with an account</h2>
        <label>Email Address</label>
        <input type="email" />
        <label>Password</label>
        <input type="password" />
        <label>Confirme password</label>
        <input type="password" />
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
