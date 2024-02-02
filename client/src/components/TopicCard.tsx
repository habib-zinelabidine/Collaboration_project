import { Link } from "react-router-dom";

import style from "./TopicCard.module.css";
import LoadingSpinner from "./LoadingSpinner";
import { useSelector } from "react-redux";
import topicsLogo from "../assets/no topics.png";

export default function TopicCard({ topics, loading }: any) {
  const { currentUser } = useSelector((state) => state["user"]);

  return (
    <>
      {topics.length > 0 ? (
        topics.map(
          ({ _id, description, imageUrl, topicName, createrId, members }) =>
            loading ? (
              <LoadingSpinner className={style.card} circle={false} key={_id} />
            ) : members.includes(currentUser._id) ? (
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
            ) : (
              <div className={style.noTopics}>
                <img src={topicsLogo} />

              </div>
            )
        )
      ) : (
        <img src={topicsLogo} />
      )}
    </>
  );
}
