import { useLocation } from "react-router-dom";
import style from "./TopicDetails.module.css";
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

export default function TopicDetails() {
  let { state } = useLocation();
  console.log(state);

  return (
    <div className={style.container}>
      <div className={style.topic_disccussion}>
        <img src={state.imageUrl} />
        <div className={style.content}>
        <h1>{state.topicName}</h1>
        <p>{state.description}</p>
        <div className={style.discussion}>
          <img src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
            libero maiores deleniti itaque at nesciunt tempora eius, fuga eum
            tenetur minus molestias amet totam quisquam earum harum dolorem
            repellendus illum ullam. Harum amet delectus, quas iusto excepturi
            cum ab. Quis magnam laborum est veritatis ducimus perferendis,
            reprehenderit dolore velit dolor.
          </p>
        </div>
        <div className={style.discussion}>
          <img src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
            libero maiores deleniti itaque at nesciunt tempora eius, fuga eum
            tenetur minus molestias amet totam quisquam earum harum dolorem
            repellendus illum ullam. Harum amet delectus, quas iusto excepturi
            cum ab. Quis magnam laborum est veritatis ducimus perferendis,
            reprehenderit dolore velit dolor.
          </p>
        </div>
        <div className={style.discussion}>
          <img src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
            libero maiores deleniti itaque at nesciunt tempora eius, fuga eum
            tenetur minus molestias amet totam quisquam earum harum dolorem
            repellendus illum ullam. Harum amet delectus, quas iusto excepturi
            cum ab. Quis magnam laborum est veritatis ducimus perferendis,
            reprehenderit dolore velit dolor.
          </p>
        </div>
        <div className={style.discussion}>
          <img src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
            libero maiores deleniti itaque at nesciunt tempora eius, fuga eum
            tenetur minus molestias amet totam quisquam earum harum dolorem
            repellendus illum ullam. Harum amet delectus, quas iusto excepturi
            cum ab. Quis magnam laborum est veritatis ducimus perferendis,
            reprehenderit dolore velit dolor.
          </p>
        </div>
        <div className={style.discussion}>
          <img src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
            libero maiores deleniti itaque at nesciunt tempora eius, fuga eum
            tenetur minus molestias amet totam quisquam earum harum dolorem
            repellendus illum ullam. Harum amet delectus, quas iusto excepturi
            cum ab. Quis magnam laborum est veritatis ducimus perferendis,
            reprehenderit dolore velit dolor.
          </p>
        </div>
        <div className={style.discussion}>
          <img src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
            libero maiores deleniti itaque at nesciunt tempora eius, fuga eum
            tenetur minus molestias amet totam quisquam earum harum dolorem
            repellendus illum ullam. Harum amet delectus, quas iusto excepturi
            cum ab. Quis magnam laborum est veritatis ducimus perferendis,
            reprehenderit dolore velit dolor.
          </p>
        </div>
        <div className={style.discussion}>
          <img src="https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
            libero maiores deleniti itaque at nesciunt tempora eius, fuga eum
            tenetur minus molestias amet totam quisquam earum harum dolorem
            repellendus illum ullam. Harum amet delectus, quas iusto excepturi
            cum ab. Quis magnam laborum est veritatis ducimus perferendis,
            reprehenderit dolore velit dolor.
          </p>
        </div>
        </div>
        
      </div>
      <div className={style.message}>
        <MDXEditor markdown={"# Hello World"} plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <div>
              <BoldItalicUnderlineToggles />
            </div>
          )
        })
      ]} />
      </div>
    </div>
  );
}
