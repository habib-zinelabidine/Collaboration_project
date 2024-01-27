import style from './EditMembers.module.css'
export default function EditMembers() {
  return (
    <div className={style.container} onClick={(e) => e.stopPropagation()}>
        <h1>Edit members</h1>
        
    </div>
  )
}
