import style from "./TopicCard.module.css";

export default function TopicCard() {
  return (
    <div className={style.topic_container}>
      <div className={style.topic_image}>
        <img
          alt="topic image"
          src="https://cc-west-blog-assets.s3.amazonaws.com/uploads/2016/09/write-any-topic.jpg"
        />
      </div>
      <div className={style.card_content}>
        <h2>Topics</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          ad corporis voluptatibus laboriosam sit quas
        </p>
      </div>
      <div className={style.avatars}>
        <img src="https://cc-west-blog-assets.s3.amazonaws.com/uploads/2016/09/write-any-topic.jpg" />
      </div>
    </div>
  );
}
