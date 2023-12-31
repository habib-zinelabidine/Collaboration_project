import { Link } from "react-router-dom";
import style from "./SideBar.module.css";

export default function SideBar({ topics }) {
  return (
    <div className={style.container}>
      <Link to={"/home"}>
        <h1>Collabory</h1>
      </Link>
      <h2>Topics</h2>
      <ul>
        {topics.map(({ _id, description, imageUrl, topicName }) => (
          <Link
            to={`/home/topic/${_id}`}
            state={{ _id, description, imageUrl, topicName }}
            key={_id}
          >
            <li >
              <h3>#{topicName}</h3>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
