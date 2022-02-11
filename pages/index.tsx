import type { NextPage } from 'next'
import NoteView from '../src/components/Note/NoteView'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
       <Head>
         Next Note
       </Head>
       <div style={{display:'flex',justifyContent:'center',marginTop:'30vh'}}>
       <NoteView/>
       </div>
    </div>
  )
}

export default Home
