import React, { useEffect, useState } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
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

function salvar(especialidade, history, setEspecialidade, setLoading, setError) {
	const method = especialidade._id ? "post" : "put";

	axios[method](
		`http://localhost:4000/especialidades${especialidade._id ? `/${especialidade._id}` : ""}`,
		especialidade
	)
		.then(result => {
			if (!especialidade._id) {
				if (result.data._id) {
					history.push(`/especialidades/${result.data._id}`);
					setEspecialidade(result.data);
				}
			}
			setLoading(false);
		})
		.catch(error => {
			setError(error);
			setLoading(false);
		});
}

function Especialidades({
	classes,
	history,
	match: {
		params: { id }
	}
}) {
	const [especialidade, setEspecialidade] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) {
			setEspecialidade({ nome: "", crm: "", especialidades: [] });
			setLoading(false);
			return;
		}

		axios
			.get(`http://localhost:4000/especialidades/${id}`)
			.then(result => {
				setEspecialidade(result.data);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			});
	}, []);

	if (!especialidade) {
		return (
			<>
				{loading ? <LinearProgress /> : null}
				<Typography variant="subheading"> Especialidade </Typography>
			</>
		);
	}

	return (
		<>
			{loading ? <LinearProgress /> : null}

			<div style={{ marginTop: 16 }} />

			<Typography variant="subheading"> Especialidade </Typography>
			<Typography variant="display1"> {especialidade.nome} </Typography>

			<p>
				<TextField
					id="standard-name"
					label="Name"
					className={classes.textField}
					value={especialidade.nome}
					onChange={({ target: { value: nome } }) => setEspecialidade({ ...especialidade, nome })}
					margin="normal"
				/>
			</p>

			<div style={{ paddingTop: 16 }}>
				<Button onClick={() => history.replace("/especialidades")} className={classes.button}>
					Voltar
				</Button>
				<span> </span>
				<Button
					variant="contained"
					onClick={() => salvar(especialidade, history, setEspecialidade, setLoading, setError)}
					color="primary"
					className={classes.button}
				>
					Salvar
				</Button>
			</div>
		</>
	);
}

export default withStyles(styles)(Especialidades);
