import React, { useEffect, useState } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";

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

function Medicos({ classes, history }) {
	const [medicos, setMedicos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios
			.get("http://localhost:4000/medicos")
			.then(result => {
				setMedicos(result.data);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			});
	}, []);

	return (
		<>
			{loading ? <LinearProgress /> : null}
			<Button
				variant="contained"
				onClick={() => history.push(`/medicos/novo`)}
				color="primary"
				className={classes.button}
			>
				Novo
			</Button>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Nome</TableCell>
						<TableCell align="center">CRM</TableCell>
						<TableCell align="center"># Especialidades</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{medicos.map(row => (
						<TableRow key={row._id} onClick={() => history.push(`/medicos/${row._id}`)}>
							<TableCell component="th" scope="row">
								{row.nome}
							</TableCell>
							<TableCell align="center">{row.crm}</TableCell>
							<TableCell align="center">{row.especialidades.length || 0} especialidade(s)</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}

export default withStyles(styles)(Medicos);
