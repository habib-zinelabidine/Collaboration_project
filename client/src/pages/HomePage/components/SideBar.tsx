import { Link } from "react-router-dom";
import style from "./SideBar.module.css";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { fetchTopics } from "../../../redux/features/topics";

export default function SideBar({ showTopics }) {
  const { topics,loading } = useSelector((state) => state["topics"]);
  const dispatch = useDispatch();
  const [originalTopics, setOriginalTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [filterName, setfilterName] = useState("");


  const handleSearch = (e) => {
    setfilterName(e.target.value);

  };
  const newTopics = topics
  ? topics?.filter((topic) =>
      topic.topicName.toLowerCase().includes(filterName.toLowerCase())
    )
  : [];

  return (
    <div className={showTopics ? style.showTopics : style.container}>
      <h2>Topics</h2>
      <input
        type="text"
        placeholder="Search topic..."
        onChange={handleSearch}
      />
      <ul>
        {topics && newTopics.map(({ _id, description, imageUrl, topicName, createrId }) => (
          loading ? <LoadingSpinner key={_id} className={style.topicLoading}circle={false}/> :
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
