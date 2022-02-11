import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
export default function NoteView() {
  const [note, setNote] = useState("");
  const [noteFontSize, setNoteFontSize] = useState(20);
  const [maxChars, setMaxChars] = useState(500);
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
    console.log("effect")
    if(note.length>0){
        setNote(note.replaceAll(":)","😀").replaceAll("..","● ").replaceAll("@ss","\n----------------------------------\n"))
        if(note.includes("~clr")){
            setNote("")
        }
        if(note.includes("&next")){
            alert("new note")
        }
    }
  },[note])
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
          <div>{note.length}/500</div>
        </div>
      </div>
    </div>
  );
}
