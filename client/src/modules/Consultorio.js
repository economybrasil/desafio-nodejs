import React, { useEffect, useState } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import EspecialidadesGrid from "./EspecialidadesGrid";

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

function salvar(consultorio, setLoading, setError) {
	const method = consultorio._id ? "post" : "put";

	axios[method](`http://localhost:4000/consultorios${consultorio._id ? `/${consultorio._id}` : ""}`, consultorio)
		.then(result => {
			setLoading(false);
		})
		.catch(error => {
			setError(error);
			setLoading(false);
		});
}

function Consultorios({
	classes,
	history,
	match: {
		params: { id }
	}
}) {
	const [consultorio, setConsultorio] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) {
			setConsultorio({ nome: "", especialidades: [] });
			setLoading(false);
			return;
		}
		axios
			.get(`http://localhost:4000/consultorios/${id}`)
			.then(result => {
				setConsultorio(result.data);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			});
	}, []);

	if (!consultorio) {
		return (
			<>
				{loading ? <LinearProgress /> : null}
				<Typography variant="subheading"> Consultório </Typography>
			</>
		);
	}

	return (
		<>
			{loading ? <LinearProgress /> : null}
			<Typography variant="subheading"> Consultório </Typography>
			<Typography variant="display1"> {consultorio.nome} </Typography>

			<p>
				<TextField
					id="standard-name"
					label="Name"
					className={classes.textField}
					value={consultorio.nome}
					onChange={({ target: { value: nome } }) => setConsultorio({ ...consultorio, nome })}
					margin="normal"
				/>
			</p>

			<EspecialidadesGrid
				especialidades={consultorio.especialidades}
				onEspecialidadesChange={especialidades => setConsultorio({ ...consultorio, especialidades })}
			/>
			<div style={{ paddingTop: 16 }}>
				<Button
					variant="contained"
					onClick={() => salvar(consultorio, setLoading, setError)}
					color="primary"
					className={classes.button}
				>
					Salvar
				</Button>
			</div>
		</>
	);
}

export default withStyles(styles)(Consultorios);
