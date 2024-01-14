import { useEffect, useState } from "react";
import PopUp from "../../../components/PopUp";
import TopicForm from "../../../components/TopicForm";
import style from "../HomePage.module.css";
import TopicCard from "../../../components/TopicCard";
import httpClient from "../../../axios";

export default function TopicsHomePage() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await httpClient.get("/api/topic/findall");
        setTopics(response.data);
        console.log(topics);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopics();
  }, []);

  const [showPopUp, setshowPopUp] = useState(false);
  const [formData, setFormData] = useState(topics);

  const handleShowPopUp = () => {
    setshowPopUp(!showPopUp);
  };
  const handleSearch = (e) => {
    setFormData(
      formData.filter((f) => {
        f.topicName === e.target.value;
      })
    );
  };
  const handleSubmit = async (data) => {
    try {
      const response = await httpClient.post("/api/topic/create", data);
      console.log(data);

      setTopics([...topics, response.data]);
      console.log(topics);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.topic_container}>
      {
        <PopUp isOpen={showPopUp} onClose={() => setshowPopUp(false)}>
          <TopicForm
            onClose={() => setshowPopUp(false)}
            onSubmit={handleSubmit}
          />
        </PopUp>
      }
      <h1>What do you want to do today?</h1>
      <div className={style.search}>
        <input placeholder="Search topic..." onChange={handleSearch} />

        <select>
          <option value="">Sorted by</option>
          <option value="Name">Name</option>
          <option value="Creation Date">Creation Date</option>
          <option value="Updated Date">Updated Date</option>
        </select>
        <button onClick={handleShowPopUp}>Add topic</button>
      </div>
      <div className={style.options}>
        <TopicCard topics={topics} />
      </div>
    </div>
  );
}
