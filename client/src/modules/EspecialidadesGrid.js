import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";

function salvar(consultorio, setLoading, setError) {
	axios
		.post(`http://localhost:4000/consultorios/${consultorio._id}`, consultorio)
		.then(result => {
			setLoading(false);
		})
		.catch(error => {
			setError(error);
			setLoading(false);
		});
}

function EspecialidadesGrid({ classes, history, especialidades, onEspecialidadesChange }) {
	const [especialidadesList, setEspecialidadesList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios
			.get(`http://localhost:4000/especialidades`)
			.then(result => {
				setEspecialidadesList(result.data);
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

			<Divider style={{ marginTop: 16 }} />
			<Typography variant="subheading"> Especialidades </Typography>

			<FormControl component="fieldset">
				<FormLabel component="legend">Marque as Especialidades</FormLabel>
				<FormGroup>
					{especialidadesList.map(especialidade => (
						<FormControlLabel
							control={
								<Switch
									checked={especialidades.includes(especialidade._id)}
									onChange={e => {
										if (e.target.checked) {
											onEspecialidadesChange(especialidades.concat(especialidade._id));
										} else {
											onEspecialidadesChange(especialidades.filter(x => x !== especialidade._id));
										}
									}}
									value={especialidade}
								/>
							}
							label={especialidade.nome}
						/>
					))}
				</FormGroup>
			</FormControl>
		</>
	);
}

export default EspecialidadesGrid;
