import PrivateComponent from "../components/PrivateComponent"
import Navbar from "../components/NavbarTwo";
/* import AxiosPost from "../components/AxiosPost"; */
import AxiosPost from "../components/adminPageComponent";
export default function Adminpage(){
    return <div>
    <main>

    <Navbar />
    <PrivateComponent/>
    <AxiosPost />

  </main>
  </div>
}