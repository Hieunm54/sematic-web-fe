import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FcSearch } from "react-icons/fc";
import ListSingers from "./components/ListSingers";
import ConcertTables from "./components/ConcertTables";

function App() {
	const [header, setHeader] = useState([]);
	const [data, setData] = useState();
	const [singerData, setSingerData] = useState();
	const [loading, setLoading] = useState(true);
	const [searchText, setSearchText] = useState('');

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
			setLoading(false);
		};

		fetchData();
	}, []);
	
	const onSubmit = async () => {
		const response = await axios.post(
			'http://localhost:3030/ds/',
			new URLSearchParams({
				'query': `PREFIX : <http://example.org/schemas/test#>\nPREFIX  rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n\nSELECT DISTINCT ?singerName ?songName ?musicianName\nWHERE {\n  ?singer rdf:type :Singer ;\n          :singerName ?singerName ;\n          :singerSongs ?song ;\n          :singerGenres ?genre .\n\n  ?song :songName ?songName ;\n        :songAuthor ?musician .\n\n  ?musician :musicianName ?musicianName .\n\n  FILTER(contains(?singerName, "${searchText}")||contains(?songName, "${searchText}")||contains(?musicianName, "${searchText}"))\n}`
			})
		);
		console.log('res', response)
		setSingerData(response.data.results.bindings);
		setLoading(false);
	}

	if(loading) return <div>Loading...</div>;
	else return (
		<div className="App">
			<div>
				<ConcertTables headers={header} data={data} />
			</div>
			<div className="search-div">
				<input className="search-input" onChange={(e) => setSearchText(e.target.value)}></input>
				<button onClick={onSubmit}>
					<FcSearch />
				</button>
			</div>

			<ListSingers passedData={singerData} />
		</div>
	);
}

export default App;
