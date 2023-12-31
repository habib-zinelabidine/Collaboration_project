import { Link } from "react-router-dom";

import style from "./TopicCard.module.css";

export default function TopicCard({
  _id,
  topicName,
  description,
  imageUrl,
}: any) {

  return (
    <>
      <Link
        to={`/home/topic/${_id}`}
        state={{ _id, description, imageUrl,topicName }}
        className={style.card}
      >
        <div className={style.image}>
          <img alt="topic image" src={imageUrl} />
        </div>
        <div className={style.content}>
          <h3 className={style.titme}>{topicName}</h3>
          <p>{description}</p>
        </div>
      </Link>
    </>
  );
}
