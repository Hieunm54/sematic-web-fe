import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {FcSearch} from 'react-icons/fc';

function App() {
  const [header, setHeader] = useState([]);
	const [data, setData] = useState();

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.post(
				"http://localhost:3030/ds/query",
				new URLSearchParams({
					query: "PREFIX : <http://example.org/schemas/test#>\nPREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\nPREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n\nSELECT ?concert ?date ?location ?singer\nWHERE {\n  ?concert rdf:type :Concert ;\n           :concertDate ?date ;\n           :concertLocation ?loc .\n  ?loc :location ?location .\n  ?concert :concertSingers ?singer .\n}",
				})
			);
			setData(response.data.results.bindings);
			setHeader(response.data.head.vars);
		};

		fetchData();
	}, []);
	console.log("data ", data, header)
	return <div className="App">
		<div className="search-div">
			<input className="search-input"></input>
			<button><FcSearch /></button>
		</div>
	</div>;
}

export default App;
