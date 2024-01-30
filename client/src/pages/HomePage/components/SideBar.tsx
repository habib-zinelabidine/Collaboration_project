import { Link } from "react-router-dom";
import style from "./SideBar.module.css";
import { useEffect, useState } from "react";
import httpClient from "../../../axios";
import { useSelector } from "react-redux";

export default function SideBar({ showTopics }) {
  const { currentUser } = useSelector((state) => state["user"]);
  const { topics } = useSelector((state) => state["topics"]);
  const [originalTopics, setOriginalTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
/*   useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await httpClient.get("/api/topic/findall");
        const filteredTopics = response.data.filter((topic) =>
          topic.members.includes(currentUser._id)
        );

        setOriginalTopics(filteredTopics);
        setFilteredTopics(filteredTopics);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopics();
  }, []); */
  const handleSearch = (e) => {
    const newFilteredTopics = originalTopics.filter((topic) =>
      topic.topicName.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredTopics(newFilteredTopics);
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
        {topics && topics.map(({ _id, description, imageUrl, topicName, createrId }) => (
          <Link
            to={`/home/topic/${_id}`}
            state={{ _id, description, imageUrl, topicName, createrId }}
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
