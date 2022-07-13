import Navbar from "../components/Navbar";
import PrivateComponent from "../components/PrivateComponent"

export default function confirmForgettPW() {
    return <div>
        <main>
            <Navbar />
            <PrivateComponent />
            <forgettConfirmPasswordComponent />
        </main>
    </div>
}