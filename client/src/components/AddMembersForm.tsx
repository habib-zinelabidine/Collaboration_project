import { useSelector } from "react-redux";
import style from "./AddMembers.module.css";
import { useState } from "react";
import Select from "react-select";
import MemberCard from "./MemberCard";

export default function AddMembers({ onSubmit }) {
  const { currentUsers } = useSelector((state) => state["users"]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [users, setusers] = useState([]);
  const [members, setmembers] = useState([]);

  const options = currentUsers.map((user) => ({
    value: user,
    label: user.username,
  }));

  if (selectedOption !== null) {
    setusers((prevUsers) => {
      const newValue = selectedOption.value;
      if (!prevUsers.includes(newValue)) {
        return [...prevUsers, newValue];
      }
      return prevUsers;
    });
    setSelectedOption(null);
    setmembers((prevMembers) => [...prevMembers, selectedOption.value._id]);
  }
  return (
    <form
      className={style.container}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ members });
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h1>Add Members</h1>

      <label>Search users name</label>
      <Select
        className={style.select}
        onChange={(selected) => setSelectedOption(selected)}
        options={options}
        value={() => setSelectedOption(null)}
      />
      <div className={style.memberCard}>
        {users.map((member) => (
          <MemberCard key={Math.random() * 1000} member={member} showCloseButton={true}/>
        ))}
      </div>
      <button type="submit">Add Member</button>
    </form>
  );
}
