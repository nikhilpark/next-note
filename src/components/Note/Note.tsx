import React from 'react'

export interface NoteProps {
    title:String,
    content:String,
}

export default function Note(props:NoteProps) {
  return (
    <div style={{border:'1px solid black',borderRadius:'20px',padding:'2rem'}}>
        <h2>{props.title}</h2>
        <div style={{padding:'0.2 0.4rem',fontSize:'1.1rem',marginTop:'0.6rem'}}>
            {props.content}
        </div>
    </div>
  )
}
