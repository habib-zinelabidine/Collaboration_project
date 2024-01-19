import { useEffect, useState } from "react";
import Select from "react-select";

import style from "./TopicForm.module.css";
import httpClient from "../axios";
import { useSelector } from "react-redux";

export default function TopicForm({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: any;
}) {
  const { currentUsers } = useSelector((state) => state["users"]);

  const options = currentUsers.map((user) => ({
    value: user.username,
    label: user.username,
  }));
  const usersEmail = currentUsers.map((user) => ({
    value: user.email,
    label: user.email,
  }));

  const [selectedOption, setSelectedOption] = useState(null);
  const [topicName, setTopicName] = useState("");
  const [description, setdescription] = useState("");
  const [showList, setshowList] = useState(false);
  const [imageUrl, setimageUrl] = useState(null);

  return (
    <form
      className={style.content}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          topicName,
          description,
          imageUrl,
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
      <Select
        className={style.select}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={usersEmail}
        isMulti
      />
      <label>Add members</label>
      <Select
        className={style.select}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        isMulti
      />

      <input
        type="file"
        onChange={(event) => {
          setimageUrl(event.target.files[0]);
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
