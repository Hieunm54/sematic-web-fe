import axios from "axios";
import React, { useEffect, useState } from "react";
import SingerTables from "./SingerTable";

const ListSingers = () => {
	const [data, setData] = useState();
	const [header, setHeader] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.post(
				"http://localhost:3030/ds/query",
				new URLSearchParams({
					query: "PREFIX : <http://example.org/schemas/test#>\nSELECT ?singerName ?songName ?musicianName\nWHERE {\n  ?singer a :Singer ;\n          :singerName ?singerName ;\n          :singerSongs ?song .\n  ?song :songName ?songName ;\n        :songAuthor ?musician .\n  ?musician :musicianName ?musicianName .\n}",
				})
			);
			setData(response.data.results.bindings);
			setHeader(response.data.head.vars);
			setLoading(false);
		};
		fetchData();
	}, []);

	if(loading) return <div>loading</div>;
	else return (
		<div>
			<h1>ListSingers</h1>
			<div>{console.log("singers ", data)}</div>
			<div>
				<SingerTables headers={header} data={data} />
			</div>
		</div>
	);
};

export default ListSingers;
