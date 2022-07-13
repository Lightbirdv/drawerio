import PrivateComponent from "../components/PrivateComponent"
import Navbar from "../components/NavbarThree";
import AGBComponent from "../components/AGBComponent";

export default function agb() {
    return <div>
        <main>
            <Navbar />
            <PrivateComponent />
            <AGBComponent />
        </main>
    </div>
}