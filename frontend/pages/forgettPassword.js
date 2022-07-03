import PrivateComponent from "../components/PrivateComponent"
import Navbar from "../components/NavbarThree";
import ForgettPasswordComponent from '../components/ForgettPasswordComponent';

export default function forgettPassword() {
    return <div>
        <main>
            <Navbar />
            <PrivateComponent />
            <ForgettPasswordComponent />
        </main>
    </div>
}