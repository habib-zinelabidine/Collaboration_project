import { useEffect, useState } from "react";
import PopUp from "../../../components/PopUp";
import TopicForm from "../../../components/TopicForm";
import style from "../HomePage.module.css";
import TopicCard from "../../../components/TopicCard";
import httpClient from "../../../axios";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createTopic,
  fetchTopics,
  startFetchTopics,
} from "../../../redux/features/topics";
import "react-loading-skeleton/dist/skeleton.css";

export default function TopicsHomePage() {
  const { currentUser } = useSelector((state) => state["user"]);
  const { topics, loading } = useSelector((state) => state["topics"]);
  const showTopics = useOutletContext();
  const dispatch = useDispatch();
  const [showPopUp, setshowPopUp] = useState(false);
  const [filteredTopics, setFilteredTopics] = useState([topics]);
  const [filterName, setfilterName] = useState("");

  useEffect(() => {
    const getTopics = async () => {
      dispatch(startFetchTopics());
      try {
        const response = await httpClient.get("/api/topic/findall");
        dispatch(fetchTopics(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    getTopics();
  }, []);

  const handleShowPopUp = () => {
    setshowPopUp(!showPopUp);
  };

  const handleSearch = (e) => {
    setfilterName(e.target.value);
  };
  let newTopics = topics
    ? topics?.filter((topic) =>
        topic.topicName.toLowerCase().includes(filterName.toLowerCase())
      )
    : [];

  const handleSubmit = async (data) => {
    const formData = new FormData();
    formData.append("topicName", data.topicName);
    formData.append("description", data.description);
    formData.append("imageUrl", data.imageUrl);
    try {
      const response = await httpClient.post(
        `/api/topic/create/${currentUser._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setFilteredTopics([...newTopics, response.data]);
      if (response.status === 201) {
        setshowPopUp(false);
        dispatch(createTopic(response.data));
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
    newTopics = [...topics].sort((a, b) =>
      a.topicName.localeCompare(b.topicName)
    );

    dispatch(fetchTopics(newTopics));
  };

  const handleSortedByCreatedDay = () => {
    const sortedByCreatedDayTopics = [...topics].sort(
      (a, b) => (new Date(a.createdAt) as any) - (new Date(b.createdAt) as any)
    );

    dispatch(fetchTopics(sortedByCreatedDayTopics));
  };

  const handleSortedByUpdatedDay = () => {
    const sortedByUpdatedDayTopics = [...topics].sort(
      (a, b) => (new Date(a.updatedAt) as any) - (new Date(b.updatedAt) as any)
    );

    dispatch(fetchTopics(sortedByUpdatedDayTopics));
  };

  return (
    <div className={!showTopics ? style.topic_container : style.showTopics}>
      {
        <PopUp isOpen={showPopUp} onClose={() => setshowPopUp(false)}>
          <TopicForm
            onClose={() => setshowPopUp(false)}
            onSubmit={handleSubmit}
            values={""}
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
          <TopicCard topics={newTopics} loading={loading} />
        
      </div>
    </div>
  );
}
