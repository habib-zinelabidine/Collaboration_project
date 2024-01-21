import { useEffect, useState } from "react";
import Discussion from "./components/Discussion";
import SideBar from "./components/SideBar";
import style from "./HomePage.module.css";
import { Outlet } from "react-router-dom";
import httpClient from "../../axios";
import NavBar from "../../components/NavBar";

export default function HomePage() {
  const [showTopics, setshowTopics] = useState(false);
  const [showDiscussionList, setshowDiscussionList] = useState(false);

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
        <Outlet context={showTopics} />
        <Discussion
          showTopics={showTopics}
          showDiscussionList={showDiscussionList}
        />
      </div>
    </div>
  );
}
