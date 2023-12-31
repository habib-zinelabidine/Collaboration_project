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
  console.log(data);
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
      <select>
        <option>Select member</option>
        <option>Habib</option>
        <option>Amine</option>
      </select>
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
