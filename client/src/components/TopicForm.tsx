import { useEffect, useState } from "react";
import Select from "react-select";

import style from "./TopicForm.module.css";
import httpClient from "../axios";

export default function TopicForm({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: any;
}) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await httpClient.get("/api/user/users");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  const options = users.map((user) => ({
    value: user.username,
    label: user.username,
  }));

  const [selectedOption, setSelectedOption] = useState(null);

  const [data, setData] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [description, setdescription] = useState("");
  const [showList, setshowList] = useState(false);
  const [imageUrl, setPostImage] = useState("");
/*   const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }; */
/*   const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ base64 });
  }; */
  return (
    <form
      className={style.content}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          topicName,
          description,
          imageUrl
        });
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <h1>Add new topic</h1>
      <label>Name</label>
      <input
        value={topicName}
        placeholder="name"
        onChange={(e) => setTopicName(e.target.value)}
      />
      <label>Description</label>
      <input
        value={description}
        placeholder="Description"
        onChange={(e) => setdescription(e.target.value)}
      />
      <label>Invite members</label>
      <textarea placeholder="email" />
      <label>Add members</label>
      <ul onClick={() => setshowList(!showList)}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          isMulti
        />
      </ul>
      <input
        type="file"
        onChange={(e) => {
          /* handleFileUpload(e); */
        }}
      />
      <div className={style.btn}>
        <button type="submit" className={style.btn_create}>
          Create
        </button>
        <button className={style.btn_cancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
