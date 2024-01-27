import { useEffect, useState } from "react";
import style from "./ShowMembers.module.css";
import httpClient from "../axios";
import MemberCard from "./MemberCard";

export default function ShowMembers({ topicId }) {
  const [members, setmembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await httpClient.get(`/api/topic/getmembers/${topicId}`);
      setmembers(response.data.members);
    };
    fetchMembers();
  }, []);
  return (
    <div className={style.container} onClick={(e) => e.stopPropagation()}>
      <h1>Topic Members</h1>
      <div className={style.memberCard}>
        {members.map((member) => (
          <MemberCard key={member._id} member={member} showCloseButton={false}/>
        ))}
      </div>
    </div>
  );
}
