import { Outlet } from "react-router-dom";
import style from './Auth.module.css'
export default function Auth() {
  return (
    <div className={style.btn}>
      <Outlet />
    </div>
  );
}
