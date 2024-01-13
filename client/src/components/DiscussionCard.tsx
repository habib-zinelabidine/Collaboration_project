import style from "./DiscussionCard.module.css";

export default function DiscussionCard({message}) {
  
  return (
    <div className={style.container}>
      <img src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg" />
      <div className={style.content}>
        <div className={style.userDetails}>
          <h2>userName</h2>
          <p>12 min</p>
        </div>
        <div className={style.message}>
          <p>{message}
          </p>
        </div>
      </div>
    </div>
  );
}
