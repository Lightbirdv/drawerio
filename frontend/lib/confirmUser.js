import axios from "axios";
import Router from "next/router";
import { notify } from "../components/ConfirmComponent";

export function confirmUser(hash) {
	console.log(hash);
	const { data } = axios
		.post(`http://localhost:5000/user/confirmation/${hash}`)
		.then((response) => {
			console.log(response);
			if (response.status === 200) {
				notify("Thanks, Your email has been confirmed");
				Router.push("/login");
			} else {
				notify("Unfortunately the Account could not be activated");
			}
		});
}
