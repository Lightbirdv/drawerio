import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useRouter } from 'next/router';
import { MdLogout } from "react-icons/md";
import { MdBackspace } from "react-icons/md";
import { newName } from '../lib/getname';



const welcome = () => {
const a = newName();
    if (a !== "") {
        return "Welcome " + a + "!"
    }
    else {
        return ""
    }
}


function clearx() {
    localStorage.clear();
}


function NavLink({ to, children }) {
    return <a href={to} className={`mx-4`}>
        {children}
    </a>
}

export default function Navbar() {
    const router = useRouter();

    const [open, setOpen] = useState(false)
    return (
        <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center">
            {/* <MobileNav open={open} setOpen={setOpen} /> */}
            <div className="w-3/12 flex items-center ml-28">
                <a className="text-2xl font-semibold" href="/"><img src="assets/logo.jpg" className="img-logo" style={{marginRight: "15px", maxHeight: "130px"}}/></a>
                <a className="text-2xl font-semibold text-blue-800 hover:no-underline" href="/">Drawer.io</a>
            </div>
        </nav>
    )
}