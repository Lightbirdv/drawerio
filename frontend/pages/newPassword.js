import PrivateComponent from "../components/PrivateComponent"
import Navbar from "../components/NavbarThree";
import NewPasswordComponent from "../components/NewPasswordComponent";

export default function newPassword() {
    return <div>
        <main>
            <Navbar />
            <PrivateComponent />
            <NewPasswordComponent />
        </main>
    </div>
}