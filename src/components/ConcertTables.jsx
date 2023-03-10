import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData("Eclair", 262, 16.0, 24, 6.0),
	createData("Cupcake", 305, 3.7, 67, 4.3),
	createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

export default function ConcertTables({ headers, data }) {
	const classes = useStyles();

	const getHeader = () => {
		return headers.map((header) => {
			return <StyledTableCell>{header}</StyledTableCell>;
		});
	};
	console.log("dataa ", data[0].concert.value);
	const getData = () => {
		return data.map((d) => (
			<StyledTableRow key={d.name}>
				<StyledTableCell component="th" scope="row">
					{d.concert.value}
				</StyledTableCell>
				<StyledTableCell align="left">{d.date.value}</StyledTableCell>
				<StyledTableCell align="left">
					{d.location.value}
				</StyledTableCell>
				<StyledTableCell align="left">
					{d.singer.value}
				</StyledTableCell>
			</StyledTableRow>
		));
	};

	return (
		<TableContainer component={Paper} style={{marginTop: '50px'}}>
			<h1>List Concerts</h1>
			<Table className={classes.table} aria-label="customized table">
				<TableHead>
					<TableRow>{getHeader()}</TableRow>
				</TableHead>
				<TableBody>{getData()}</TableBody>
			</Table>
		</TableContainer>
	);
}
