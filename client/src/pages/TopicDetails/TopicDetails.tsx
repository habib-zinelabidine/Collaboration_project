import { useLocation } from "react-router-dom";
import style from "./TopicDetails.module.css";
import { MDXEditor, UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import DiscussionCard from "../../components/DiscussionCard";

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
          <DiscussionCard />
          <DiscussionCard />
          <DiscussionCard />
          <DiscussionCard />
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
