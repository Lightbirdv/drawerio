import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Container } from "react-bootstrap";
import TopComponent from '../components/TopComponent';
import AboutComponent from "../components/AboutComponent";
import ContactComponent from "../components/ContactComponent";
import DownloadComponent from "../components/DownloadComponent";
import ServiceComponent from "../components/ServiceComponent";

export default function Home() {
  return (
    <div >
      <Head>
        <title>Drawer.io - Landign Page</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossorigin="anonymous"
        />
        {/* <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
          crossorigin="anonymous"
        ></link> */}
      </Head>


      <main>
        {/* Container as Bootstrap test 
        <Container>
          <h1>HomePage</h1>
        </Container>*/}

        {/* Sehr wichtig, Componenten hier einfügen */}
        <TopComponent />
        <ServiceComponent />
        <AboutComponent />
        <DownloadComponent />
        <ContactComponent />

      </main>
      <footer className="footer">
        <h5>Drawer.io - Impressum &copy; Vico, Abdullah, Timothy</h5>
        <script
          src="https://unpkg.com/react/umd/react.production.min.js"
          crossorigin
        ></script>

        <script
          src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
          crossorigin
        ></script>

        <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossorigin
        ></script>
      </footer>
    </div>



  )
}
