import type { NextPage } from 'next'
import React,{ useState, useEffect } from 'react'
import CreateNote from '../src/components/Note/CreateNote'
import Notes from "../src/components/Note/Notes"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
const UIDGenerator = require('uid-generator');
import { Container } from '@mui/material'
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




  return (
    <div>
       <Head>
         Next Note
       </Head>
       <Container maxWidth="sm">
       <div style={{marginTop:'10vh'}}>
       <CreateNote/>
       </div>
       </Container>
       <Container maxWidth="sm">
       <div style={{marginTop:'4vh'}}>
       <Notes/>
       </div>
       </Container>
    </div>
  )
}

export default Home
