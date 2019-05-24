import React, { useEffect, useState } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import EspecialidadesGrid from "./EspecialidadesGrid";
import MedicosModal from "./MedicosModal";

import Icon from "@mdi/react";
import MuiIcon from "@material-ui/core/Icon";
import { mdiTrashCan } from "@mdi/js";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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

function salvar(consultorio, history, setMedico, setLoading, setError) {
	const method = consultorio._id ? "post" : "put";

	axios[method](`http://localhost:4000/consultorios${consultorio._id ? `/${consultorio._id}` : ""}`, consultorio)
		.then(result => {
			if (!consultorio._id) {
				if (result.data._id) {
					history.push(`/consultorios/${result.data._id}`);
					setMedico(result.data);
				}
			}
			setLoading(false);
		})
		.catch(error => {
			setError(error);
			setLoading(false);
		});
}

function removeMedico(consultorio, medico, setLoading, medicos, setMedicos) {
	setLoading(true);

	axios
		.delete(`http://localhost:4000/consultorios/${consultorio._id}/medicos/${medico._id}`)
		.then(() => {
			setLoading(false);
			setMedicos(medicos.filter(x => x._id !== medico._id));
		})
		.catch(error => {
			setLoading(true);

			let msg = "Não foi possivel salvar";
			if (error && error.response && error.response.data && typeof error.response.data === "string") {
				msg = error.response.data;
			}

			alert(msg);
		});
}

function Medicos({
	classes,
	history,
	match: {
		params: { id }
	}
}) {
	const [consultorio, setMedico] = useState(null);
	const [showModal, toggleModal] = useState(false);
	const [medicos, setMedicos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [tabIndex, setTabIndex] = useState(0);

	useEffect(() => {
		if (!id) {
			setMedico({ nome: "", crm: "", especialidades: [] });
			setLoading(false);
			return;
		}

		axios
			.get(`http://localhost:4000/consultorios/${id}`)
			.then(result => {
				setMedico(result.data);
				setLoading(false);
			})
			.catch(error => {
				setError(error);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		if (!id || showModal) {
			return;
		}

		axios
			.get(`http://localhost:4000/consultorios/${id}/medicos`)
			.then(result => {
				setMedicos(result.data);
			})
			.catch(error => {
				setError(error);
			});
	}, [showModal]);

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
			<Tabs
				value={tabIndex}
				indicatorColor="primary"
				textColor="primary"
				onChange={(_, index) => setTabIndex(index)}
			>
				<Tab label="Dados Médico" />
				<Tab label="Consultórios" disabled={!consultorio._id} />
			</Tabs>
			{loading ? <LinearProgress /> : null}

			<div style={{ marginTop: 16 }} />
			{tabIndex == 0 ? (
				<>
					<Typography variant="subheading"> Médico </Typography>
					<Typography variant="display1"> {consultorio.nome} </Typography>

					<p>
						<TextField
							id="standard-name"
							label="Name"
							className={classes.textField}
							value={consultorio.nome}
							onChange={({ target: { value: nome } }) => setMedico({ ...consultorio, nome })}
							margin="normal"
						/>

						<TextField
							id="standard-crm"
							label="CRM"
							className={classes.textField}
							value={consultorio.crm}
							onChange={({ target: { value: crm } }) => setMedico({ ...consultorio, crm })}
							margin="normal"
						/>
					</p>

					<EspecialidadesGrid
						especialidades={consultorio.especialidades}
						onEspecialidadesChange={especialidades => setMedico({ ...consultorio, especialidades })}
					/>
					<div style={{ paddingTop: 16 }}>
						<Button onClick={() => history.replace("/consultorios")} className={classes.button}>
							Voltar
						</Button>
						<span> </span>
						<Button
							variant="contained"
							onClick={() => salvar(consultorio, history, setMedico, setLoading, setError)}
							color="primary"
							className={classes.button}
						>
							Salvar
						</Button>
					</div>
				</>
			) : (
				<>
					<Typography variant="subheading"> {consultorio.nome} </Typography>
					<Typography variant="title"> Consultórios </Typography>

					<div style={{ paddingTop: 16 }}>
						<Button
							variant="contained"
							onClick={() => toggleModal(true)}
							color="primary"
							className={classes.button}
						>
							Adicionar
						</Button>
					</div>
					<MedicosModal
						open={showModal}
						consultorioId={consultorio._id}
						medicosAtuais={medicos}
						onClose={medico => {
							toggleModal(false);
						}}
					/>

					<div style={{ border: "1px solid #ccc", marginTop: 16 }}>
						<List>
							{medicos.map(medico => (
								<ListItem key={medico._id}>
									<ListItemText primary={medico.nome} />
									<ListItemSecondaryAction>
										<IconButton
											onClick={() =>
												removeMedico(consultorio, medico, setLoading, medicos, setMedicos)
											}
											aria-label="Delete"
										>
											<MuiIcon>
												<Icon path={mdiTrashCan} />
											</MuiIcon>
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							))}
						</List>
					</div>
				</>
			)}
		</>
	);
}

export default withStyles(styles)(Medicos);
