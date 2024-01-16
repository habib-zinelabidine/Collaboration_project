import { useSelector } from "react-redux";
import style from "./DiscussionCard.module.css";

export default function DiscussionCard({message}) {
  const {currentUser} = useSelector(state=>state['user']);
  
  return (currentUser! &&
    <div className={style.container}>
      <img src={currentUser.avatar}/>
      <div className={style.content}>
        <div className={style.userDetails}>
          <h2>{currentUser.username}</h2>
          <p>12 min</p>
        </div>
        <div className={style.message}>
          <p>{message}
          </p>
        </div>
      </div>
    </div>
  );
}
