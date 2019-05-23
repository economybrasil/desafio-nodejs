import React from "react";
import Helmet from "helmet";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Menu from "./Menu";
import Grid from "@material-ui/core/Grid";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import lightBlue from "@material-ui/core/colors/lightBlue";

const theme = createMuiTheme({
	palette: {
		primary: indigo,
		secondary: lightBlue
	}
});

const styles = {
	root: {
		flexGrow: 1,
		width: "94%",
		marginLeft: "3%"
	},
	page: {
		padding: 8,
		margin: 16
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	}
};

function Layout({ classes, children }) {
	return (
		<>
			<Helmet>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
			</Helmet>
			<MuiThemeProvider theme={theme}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" color="inherit" className={classes.grow}>
							Economy Brasil
						</Typography>
					</Toolbar>
				</AppBar>
				<div className={classes.root}>
					<Grid container spacing={24}>
						<Grid item xs={3}>
							<Menu />
						</Grid>
						<Grid item xs={8}>
							<Paper className={classes.page} elevation={1}>
								{children}
							</Paper>
						</Grid>
					</Grid>
				</div>
			</MuiThemeProvider>
		</>
	);
}

Layout.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Layout);
