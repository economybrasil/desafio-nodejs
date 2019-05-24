import React, { useEffect, useState } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import Button from "@material-ui/core/Button";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => ({
	root: {
		width: "100%",
		marginTop: theme.spacing.unit * 3,
		overflowX: "auto"
	},
	table: {
		minWidth: 700
	}
});

function Consultorios({ classes, history }) {
	const [consultorios, setConsultorios] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios
			.get("http://localhost:4000/consultorios")
			.then(result => {
				setConsultorios(result.data);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			});
	}, []);

	return (
		<>
			{" "}
			<div style={{ paddingBottom: 16 }}>
				<Typography variant="display1"> Consultórios </Typography>
			</div>
			{loading ? <LinearProgress /> : null}
			<Button
				variant="contained"
				onClick={() => history.push(`/consultorios/novo`)}
				color="primary"
				className={classes.button}
			>
				Novo
			</Button>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Nome</TableCell>
						<TableCell align="center"># Especialidades</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{consultorios.map(row => (
						<TableRow key={row._id} onClick={() => history.push(`/consultorios/${row._id}`)}>
							<TableCell component="th" scope="row">
								{row.nome}
							</TableCell>
							<TableCell align="center">{row.especialidades.length || 0} especialidade(s)</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}

export default withStyles(styles)(Consultorios);
