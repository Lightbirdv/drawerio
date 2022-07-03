import ConfirmComponent from '../components/ConfirmComponent';
import PrivateComponent from "../components/PrivateComponent"
import Navbar from "../components/NavbarThree";

export default function confirmPage() {
    return <div>
        <main>
            <Navbar />
            <PrivateComponent />
            <ConfirmComponent />
        </main>
    </div>
}