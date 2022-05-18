import PrivateComponent from "../components/PrivateComponent"
import Navbar from "../components/NavbarTwo";
import UserManagement from "../components/userManagementComponent";
export default function Userpage(){
    return <div>
    <main>

    <Navbar />
    <PrivateComponent/>
    <UserManagement />

  </main>
  </div>
}