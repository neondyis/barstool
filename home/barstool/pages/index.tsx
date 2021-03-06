import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Container} from "@nextui-org/react";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Barstool Admin Panel</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

export default Home
