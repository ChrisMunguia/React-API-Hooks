import React, { useEffect, useState } from "react";

function AlbumList({ user = {} }) {
	const [albumList, setAlbumList] = useState([]);

	useEffect(() => {
		setAlbumList([]);

		const abortController = new AbortController();
		async function loadAlbums() {
			try {
				const response = await fetch(
					`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`,
					{ signal: abortController.signal },
				);
				const albumsFromAPI = await response.json();
				setAlbumList(albumsFromAPI);
				document.title = "Awesome Album App";
			} catch (error) {
				if (error.name === "AbortError") {
					console.log("Aborted", error);
				} else {
					throw error;
				}
			}
		}

		if (user.id) {
			loadAlbums();
			return () => abortController.abort();
		}
	}, [user]);

	const displayAlbumList = (
		<div>
			<h2>{user.name} Albums</h2>
			<ul>
				{albumList.map((album, index) => (
					<li key={index}>
						{album.id} - {album.title}
					</li>
				))}
			</ul>
		</div>
	);

	return <div>{user.id ? displayAlbumList : <p>Please click on a user name to the left</p>}</div>;
}

export default AlbumList;
