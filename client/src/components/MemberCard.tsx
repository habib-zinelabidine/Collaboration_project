import style from './MemberCard.module.css'
export default function MemberCard({member}) {
  return (
      
    <div className={style.container}>
        <img src={member.avatar}/>
        <h1>{member.username}</h1>
        <h2>{member.email}</h2>
        <button>X</button>
    </div>
  )
}
