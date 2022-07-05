import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';



function NavLink({to, children}) {
    return <a href={to} className={`mx-4`}>
        {children}
    </a>
}

/* function MobileNav({open, setOpen}) {
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20">
            <a className="text-2xl font-semibold" href="/"><img src="assets/logo.jpg" className="img-logo" style={{marginRight: "15px", maxHeight: "130px"}}/></a>
            </div>
            <div className="hidden md:flex">
                    <NavLink to="/login">
                    <button className="x">Login</button>
                    </NavLink>
                    <NavLink to="/registration">
                    <button className="y">Sign Up</button>
                    </NavLink>
                </div>
        </div>
    )
}
 */
export default function Navbar() {

    const [open, setOpen] = useState(false)
    return (
        <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center">
            {/* <MobileNav open={open} setOpen={setOpen}/> */}
            <div className="w-3/12 flex items-center ml-28">
                <a className="text-2xl font-semibold" href="/"><img src="assets/logo.jpg" className="img-logo" style={{marginRight: "15px", maxHeight: "130px"}}/></a>
                <a className="text-2xl font-semibold text-blue-800 hover:no-underline" href="/">Drawer.io</a>
            </div>

            <div className="w-9/12 flex justify-end items-center">

                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                   
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>

                <div className="hidden md:flex items-center mr-20">
                    <NavLink to="/login">
                    <button className="bg-white w-36 h-10 border-2 border-blue-800 text-blue-800 rounded text-xl">Login</button>
                    </NavLink>
                    <NavLink to="/registration">
                    <button className="bg-blue-800 w-36 h-10 text-white rounded text-xl">Sign Up</button>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}