import { Link } from "react-router-dom";
import style from "./SideBar.module.css";
import { useEffect, useState } from "react";
import httpClient from "../../../axios";

export default function SideBar({ showTopics }) {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await httpClient.get("/api/topic/findall");
        setTopics(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopics();
  }, []);
  const handleSearch = (e) => {
    setTopics(
      topics.filter((topic) =>
        topic.topicName.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    console.log(topics);
    console.log(e.target.value);
  };

  return (
    <div className={showTopics ? style.showTopics : style.container}>
      <h2>Topics</h2>
      <input
        type="text"
        placeholder="Search topic..."
        onChange={handleSearch}
      />
      <ul>
        {topics.map(({ _id, description, imageUrl, topicName }) => (
          <Link
            to={`/home/topic/${_id}`}
            state={{ _id, description, imageUrl, topicName }}
            key={_id}
          >
            <li>
              <h3>#{topicName}</h3>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
