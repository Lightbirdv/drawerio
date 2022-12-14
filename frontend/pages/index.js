import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Container } from "react-bootstrap";
import TopComponent from '../components/TopComponent';
import AboutComponent from "../components/AboutComponent";
import ContactComponent from "../components/ContactComponent";
import ServiceComponent from "../components/ServiceComponent";
import Navbar from '../components/Navbar';
import ModalConfirm from '../components/ModalConfirm';




export default function Home() {
  return (
    <div >
      <Head>
        <title>Drawer.io</title>
        <link rel="icon" href="/assets/logo.jpg" />

        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        />
      </Head>


      <main>

        <Navbar />
        <ModalConfirm />
        <TopComponent />
        <ServiceComponent />
        <AboutComponent />
        <ContactComponent />

        {/* <LoginComponent/> */}

      </main>
      <footer className="footer bg-blue-800">
        <h5>Drawer.io - Impressum &copy; Vico, Abdullah, Timothy</h5>
        <script
        /* src="https://unpkg.com/react/umd/react.production.min.js"
        crossOrigin */
        ></script>

        <script
        /* src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
        crossOrigin */
        ></script>

        <script
        /* src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossOrigin */
        ></script>
      </footer>
    </div>



  )
}
