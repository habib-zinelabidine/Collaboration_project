import { useSelector } from "react-redux";
import style from "./DiscussionCard.module.css";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const timeAgo = new TimeAgo("en-US");

export default function DiscussionCard({ message, discussion }) {
  const { currentUser } = useSelector((state) => state["user"]);

  const dateObject = new Date(discussion);
  timeAgo.format(dateObject);

  return (
    currentUser! && (
      <div className={style.container}>
        <img src={currentUser.avatar} />
        <div className={style.content}>
          <div className={style.userDetails}>
            <h2>{currentUser.username}</h2>
            <p>{timeAgo.format(dateObject)}</p>
          </div>
          <div className={style.message}>
            <p>{message}</p>
          </div>
        </div>
      </div>
    )
  );
}
