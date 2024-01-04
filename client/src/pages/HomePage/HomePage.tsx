import Discussion from "./components/Discussion";
import SideBar from "./components/SideBar";
import style from "./HomePage.module.css";
import { Outlet } from "react-router-dom";

export default function HomePage() {
  const topics = [
    {
      id: 1,
      topicName: "test1",
      description: "This is a test for the discussion board.",
      imageUrl:
        "https://www.searchenginejournal.com/wp-content/uploads/2021/09/find-whats-trending-6151d8276c49d-sej-1280x720.png",
    },
    {
      id: 2,
      topicName: "test2",
      description: "This is a test for the discussion board.",
      imageUrl:
        "https://www.searchenginejournal.com/wp-content/uploads/2021/09/find-whats-trending-6151d8276c49d-sej-1280x720.png",
    },
    {
      id: 3,
      topicName: "test3",
      description: "This is a test for the discussion board.",
      imageUrl:
        "https://www.searchenginejournal.com/wp-content/uploads/2021/09/find-whats-trending-6151d8276c49d-sej-1280x720.png",
    },
    {
      id: 4,
      topicName: "test4",
      description: "This is a test for the discussion board.",
      imageUrl:
        "https://www.searchenginejournal.com/wp-content/uploads/2021/09/find-whats-trending-6151d8276c49d-sej-1280x720.png",
    },
    {
      id: 5,
      topicName: "test5",
      description: "This is a test for the discussion board.",
      imageUrl:
        "https://www.searchenginejournal.com/wp-content/uploads/2021/09/find-whats-trending-6151d8276c49d-sej-1280x720.png",
    },
    {
      id: 6,
      topicName: "test6",
      description: "This is a test for the discussion board.",
      imageUrl:
        "https://www.searchenginejournal.com/wp-content/uploads/2021/09/find-whats-trending-6151d8276c49d-sej-1280x720.png",
    },
  ];

  return (
    <div className={style.container}>
      <SideBar topics={topics} />

      <Outlet />
      <Discussion />
    </div>
  );
}
