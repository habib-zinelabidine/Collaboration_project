import { useState } from "react";
import style from "./TopicCard.module.css";

export default function TopicCard({ topicName, description }: any) {
  const [showDetails, setshowDetails] = useState(false);
  return (
    <>
      {/* <div className={style.card} onClick={() => setshowDetails(!showDetails)}>
        <img
          alt="topic image"
          src="https://cc-west-blog-assets.s3.amazonaws.com/uploads/2016/09/write-any-topic.jpg"
        />
        <h3>{topicName}</h3>
        <div className={style.focus_content}>
          <p>{description}</p>
        </div>
      {showDetails && (
        <div className={style.details}>
          <h3>{topicName}</h3>
          <p>{description}</p>
          <div className={style.avatars}>
            <img src="https://cc-west-blog-assets.s3.amazonaws.com/uploads/2016/09/write-any-topic.jpg" />
          </div>
        </div>
      )}
      </div> */}
      <div className={style.card}>
        <div className={style.image}>
          <img alt="topic image"
          src="https://www.searchenginejournal.com/wp-content/uploads/2021/09/find-whats-trending-6151d8276c49d-sej-1280x720.png"/>
        </div>
        <div className={style.content}>
          <h3 className={style.titme}>{topicName}</h3>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}
