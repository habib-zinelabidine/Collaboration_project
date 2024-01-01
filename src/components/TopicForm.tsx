import { useState } from "react";
import { useForm } from "react-hook-form";
import style from "./TopicForm.module.css";

export default function TopicForm({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: any;
}) {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const [showList, setshowList] = useState(false);
  const [selectedMembers, setselectedMembers] = useState(["Select members"])
  console.log(data);
  const handleAddMember = ()=>{
    
  }
  return (
    <form
      className={style.content}
      onSubmit={handleSubmit(onSubmit)}
      onClick={(e) => e.stopPropagation()}
    >
      <h1>Add new topic</h1>
      <label>Name</label>
      <input {...register("topicName")} placeholder="name" />
      <label>Description</label>
      <input {...register("description")} placeholder="Description" />
      <label>Invite members</label>
      <textarea placeholder="email" />
      <label>Add members</label>
      <ul onClick={() => setshowList(!showList)}>
        {selectedMembers}
        {showList && (
          <>
            <li>Habib</li>
            <li>Amine</li>
          </>
        )}
      </ul>
      <input type="file" {...register("imageUrl")} />
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
