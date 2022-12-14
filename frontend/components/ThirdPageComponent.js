import React, { useEffect, useState, useReducer } from "react";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Router from "next/router";
import { useRouter } from "next/router";
import { entryDelete } from "../lib/entryDelete";
import dayjs from "dayjs";
import { MdDeleteForever } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdArrowCircleDown } from "react-icons/md";
import FullPic from "./fullPic";
import { Col, Container, Row } from "react-bootstrap";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { downloadText } from "../lib/downloadText";
import { Image } from "react-bootstrap";




const ThirdPage = () => {
	const [state, setState] = useState({
		drawerName: "",
		newName: "",
		dime: "",
		userID: "",
	});

	const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

	const [showDelete, setShowDelete] = useState(false);
	const handleCloseDelete = () => setShowDelete(false);
	const handleDeleteShow = () => setShowDelete(true);

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showUpd, setShowUpd] = useState(false);
	const handleCloseUpd = () => setShowUpd(false);
	const handleShowUpd = () => setShowUpd(true);

	const handleChange = (event) => {
		setState({ [event.target.name]: event.target.value });
		console.log(event.target.name);
	};

	const handleSubmit = (event) => {
		const { drawerName } = state;
		console.log(drawerName);
		addDrawer(localStorage.getItem("token"), drawerName);
	};

	const handleUpdate = (e, _id) => {
		const { newName, dime, userID } = state;
		e.preventDefault();
		console.log(newName, dime, userID, _id);
		updateDrawer(newName, dime, userID, _id);
	};

	const deleteDrawer = (e, _id) => {
		e.preventDefault();
		console.log(_id);
		entryDelete(_id);
		forceUpdate();
	};

	const showPicture = (e, src_id) => {
		e.preventDefault();
		console.log(src_id);

		const src = localStorage.setItem("src", src_id);
		/* FullPic() */
		Router.push("/showfullpic");
	};

	const [posts, setPosts] = useState({ blogs: [] });

	useEffect(() => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("token"),
		};

		const fetchPostList = async () => {
			const { data } = await axios(process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_API_PORT+"drawerentry/all/" + localStorage.getItem("drawer_id"), {
				headers: headers,
			});
			setPosts({ blogs: data });
			console.log(data);
		};
		fetchPostList();
	}, [reducerValue]);

	/* Searchinput */
	const [searchTerm, setSearchTerm] = useState("");

	const saveDrawerEntry = (e, _id) => {
		e.preventDefault();
		console.log(_id);
		localStorage.setItem("entry_id", _id);
	};

	/* DownloadText */

	const Text = (e) => {
		e.preventDefault();
		/* 	console.log(_id); */
		downloadText();
		forceUpdate();
	};


	const downloadTxtFile = (text) => {
		const element = document.createElement("a");
		const file = new Blob([text],
			{ type: 'text/plain;charset=utf-8' });
		element.href = URL.createObjectURL(file);
		element.download = "website_content.txt";
		document.body.appendChild(element);
		element.click();
	}




	return (
		<div className="flex flex-column m-auto w-4/6">
			{/* <Row className="my-8">
				<Col>
					<span> */}
			<div className="flex flex-row items-center mb-12 mt-12">
				<input
					className="mr-2"
					type="text"
					placeholder="Search..."
					onChange={(event) => {
						setSearchTerm(event.target.value);
					}}
					style={{
						width: "300px",
						height: "35px",
						paddingLeft: "10px",
						fontSize: "15px",
						borderRadius: "10px",
					}}
				/>
			</div>
			{/* </span>
				</Col>
			</Row> */}
			<React.Fragment>
				<Timeline position="alternate" style={{ padding: 0 }}>
					{posts.blogs &&
						posts.blogs.filter((w) => {
							<div key={w.id}></div>
							const keys = ["comment", "originurl", "seltext"]
							if (searchTerm == "") {
								return w
							} else if (keys.some((key) => w[key].toLowerCase().includes(searchTerm.toLowerCase())) || dayjs(w.creationdate).format('MMM, D, YYYY').toLowerCase().includes(searchTerm.toLowerCase())) {
								return w
							}
						}
						)
							.map((item) => (
								<div key={item.id}>
									<TimelineItem>
										<TimelineOppositeContent className="text-text" style={{ flex: 0.1, paddingLeft: 0 }}>
											{dayjs(item.creationdate).format("MMM, D, YYYY")}
										</TimelineOppositeContent>
										<TimelineSeparator>
											<TimelineDot style={{ backgroundColor: "#3CDDC0" }} />
											<TimelineConnector />
										</TimelineSeparator>
										<TimelineContent>
											<span key={item.id}>
												<Row>
													<Col>
														<span className="text-text text-2xl mb-4">{item.comment}</span>
													</Col>
												</Row>

												<Row>
													<Col>
														<span>{item.seltext}</span>
													</Col>
												</Row>

												<Row>
													<Col>
														<span>
															<a href={item.originurl}>{item.originurl}</a>
														</span>
													</Col>
												</Row>

												<Row>
													<Col>
														<span>
															<div className="grid grid-cols-4 gap-2">
																{item.imageurl &&
																	item.imageurl.map((x) => (
																		<div key={x+"hallo"} className="relative">

																			<Image alt="drawerLogo" src={x} className="p-2 bg-white hover:shadow rounded-xl" style={{ float: "left", width: "300px", height: "200px", objectFit: "cover" }} onClick={(e) => showPicture(e, x)} />

																			{/* </div> */}
																		</div>
																	))}
															</div>
														</span>
													</Col>
												</Row>

												<Row>
													<Col>
														<span>
															<div className="grid grid-cols-3 gap-2">
																{item.videourl &&
																	item.videourl.map((y) => (
																		<div key={y+"hayxcyxc"} className="relative">
																			{/* <div className="absolute inset-0 z-10 flex transition duration-300 ease-in hover:opacity-0">
                            <div className="absolute inset-0 bg-black opacity-30"> </div> */}

																			<iframe
																				style={{ float: "left", width: "300px", height: "200px", objectFit: "cover" }}
																				/* width="300"
				  height="200" */
																				/* src={`https://www.youtube.com/embed/${(y).split("v=")[1]}`} */
																				src={y}
																				title="YouTube video player"
																				frameBorder="0"
																				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
																				allowFullScreen
																			></iframe>
																		</div>
																		/*  </div> */
																	))}
															</div>
														</span>
													</Col>
												</Row>

												<Row style={{ margin: "10px", padding: "10px", textAlign: "right" }}>
													<Col>

														<button type="button"
															className="btn btn-success"
															style={{ marginRight: "10px", borderRadius: "15px" }} onClick={(e) => {
																downloadTxtFile(item.websitecontent)
															}}
														>
															<MdArrowCircleDown /></button>
														<button
															type="button"
															className="btn btn-danger"
															style={{ borderRadius: "15px" }}
															onClick={(e) => {
																saveDrawerEntry(e, item.drawerentry_id);
																handleDeleteShow();
															}}
														>
															<MdDeleteForever />
														</button>
														<Modal show={showDelete} onHide={handleCloseDelete}>
															<Modal.Header closeButton>
																<Modal.Title>Delete Entry</Modal.Title>
															</Modal.Header>
															<Modal.Body>Are you sure you want to permanently delete ?</Modal.Body>
															<Modal.Footer>
																<Button variant="secondary" onClick={handleCloseDelete} style={{ borderRadius: "15px" }}>
																	<MdClose />
																</Button>
																<Button
																	variant="primary"
																	onClick={(e) => {
																		deleteDrawer(e, localStorage.getItem("entry_id"));
																		handleCloseDelete();
																	}}
																	style={{ borderRadius: "15px" }}
																>
																	<MdCheck />
																</Button>
															</Modal.Footer>
														</Modal>
													</Col>
												</Row>
												{/* <Row>
													<Col >
														<span>
															<div>
																<Button onClick={(e) => { downloadTxtFile(item.websitecontent) }}>Download text</Button>
															</div>
														</span>
													</Col>
												</Row> */}
											</span>
										</TimelineContent>
									</TimelineItem>
								</div>
							))}
				</Timeline>
			</React.Fragment>
		</div>
	);
};

export default ThirdPage;
