'use client';
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import useJhon from "./hooks/useJhon"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSession } from "next-auth/react";
import SidebarComponent from './components/sidebar_component';
const inter = Inter({ subsets: ['latin'] })





export default function Home() {
  const [jhon, setJhon] = useState([])
  const { data } = useSession();


  return (
    <>
    <SidebarComponent name={data?.user?.name}/>
    {/* <h1 >{data?.user?.name}</h1> */}
      
    </>
  )
}
