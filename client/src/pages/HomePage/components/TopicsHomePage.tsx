import { useEffect, useState } from "react";
import PopUp from "../../../components/PopUp";
import TopicForm from "../../../components/TopicForm";
import style from "../HomePage.module.css";
import TopicCard from "../../../components/TopicCard";
import httpClient from "../../../axios";
import { FaHome, FaComment, FaPeopleCarry } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TopicsHomePage() {
  const { currentUser } = useSelector((state) => state["user"]);
  const showTopics = useOutletContext();
  const [topics, setTopics] = useState([]);
  const [originalTopics, setOriginalTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  useEffect(() => {
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
  }, []);

  const [showPopUp, setshowPopUp] = useState(false);
  const [formData, setFormData] = useState(topics);

  const handleShowPopUp = () => {
    setshowPopUp(!showPopUp);
  };
  const handleSearch = (e) => {
    const newFilteredTopics = originalTopics.filter((topic) =>
      topic.topicName.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredTopics(newFilteredTopics);
  };
  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("topicName", data.topicName);
    formData.append("description", data.description);
    formData.append("imageUrl", data.imageUrl);
    formData.append("members", data.option);
    try {
      const response = await httpClient.post(
        `/api/topic/create/${currentUser._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setFilteredTopics([...filteredTopics, response.data]);
      if (response.status === 201) {
        setshowPopUp(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;

    if (selectedOption === "Name") {
      handleSortedByName();
    } else if (selectedOption === "Creation Date") {
      handleSortedByCreatedDay();
    } else if (selectedOption === "Updated Date") {
      handleSortedByUpdatedDay();
    }
  };
  const handleSortedByName = () => {
    const sortedByNameTopics = [...filteredTopics].sort((a, b) =>
      a.topicName.localeCompare(b.topicName)
    );

    setFilteredTopics(sortedByNameTopics);
  };

  const handleSortedByCreatedDay = () => {
    const sortedByCreatedDayTopics = [...filteredTopics].sort(
      (a, b) => (new Date(a.createdAt) as any) - (new Date(b.createdAt) as any)
    );

    setFilteredTopics(sortedByCreatedDayTopics);
  };

  const handleSortedByUpdatedDay = () => {
    const sortedByUpdatedDayTopics = [...filteredTopics].sort(
      (a, b) => (new Date(a.updatedAt) as any) - (new Date(b.updatedAt) as any)
    );

    setFilteredTopics(sortedByUpdatedDayTopics);
  };
  return (
    <div className={!showTopics ? style.topic_container : style.showTopics}>
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

        <select onChange={handleSortChange}>
          <option value="">Sorted by</option>
          <option value="Name">Name</option>
          <option value="Creation Date">Creation Date</option>
          <option value="Updated Date">Updated Date</option>
        </select>
        <button onClick={handleShowPopUp}>Add topic</button>
      </div>
      <div className={style.options}>
        <TopicCard topics={filteredTopics} />
      </div>
    </div>
  );
}
