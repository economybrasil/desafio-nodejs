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
import ConsultoriosModal from "./ConsultoriosModal";

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

function salvar(medico, history, setMedico, setLoading, setError) {
	const method = medico._id ? "post" : "put";

	axios[method](`http://localhost:4000/medicos${medico._id ? `/${medico._id}` : ""}`, medico)
		.then(result => {
			if (!medico._id) {
				if (result.data._id) {
					history.push(`/medicos/${result.data._id}`);
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

function removeConsultorio(medico, consultorio, setLoading, consultorios, setConsultorios) {
	setLoading(true);

	axios
		.delete(`http://localhost:4000/medicos/${medico._id}/consultorios/${consultorio._id}`)
		.then(() => {
			setLoading(false);
			setConsultorios(consultorios.filter(x => x._id !== consultorio._id));
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
	const [medico, setMedico] = useState(null);
	const [showModal, toggleModal] = useState(false);
	const [consultorios, setConsultorios] = useState([]);
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

	useEffect(() => {
		if (!id || showModal) {
			return;
		}

		axios
			.get(`http://localhost:4000/medicos/${id}/consultorios`)
			.then(result => {
				setConsultorios(result.data);
			})
			.catch(error => {
				setError(error);
			});
	}, [showModal]);

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
			<Tabs
				value={tabIndex}
				indicatorColor="primary"
				textColor="primary"
				onChange={(_, index) => setTabIndex(index)}
			>
				<Tab label="Dados Médico" />
				<Tab label="Consultórios" disabled={!medico._id} />
			</Tabs>
			{loading ? <LinearProgress /> : null}

			<div style={{ marginTop: 16 }} />
			{tabIndex == 0 ? (
				<>
					<Typography variant="subheading"> Médico </Typography>
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
						<Button onClick={() => history.replace("/medicos")} className={classes.button}>
							Voltar
						</Button>
						<span> </span>
						<Button
							variant="contained"
							onClick={() => salvar(medico, history, setMedico, setLoading, setError)}
							color="primary"
							className={classes.button}
						>
							Salvar
						</Button>
					</div>
				</>
			) : (
				<>
					<Typography variant="subheading"> {medico.nome} </Typography>
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
					<ConsultoriosModal
						open={showModal}
						medicoId={medico._id}
						consultoriosAtuais={consultorios}
						onClose={consultorio => {
							toggleModal(false);
						}}
					/>

					<div style={{ border: "1px solid #ccc", marginTop: 16 }}>
						<List>
							{consultorios.map(consultorio => (
								<ListItem key={consultorio._id}>
									<ListItemText primary={consultorio.nome} />
									<ListItemSecondaryAction>
										<IconButton
											onClick={() =>
												removeConsultorio(
													medico,
													consultorio,
													setLoading,
													consultorios,
													setConsultorios
												)
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
