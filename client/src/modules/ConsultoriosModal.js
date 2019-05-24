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
import { mdiHospitalMarker } from "@mdi/js";

function salvarConsultorio(medicoId, consultorio, setLoading, setError, onClose) {
	setLoading(true);

	axios
		.put(`http://localhost:4000/medicos/${medicoId}/consultorios`, { id: consultorio._id })
		.then(result => {
			debugger;

			onClose(consultorio, result.data);

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

function Consultorios({ open, consultoriosAtuais, medicoId, onClose }) {
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
		<Dialog open={open} onClose={() => onClose(null)} aria-labelledby="simple-dialog-title">
			<DialogTitle id="simple-dialog-title">Selecione o Consultório</DialogTitle>
			<div>
				{loading ? <LinearProgress /> : null}
				<List>
					{consultorios
						.filter(x => !consultoriosAtuais.some(y => y._id === x._id))
						.map(consultorio => (
							<ListItem
								disabled={loading}
								button
								onClick={() => salvarConsultorio(medicoId, consultorio, setLoading, setError, onClose)}
								key={consultorio._id}
							>
								<ListItemAvatar>
									<Avatar>
										<MuiIcon>
											<Icon path={mdiHospitalMarker} />
										</MuiIcon>
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={consultorio.nome} />
							</ListItem>
						))}
				</List>
			</div>
		</Dialog>
	);
}

export default withStyles({})(Consultorios);
