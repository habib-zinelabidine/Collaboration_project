import { useState } from "react";
import TopicCard from "../../components/TopicCard";
import Discussion from "./components/Discussion";
import SideBar from "./components/SideBar";
import style from "./HomePage.module.css";
import PopUp from "../../components/PopUp";
import TopicForm from "../../components/TopicForm";
export default function HomePage() {
  const topicDetails = [
    {
      id: 1,
      topicName: "test1",
      description: "This is a test for the discussion board.",
      imageUrl : "https://www.searchenginejournal.com/wp-content/uploads/2021/09/find-whats-trending-6151d8276c49d-sej-1280x720.png"
    },
    {
      id: 2,
      topicName: "test2",
      description: "This is a test for the discussion board.",
      imageUrl : "https://www.searchenginejournal.com/wp-content/uploads/2021/09/find-whats-trending-6151d8276c49d-sej-1280x720.png"

    },
    {
      id: 3,
      topicName: "test3",
      description: "This is a test for the discussion board.",
      imageUrl : "https://www.searchenginejournal.com/wp-content/uploads/2021/09/find-whats-trending-6151d8276c49d-sej-1280x720.png"

    },
    {
      id: 4,
      topicName: "test4",
      description: "This is a test for the discussion board.",
      imageUrl : "https://www.searchenginejournal.com/wp-content/uploads/2021/09/find-whats-trending-6151d8276c49d-sej-1280x720.png"

    },
    {
      id: 5,
      topicName: "test5",
      description: "This is a test for the discussion board.",
      imageUrl : "https://www.searchenginejournal.com/wp-content/uploads/2021/09/find-whats-trending-6151d8276c49d-sej-1280x720.png"

    },
    {
      id: 6,
      topicName: "test6",
      description: "This is a test for the discussion board.",
      imageUrl : "https://www.searchenginejournal.com/wp-content/uploads/2021/09/find-whats-trending-6151d8276c49d-sej-1280x720.png"

    },
  ];
  const [showPopUp, setshowPopUp] = useState(false);
  const [formData, setFormData] = useState(topicDetails);

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
  return (
    <div className={style.container}>
      {
        <PopUp isOpen={showPopUp} onClose={() => setshowPopUp(false)}>
          <TopicForm
            onClose={() => setshowPopUp(false)}
            onSubmit={(data: {
              id: number;
              topicName: string;
              description: string;
              imageUrl : string;
            }) => {
              setFormData([...formData, data]);
            }}
            
          />
        </PopUp>
      }
      <SideBar />
      <div className={style.topic_container}>
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
          {formData.map((topic, index) => (
            <TopicCard
              key={index}
              topicName={topic.topicName}
              description={topic.description}
              imageUrl = {topic.imageUrl}
            />
          ))}
        </div>
      </div>
      <Discussion />
    </div>
  );
}
