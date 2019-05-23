import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Icon from "@mdi/react";
import MuiIcon from "@material-ui/core/Icon";
import { mdiDoctor, mdiHospitalMarker, mdiTune } from "@mdi/js";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
	root: {
		width: "100%",
		maxWidth: 260,
		margin: 16,
		marginLeft: 24,
		backgroundColor: theme.palette.background.paper
	}
});

function ListItemLink(props) {
	return <ListItem button component={NavLink} {...props} />;
}

function Menu(props) {
	const { classes } = props;
	return (
		<div className={classes.root}>
			<List component="nav">
				<ListItemLink to="/medicos">
					<ListItemIcon>
						<MuiIcon>
							<Icon path={mdiDoctor} />
						</MuiIcon>
					</ListItemIcon>
					<ListItemText primary="Médicos" />
				</ListItemLink>
				<ListItemLink to="/consultorios">
					<ListItemIcon>
						<MuiIcon>
							<Icon path={mdiHospitalMarker} />
						</MuiIcon>
					</ListItemIcon>
					<ListItemText primary="Consultórios" />
				</ListItemLink>
			</List>
			<Divider />
			<List component="nav">
				<ListItemLink to="/especialidades">
					<ListItemIcon>
						<MuiIcon>
							<Icon path={mdiTune} />
						</MuiIcon>
					</ListItemIcon>
					<ListItemText primary="Especialidades" />
				</ListItemLink>
			</List>
		</div>
	);
}

Menu.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
