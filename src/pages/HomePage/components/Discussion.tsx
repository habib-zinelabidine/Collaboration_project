import style from "./Discussion.module.css";

export default function Discussion() {
  return (
    <div className={style.container}>
      <div className={style.user_details}>
        <h1>habib</h1>
        <img src="https://www.tu-ilmenau.de/unionline/fileadmin/_processed_/0/0/csm_Person_Yury_Prof_Foto_AnLI_Footgrafie__2_.JPG_94f12fbf25.jpg"/>
      </div>
      <div className={style.discussion}>
        <div className={style.discussion_content}>

        </div>
        <div className={style.discussion_people}>
        <img src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg"/>

        </div>
      </div>
    </div>
  );
}
