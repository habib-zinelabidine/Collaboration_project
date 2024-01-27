import { useRef, useState } from "react";
import style from "./TopicForm.module.css";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";

export default function TopicForm({ onClose, onSubmit, values }) {
  const fileRef = useRef(null);
  const [topicName, setTopicName] = useState(values.topicName);
  const [description, setdescription] = useState(values.description);
  const [imageUrl, setimageUrl] = useState(values.imageUrl);
  const [image, setimage] = useState(imageUrl);
  const [fileName, setfileName] = useState("No selected file");

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

      <div
        className={style.image_uploader}
        onClick={() => fileRef.current.click()}
      >
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
          <AiFillFileImage color="#1475cf" />
          <span className={style.uploaded_content}>
            {fileName} -{" "}
            <MdDelete
              onClick={() => {
                setfileName("No seleceted file");
                setimage(null);
              }}
            />
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
