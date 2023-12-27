import TopicCard from "../../components/TopicCard";
import Discussion from "./components/Discussion";
import SideBar from "./components/SideBar";
import style from "./HomePage.module.css";
export default function HomePage() {
  return (
    <div className={style.container}>
      <SideBar />
      <div className={style.topic_container}>
        <h1>Topics</h1>
        <div className={style.search}>
          <input placeholder="Search topic..." />
          <span>Name</span>
          <span>Creation Date</span>
          <span>Updated Date</span>
        </div>
        <div className={style.options}>
          <TopicCard
            topicName="test1"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium"
          />
          <TopicCard
            topicName="test2"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium"
          />
          <TopicCard
            topicName="test3"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium"
          />
          <TopicCard
            topicName="test4"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium"
          />
          <TopicCard
            topicName="test5"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium"
          />
          <TopicCard
            topicName="test6"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium"
          />
        </div>
      </div>
      <Discussion />
    </div>
  );
}
