import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Windows from "../components/OperationalSystems/Windows/Windows";
// import useEmbedded from "../components/hooks/useEmbedded";


/* export function getStaticProps() {
  return {
      props: {
          numero: Math.random(),
          name: "Estatico",
          description: "Estatico",
          keywords: "Estatico",
      }
  }
} */

export default function Home() {


  return (
    <div className={styles.container}>
      <Head>
        <title>Windows 10 Welcome</title>
        <meta name="description" content="Windows 10 Personal Portfolio" />
        <meta name="keywords" content="Windows 10 Personal Portfolio 3D Javascript SASS SCSS CSS Framework React" />
        
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Windows />      
    </div>
  )
}
