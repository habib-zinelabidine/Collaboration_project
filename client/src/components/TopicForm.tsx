import { useEffect, useRef, useState } from "react";
import Select from "react-select";

import style from "./TopicForm.module.css";
import httpClient from "../axios";
import { useSelector } from "react-redux";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";

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
  const fileRef = useRef(null);

  const [topicName, setTopicName] = useState("");
  const [description, setdescription] = useState("");
  const [showList, setshowList] = useState(false);
  const [imageUrl, setimageUrl] = useState(null);
  const [image, setimage] = useState(null);
  const [fileName, setfileName] = useState("No selected file");
  console.log(imageUrl);

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
      {/*       <label>Invite members</label>
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
      /> */}
      <div className={style.image_uploader} onClick={()=>fileRef.current.click()}>
      <input
        type="file"
        ref={fileRef}
        hidden
        onChange={({ target: { files } }) => {
          files[0] && setfileName(files[0].name);
          if (files) {
            setimage(URL.createObjectURL(files[0]));
            setimageUrl(files[0]);
          }
          
        }}
      />
      {image ? (
        <img src={image} width={200} height={150} alt={fileName} />
      ) : (
       <> 
        <MdCloudUpload color="#1475cf" size={60} />
        <p>Browser File to upload</p>
        </>
      )}
      
      </div>
      <div>
      <section className={style.uploaded_row}>
        <AiFillFileImage color='#1475cf'/>
        <span className={style.uploaded_content}>
          {fileName} - <MdDelete onClick={()=>{
            setfileName('No seleceted file')
            setimage(null)
          }}/>
        </span>
      </section>
      </div>
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
