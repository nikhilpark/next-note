import React, { useState, useEffect } from "react";
import axios from "axios"
import {
  TextField,
  Button,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  CircularProgress
} from "@mui/material";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator();
export default function NoteView() {
  const [note, setNote] = useState("");
  const [title,setTitle] = useState("")
  const [noteFontSize, setNoteFontSize] = useState(20);
  const [maxChars, setMaxChars] = useState(500);
  const [saveLoading,setSaveLoading] = useState(false)
  const [newNote,setNewNote] = useState(true)
  const [noteId,setNoteId] = useState()
  const handleNoteChange = (e: any) => {
    if (e.target.value.length < maxChars) {
      setNote(e.target.value);
    } else {
      alert("You have reached the maximum number of characters allowed");
    }
  };
  const handleFontIncrease = () => {
    setNoteFontSize(noteFontSize + 1);
  };
  const handleFontDecrease = () => {
    setNoteFontSize(noteFontSize - 1);
  };

  useEffect(()=>{
    if(newNote){
    setNoteId(uidgen.generateSync())
    setNewNote(false)
  }
  },[newNote])

  useEffect(()=>{
    console.log("effect")
    if(note.length>10){
      setSaveLoading(true)
        setNote(note.replaceAll(":)","😀").replaceAll("..","● ").replaceAll("@ss","\n----------------------------------\n"))
        if(note.includes("~clr")){
          
          setNote("")
        }
        if(note.includes("&next")){
          setNote("") 
          setTitle("")
          setNewNote(true)
        }
        const reqData = {
          title,
          content:note,
          uid:noteId,
          userUid:localStorage.getItem("uid")

        }
        axios.post("/api/note",reqData).then((res)=>{
          if(res.status === 200){
            console.log("Note Saved")
            setTimeout(()=>{
              setSaveLoading(false)
            },400)
          }
        })
    }
  },[note,title,noteId])
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <span
            style={{
              fontWeight: "500",
              fontSize: "1.2rem",
              marginRight: "1rem",
            }}
          >
            What&apos;s on your mind?
          </span>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'0.4rem'}}>
            <TextField
            placeholder="Title"
            style={{ width: "40vw",fontSize:"5rem" }}
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}

            />
          <TextField
            style={{ width: "40vw",fontSize:"5rem" }}
            value={note}
            InputProps={{ style: { fontSize: noteFontSize } }}
            InputLabelProps={{ style: { fontSize: noteFontSize } }}
            multiline
            placeholder="Write your note here"
            rows={7}
            onChange={handleNoteChange}
          />
         
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SpeedDial
            ariaLabel="SpeedDial"
            icon={<SpeedDialIcon />}
            direction="right"
          >
            <SpeedDialAction
              icon={<TextIncreaseIcon />}
              onClick={handleFontIncrease}
              tooltipTitle={"+"}
            />
            <SpeedDialAction
              icon={<TextDecreaseIcon />}
              onClick={handleFontDecrease}
              tooltipTitle={"-"}
            />
            <SpeedDialAction key={"key"} tooltipTitle={"edit"} />
          </SpeedDial>
        
          <div>{note.length}/500 &nbsp;   {saveLoading?<CircularProgress size={30}/>:<span style={{fontSize:'0.8rem'}}><DoneRoundedIcon/></span>}</div>
        </div>
      </div>
    </div>
  );
}
