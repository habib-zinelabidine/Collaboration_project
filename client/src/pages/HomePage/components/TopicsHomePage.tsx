import { CSSProperties, useEffect, useState } from "react";
import PopUp from "../../../components/PopUp";
import TopicForm from "../../../components/TopicForm";
import style from "../HomePage.module.css";
import TopicCard from "../../../components/TopicCard";
import httpClient from "../../../axios";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTopic, fetchTopics, startFetchTopics } from "../../../redux/features/topics";
import ClipLoader from "react-spinners/ClipLoader";
import HashLoader from "react-spinners/HashLoader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function TopicsHomePage() {
  const { currentUser } = useSelector((state) => state["user"]);
  const { topics,loading } = useSelector((state) => state["topics"]);
  const showTopics = useOutletContext();
  // const [topics, setTopics] = useState([]);
  const dispatch = useDispatch();
  const [originalTopics, setOriginalTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState(topics);
  const [filterName, setfilterName] = useState("");

  useEffect(() => {
    const getTopics = async () => {
      dispatch(startFetchTopics());
      try {
        const response = await httpClient.get("/api/topic/findall");
        /* const filteredTopics = response.data.filter((topic) =>
          topic.members.includes(currentUser._id)
        ); */
        dispatch(fetchTopics(response.data));
        /* setOriginalTopics(filteredTopics);
        setFilteredTopics(filteredTopics); */
      } catch (error) {
        console.log(error);
      }
    };
    getTopics();
  }, []);

  /*  useEffect(() => {
    const getTopics = async () => {
      try {
        const response = await httpClient.get("/api/topic/findall");
        const filteredTopics = topics.filter((topic) =>
          topic.members.includes(currentUser._id)
        );
        dispatch(fetchTopics(response.data));
        setOriginalTopics(topics);
        setFilteredTopics(topics);
      } catch (error) {
        console.log(error);
      }
    };
    getTopics();
  }, []); */

  const [showPopUp, setshowPopUp] = useState(false);
  const [formData, setFormData] = useState(topics);

  const handleShowPopUp = () => {
    setshowPopUp(!showPopUp);
  };

  const handleSearch = (e) => {
    /* const newFilteredTopics = topics.filter((topic) =>
      topic.topicName.toLowerCase().includes(e.target.value.toLowerCase())
    ); */

    setfilterName(e.target.value);
  };
  const newTopics = topics
    ? topics?.filter((topic) =>
        topic.topicName.toLowerCase().includes(filterName.toLowerCase())
      )
    : [];
  console.log(newTopics);

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
