import { useSelector } from "react-redux";
import style from "./DiscussionCard.module.css";
import TimeAgo from "timeago-react";
import { useEffect, useState } from "react";
import httpClient from "../axios";
import { Buffer } from "buffer";

export default function DiscussionCard({ message, discussionTime, senderId }) {
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

         {/*  {(convertedMessage.includes("http") || convertedMessage.includes("\\") || convertedMessage.includes(".") )? (
            <img src={convertedMessage} width={50} height={50} />
          ) : (
            <p>{convertedMessage}</p>
          )} */}
        </div>
      </div>
    </div>
  );
}
