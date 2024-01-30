import { useEffect, useState } from "react";
import Discussion from "./components/Discussion";
import SideBar from "./components/SideBar";
import style from "./HomePage.module.css";
import { Outlet } from "react-router-dom";
import httpClient from "../../axios";
import NavBar from "../../components/NavBar";
import { useDispatch } from "react-redux";
import { fetchTopics } from "../../redux/features/topics";

export default function HomePage() {
  const [showTopics, setshowTopics] = useState(false);
  const [showDiscussionList, setshowDiscussionList] = useState(false);
  const [topics, settopics] = useState([]);
const dispatch = useDispatch();
  useEffect(() => {
    const getTopics = async () => {
      try {
        const response = await httpClient.get("/api/topic/findall");
        /* const filteredTopics = response.data.filter((topic) =>
          topic.members.includes(currentUser._id)
        ); */
        dispatch(fetchTopics(response.data));
        settopics(response.data);
        /* setOriginalTopics(filteredTopics);
        setFilteredTopics(filteredTopics); */
      } catch (error) {
        console.log(error);
      }
    };
    getTopics();
  }, []);
  
  return (
    <div className={style.container}>
      <NavBar
        showTopics={showTopics}
        setshowTopics={setshowTopics}
        showDiscussionList={showDiscussionList}
        setshowDiscussionList={setshowDiscussionList}
      />
      <div
        className={
          showTopics
            ? style.show_topic_container
            : style.content && showDiscussionList
            ? style.show_disscussion
            : style.content
        }
      >
        <SideBar showTopics={showTopics} />
        <Outlet context={showTopics}/>
        <Discussion
          showTopics={showTopics}
          showDiscussionList={showDiscussionList}
        />
      </div>
    </div>
  );
}
