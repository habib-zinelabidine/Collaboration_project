import { useSelector } from "react-redux";
import style from "./AddMembers.module.css";
import { useState } from "react";
import Select from "react-select";
import MemberCard from "./MemberCard";

export default function AddMembers() {
  const { currentUsers } = useSelector((state) => state["users"]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [members, setmembers] = useState([]);

  const options = currentUsers.map((user) => ({
    value: user,
    label: user.username,
  }));

  if (selectedOption !== null) {
    setmembers((prevMembers) => [...prevMembers, selectedOption.value]);
    setSelectedOption(null);
  }
  const handleInput = (e) => {
    e.preventDefault();
  };

  console.log(members);

  return (
    <form
      className={style.container}
      onSubmit={handleInput}
      onClick={(e) => e.stopPropagation()}
    >
      <h1>Add Members</h1>

      <label>Search users name</label>
      {/* <input type="text" onChange={handleInput} list="cityname" />
      <datalist id="cityname">
        {currentUsers.map((user) => ( 
           <option key={user._id} value={user.username}></option>
          
        ))}
      </datalist> */}
      <Select
        className={style.select}
        onChange={setSelectedOption}
        options={options}
        value={() => setSelectedOption(null)}
      />
      <div className={style.memberCard}>
        {members.map((member) => (
          <MemberCard key={Math.random() * 1000} member={member}/>
        ))}
      </div>
      <button type="submit">Add Member</button>
    </form>
  );
}
