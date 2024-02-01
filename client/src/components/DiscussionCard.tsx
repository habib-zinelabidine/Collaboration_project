import style from "./DiscussionCard.module.css";
import TimeAgo from "timeago-react";
import { useEffect, useState } from "react";
import httpClient from "../axios";
import MarkdownEditor from "./MDXEditor";
import "./settingButton.css";
import LoadingSpinner from "./LoadingSpinner";

export default function DiscussionCard({ message, discussionTime, senderId,loading }) {
  const [user, setuser] = useState(Object);
  
  useEffect(() => {
    const fetchUserDiscussion = async () => {
      try {
        const response = await httpClient.get(
          `/api/discussion/user/${senderId}`
        );
        setuser(response.data);
      } catch (error) {
        console.error("Error fetching user discussion:", error);
      }
    };

    fetchUserDiscussion();
  }, [senderId]);

  const dateObject = new Date(discussionTime);

  return (
    <div className={style.container}>
      {loading ? <LoadingSpinner className={style.loadingImg} circle={false} /> : <img src={user.avatar} />}
      <div className={style.content}>
        <div className={style.userDetails}>
          {loading ? <LoadingSpinner className={style.loadingUsername} circle={false}/> :<h2>{user.username}</h2>}
          {loading ? <LoadingSpinner className={style.loadingTimeAge} circle={false}/> : <p>
            <TimeAgo datetime={dateObject} />
          </p>}
        </div>
        {loading ? <LoadingSpinner className={style.loadingMessages} circle={false}/> : <div className={style.message}>
          <MarkdownEditor
            markdown={message}
            readOnly
            contentEditableClassName="content"
          />
        </div>}
      </div>
    </div>
  );
}
