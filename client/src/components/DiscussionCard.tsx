import style from "./DiscussionCard.module.css";

export default function DiscussionCard() {
  return (
    <div className={style.container}>
      <img src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg" />
      <div className={style.content}>
        <div className={style.userDetails}>
          <h2>userName</h2>
          <p>12 min</p>
        </div>
        <div className={style.message}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
            libero maiores deleniti itaque at nesciunt tempora eius, fuga eum
            tenetur minus molestias amet totam quisquam earum harum dolorem
            repellendus illum ullam. Harum amet delectus, quas iusto excepturi
            cum ab. Quis magnam laborum est veritatis ducimus perferendis,
            reprehenderit dolore velit dolor.
          </p>
        </div>
      </div>
    </div>
  );
}
