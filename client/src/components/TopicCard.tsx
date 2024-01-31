import { Link } from "react-router-dom";

import style from "./TopicCard.module.css";
import LoadingSpinner from "./LoadingSpinner";

export default function TopicCard({ topics,loading }: any) {
  return (
    <>
      {topics.map(({ _id, description, imageUrl, topicName, createrId }) => (
        loading ? <LoadingSpinner className={style.card} circle={false}/> :
        <Link
        to={`/home/topic/${_id}`}
        key={_id}
        state={{ _id, description, imageUrl, topicName, createrId }}
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
      ))}
    </>
  );
}
