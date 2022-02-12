import Note,{NoteProps} from './Note'
import React,{useEffect, useState} from 'react'
import axios from "axios"
export default function Notes() {

    const [notes,setNotes] = useState([])

    useEffect(()=>{
        axios.post("/api/note/usernotes",{uid:localStorage.getItem("uid")}).then((res)=>{
          if(res.status === 200){
            setNotes(res.data.notes)
          }
        })
      })
  return (
    <div>
         {notes.length>0?
          <div className='notesCont' style={{display:'flex',flexDirection:'column',gap:'1rem',justifyContent:'center'}}>
            {notes.map((note:NoteProps,key)=>{
              return <Note _id={note._id}  title={note.title} content={note.content}  key={key}/>
            })}
         </div>:null}
    </div>
  )
}
