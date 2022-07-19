import PrivateComponent from "../components/PrivateComponent"
import Navbar from "../components/NavbarTwo";
import AxiosPost from "../components/AxiosPost";
export default function Drawer(){
    return <div>
    <main>

    <Navbar />
    <PrivateComponent/>
    <AxiosPost />

  </main>
  </div>
}