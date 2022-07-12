import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/router";
import { MdLogout } from "react-icons/md";
import { MdBackspace } from "react-icons/md";
import { newName } from "../lib/getname";

const welcome = () => {
	const a = newName();
	if (a !== "") {
		return "Welcome " + a + "!";
	} else {
		return "";
	}
};

function clearx() {
	/* localStorage.clear(); */
	localStorage.removeItem('Key');
	localStorage.removeItem('src');
	localStorage.removeItem('emailx');
	localStorage.removeItem('token');
	localStorage.removeItem('drawer_id');
	localStorage.removeItem('_id');
	localStorage.removeItem('drawerName');

}

function NavLink({ to, children }) {
	return (
		<a href={to} className={`mx-4`}>
			{children}
		</a>
	);
}


export default function Navbar() {
	const router = useRouter();

	const [open, setOpen] = useState(false);
	return (
		<nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center">
			{/*  <MobileNav open={open} setOpen={setOpen} /> */}
			<div className="w-3/12 flex items-center ml-28">
				<a className="text-2xl font-semibold" href="/">
					<img src="assets/logo.jpg" className="img-logo" style={{ marginRight: "15px", maxHeight: "130px" }} />
				</a>
				<a className="text-2xl font-semibold text-blue-800 hover:no-underline" href="/">
					Drawer.io
				</a>
			</div>

			<div className="w-9/12 flex justify-end items-center">
				<div
					className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
					onClick={() => {
						setOpen(!open);
					}}
				>
					<span
						className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`}
					/>
					<span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
					<span
						className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`}
					/>
				</div>

				<div className="hidden md:flex items-center mr-20">
					<b className="text-gray-600" id="a" style={{ fontSize: "25px" }}>
						{welcome()}
					</b>
					<NavLink to="/">
						<button
							type="button"
							className="flex flex-row text-text py-2.5 px-2.5 w-max-content items-center justify-center gap-2 hover:no-underline"
							onClick={clearx}
							style={{ color: "black", padding: "10px", borderRadius: "15px" }}
						>
							Logout<MdLogout />
						</button>{" "}
					</NavLink>
				</div>
			</div>
		</nav>
	);
}
