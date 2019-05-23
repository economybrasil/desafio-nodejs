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

function salvar(medico, setLoading, setError) {
	const method = medico._id ? "post" : "put";

	axios[method](`http://localhost:4000/medicos${medico._id ? `/${medico._id}` : ""}`, medico)
		.then(result => {
			setLoading(false);
		})
		.catch(error => {
			setError(error);
			setLoading(false);
		});
}

function Medicos({
	classes,
	history,
	match: {
		params: { id }
	}
}) {
	const [medico, setMedico] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) {
			setMedico({ nome: "", crm: "", especialidades: [] });
			setLoading(false);
			return;
		}

		axios
			.get(`http://localhost:4000/medicos/${id}`)
			.then(result => {
				setMedico(result.data);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			});
	}, []);

	if (!medico) {
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
			<Typography variant="display1"> {medico.nome} </Typography>

			<p>
				<TextField
					id="standard-name"
					label="Name"
					className={classes.textField}
					value={medico.nome}
					onChange={({ target: { value: nome } }) => setMedico({ ...medico, nome })}
					margin="normal"
				/>

				<TextField
					id="standard-crm"
					label="CRM"
					className={classes.textField}
					value={medico.crm}
					onChange={({ target: { value: crm } }) => setMedico({ ...medico, crm })}
					margin="normal"
				/>
			</p>

			<EspecialidadesGrid
				especialidades={medico.especialidades}
				onEspecialidadesChange={especialidades => setMedico({ ...medico, especialidades })}
			/>
			<div style={{ paddingTop: 16 }}>
				<Button
					variant="contained"
					onClick={() => salvar(medico, setLoading, setError)}
					color="primary"
					className={classes.button}
				>
					Salvar
				</Button>
			</div>
		</>
	);
}

export default withStyles(styles)(Medicos);
