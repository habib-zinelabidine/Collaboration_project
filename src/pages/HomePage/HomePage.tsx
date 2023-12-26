import TopicCard from "../../components/TopicCard";
import SideBar from "./components/SideBar";
import style from "./HomePage.module.css";
export default function HomePage() {
    return (
      <div className={style.container}>
        <SideBar />
        <div className={style.options}>
          <TopicCard />
          <TopicCard />
          <TopicCard />
          <TopicCard />
          <TopicCard />
          <TopicCard />
        </div>
      </div>
    );
  };
