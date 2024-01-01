import style from "./TopicCard.module.css";

export default function TopicCard({ topicName, description, imageUrl }: any) {
  return (
    <>
      <div className={style.card}>
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
