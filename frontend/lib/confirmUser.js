import axios from "axios";
import Router from "next/router";

export function confirmUser(hash) {
	console.log(hash);
	const { data } = axios
		.post(`http://localhost:5000/user/confirmation/${hash}`)
		.then((response) => {
			console.log(response);
			if (response.status === 200) {
				Router.push("/login");
			} else {
				alert("Unfortunately the Account could not be activated");
			}
		})
		.catch((e) => {
			alert(e);
		});
}
