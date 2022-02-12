import React,{useState} from 'react'
import {Card,Divider,Button,Tooltip} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import Router from 'next/router'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
export interface NoteProps {
    title:String,
    content:String,
    _id:String,
}

type IconSize = "small" | "medium" | "large" | "inherit" | undefined

export default function Note(props:NoteProps) {
  const [bg,setBg] = useState("#fff")
  const [delSize,setDelSize] = useState<IconSize>("small")
  const handleDeleteNote = (noteId:String)=>{
    axios.post("/api/note/delete",{noteId:noteId}).then((res)=>{
      if(res.status === 200){
        console.log("Note Deleted")
        Router.reload()
      }
    })
  }
  
  const handleEnter = () => {
    setBg("rgba(255, 87, 51,0.9)")
  }
  const handleLeave = () => {
    setBg("#fff")
  }

  return (
    // <div style={{border:'1px solid black',borderRadius:'20px',padding:'2rem'}}>
    //     <h2>{props.title}</h2>
    //     <div style={{padding:'0.2 0.4rem',fontSize:'1.1rem',marginTop:'0.6rem'}}>
    //         {props.content}
    //     </div>
    // </div>
    <Card className="note" style={{borderRadius:'25px',marginBottom:'4vh',background:bg}}>
      <div style={{padding:'0.5rem 1rem'}}>
      <div style={{padding:'0',fontSize:'1.4rem',fontWeight:'700'}}>{props.title}</div>
      <Divider style={{ margin:'1rem 0'}}/>
      <div style={{fontSize:'1.1rem',minHeight:'20vh'}}>
      {props.content}
      </div>
      <div style={{display:'flex',gap:'0.4rem',justifyContent:'flex-end'}}>
      <Button style={{width:'fit-content',padding:'4px 4px',minWidth:'14px'}}><EditIcon fontSize='small'/></Button>
      <Tooltip title="delete">
        <Button  onMouseEnter={handleEnter} onMouseLeave={handleLeave} onClick={()=>handleDeleteNote(props._id)} style={{width:'fit-content',padding:'4px 4px',minWidth:'14px'}}>
         { //@ts-ignore
}
          <DeleteIcon fontSize="small"/></Button></Tooltip>
      </div>
      </div>
    </Card>
  )
}
