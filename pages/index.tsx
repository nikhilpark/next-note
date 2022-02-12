import type { NextPage } from 'next'
import React,{ useState, useEffect } from 'react'
import NoteView from '../src/components/Note/NoteView'
import Note,{NoteProps} from "../src/components/Note/Note"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator();
const Home: NextPage = () => {

  const [verifyLoading,setVerifyLoading] = useState(true)
  const [notes,setNotes] = useState([])
  const addUser = async () => {
    console.log("---addUser---")
    const reqData = {
      uid: uidgen.generateSync(),
    }
    axios.post("/api/user/new",reqData).then((res)=>{
      if(res.status === 200){
        console.log("---addUser 200---")
        localStorage.setItem("uid",res.data.uid)
        setVerifyLoading(false)
      }
    })
  }

  const verifyUser = async () => {
    console.log("--verify user--")

    if(localStorage.getItem('uid')){
      console.log("---local uid found ----")
      axios.post("/api/user/verify",{uid:localStorage.getItem("uid")}).then((res)=>{
        if(res.data.verified){
          console.log("--- verify api verified ----")
          localStorage.setItem("userVerified","true")
          setVerifyLoading(false)
        } else{
          console.log("--- verify api add user ----")
          addUser()
        }
      })
    } else {
      console.log("---local uid not found ----")
      addUser()
    }
  }



  useEffect(()=>{
      verifyUser()
  },[])

  useEffect(()=>{
    axios.post("/api/note/usernotes",{uid:localStorage.getItem("uid")}).then((res)=>{
      if(res.status === 200){
        setNotes(res.data.notes)
      }
    })
  })


  return (
    <div>
       <Head>
         Next Note
       </Head>
       <div style={{display:'flex',justifyContent:'center',marginTop:'30vh'}}>
       <NoteView/>
       </div>
       {notes.length>0?
          <div style={{display:'flex',gap:'1rem',justifyContent:'center'}}>
            {notes.map((note:NoteProps,key)=>{
              return <Note title={note.title} content={note.content} key={key}/>
            })}
         </div>:null}
       <div>

       </div>
    </div>
  )
}

export default Home
