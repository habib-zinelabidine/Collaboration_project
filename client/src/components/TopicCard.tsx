import { useNavigate } from "react-router-dom";
import style from "./TopicCard.module.css";

export default function TopicCard({id, topicName, description, imageUrl }: any) {
  const navigate = useNavigate();

  return (
    <>
      <div className={style.card} onClick={()=>navigate(`/home/${id}`)}>
        <div className={style.image}>
          <img alt="topic image"
          src={imageUrl}/>
        </div>
        <div className={style.content}>
          <h3 className={style.titme}>{topicName}</h3>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}
