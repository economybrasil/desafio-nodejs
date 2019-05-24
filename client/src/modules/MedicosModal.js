import React, { useEffect, useState } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Icon from "@mdi/react";
import MuiIcon from "@material-ui/core/Icon";
import { mdiDoctor } from "@mdi/js";

function salvarMedico(consultorioId, medico, setLoading, setError, onClose) {
	setLoading(true);

	axios
		.put(`http://localhost:4000/consultorios/${consultorioId}/medicos`, { id: medico._id })
		.then(result => {
			debugger;

			onClose(medico, result.data);

			setLoading(false);
		})
		.catch(error => {
			debugger;

			if (error && error.response && error.response.data && typeof error.response.data == "string") {
				alert(error.response.data);
			}
			setError(error);
			setLoading(false);
		});
}

function Medicos({ open, medicosAtuais, consultorioId, onClose }) {
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
		<Dialog open={open} onClose={() => onClose(null)} aria-labelledby="simple-dialog-title">
			<DialogTitle id="simple-dialog-title">Selecione o Médico</DialogTitle>
			<div>
				{loading ? <LinearProgress /> : null}
				<List>
					{medicos
						.filter(x => !medicosAtuais.some(y => y._id === x._id))
						.map(medico => (
							<ListItem
								disabled={loading}
								button
								onClick={() => salvarMedico(consultorioId, medico, setLoading, setError, onClose)}
								key={medico._id}
							>
								<ListItemAvatar>
									<Avatar>
										<MuiIcon>
											<Icon path={mdiDoctor} />
										</MuiIcon>
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={medico.nome} />
							</ListItem>
						))}
				</List>
			</div>
		</Dialog>
	);
}

export default withStyles({})(Medicos);
