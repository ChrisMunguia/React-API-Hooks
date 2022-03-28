import React, { useState } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";
import { useEffect } from "react";

function App() {
	const [users, setUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		const originalTitle = document.title;
		document.title = "Awesome Album App";
		setUsers([]);

		const abortController = new AbortController();

		async function loadUsers() {
			try {
				const response = await fetch("https://jsonplaceholder.typicode.com/users", {
					signal: abortController.signal,
				});
				const usersFromAPI = await response.json();
				setUsers(usersFromAPI);
			} catch (error) {
				if (error.name === "AbortError") {
					console.log("Aborted", error);
				} else {
					throw error;
				}
			}
		}
		loadUsers();

		return () => {
			document.title = originalTitle;
			abortController.abort();
		};
	}, []);

	// Load data from https://jsonplaceholder.typicode.com/albums?userId=${user.id}

	return (
		<div className="App">
			<div className="left column">
				<UserList users={users} setCurrentUser={setCurrentUser} />
			</div>
			<div className="right column">
				<AlbumList user={currentUser} />
			</div>
		</div>
	);
}

export default App;
