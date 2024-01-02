import { useParams } from "react-router-dom"

export default function TopicDetails() {
    const {id,topicName,description,imageUrl} = useParams();
  return (
    <h1>TopicDetails : {id}</h1>
  )
}
