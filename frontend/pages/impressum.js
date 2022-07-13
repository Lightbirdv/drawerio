import PrivateComponent from "../components/PrivateComponent"
import Navbar from "../components/NavbarThree";
import ImpressumComponent from "../components/ImpressumComponent";

export default function impressum() {
    return <div>
        <main>
            <Navbar />
            <PrivateComponent />
            <ImpressumComponent/>
        </main>
    </div>
}