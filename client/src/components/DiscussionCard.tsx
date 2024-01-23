import { useSelector } from "react-redux";
import style from "./DiscussionCard.module.css";
import TimeAgo from "timeago-react";
import { useEffect, useState } from "react";
import httpClient from "../axios";

export default function DiscussionCard({ message, discussionTime, senderId }) {
  const { currentUser } = useSelector((state) => state["user"]);
  const [user, setuser] = useState(Object)
/*   useEffect(() => {
    const fetchUserDiscussion = async () => {
      const response = await httpClient.get(`/api/discussion/user/${senderId}`);
      setuser(response.data);
      console.log("ok");
      
    };
    fetchUserDiscussion();
  }, []); */

  const dateObject = new Date(discussionTime);

  return (
    currentUser! && (
      <div className={style.container}>
        <img src={user.avatar} />
        <div className={style.content}>
          <div className={style.userDetails}>
            <h2>{user.username}</h2>
            <p>
              <TimeAgo datetime={dateObject} />
            </p>
          </div>
          <div className={style.message}>
            <p>{message}</p>
          </div>
        </div>
      </div>
    )
  );
}
