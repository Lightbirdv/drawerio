import PrivateComponent from "../components/PrivateComponent"
import Navbar from "../components/NavbarThree";
import DatenschutzComponent from "../components/DatenschutzComponent";

export default function datenschutz() {
    return <div>
        <main>
            <Navbar />
            <PrivateComponent />
            <DatenschutzComponent />
        </main>
    </div>
}