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

function Especialidades({ classes, history }) {
	const [especialidades, setEspecialidades] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios
			.get("http://localhost:4000/especialidades")
			.then(result => {
				setEspecialidades(result.data);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			});
	}, []);

	return (
		<>
			<div style={{ paddingBottom: 16 }}>
				<Typography variant="display1"> Especialidades </Typography>
			</div>
			{loading ? <LinearProgress /> : null}
			<Button
				variant="contained"
				onClick={() => history.push(`/especialidades/novo`)}
				color="primary"
				className={classes.button}
			>
				Novo
			</Button>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Nome</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{especialidades.map(row => (
						<TableRow key={row._id} onClick={() => history.push(`/especialidades/${row._id}`)}>
							<TableCell component="th" scope="row">
								{row.nome}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}

export default withStyles(styles)(Especialidades);
