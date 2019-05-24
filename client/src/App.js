import React from "react";
import Layout from "./Layout";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./modules/Home";
import Consultorios from "./modules/Consultorios";
import Consultorio from "./modules/Consultorio";
import Medicos from "./modules/Medicos";
import Medico from "./modules/Medico";
import Especialidade from "./modules/Especialidade";
import Especialidades from "./modules/Especialidades";

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Switch>
					<Route component={Home} exact path="/" />
					<Route component={Consultorios} exact path="/consultorios" />
					<Route component={Consultorio} exact path="/consultorios/novo" />
					<Route component={Consultorio} exact path="/consultorios/:id" />
					<Route component={Medicos} exact path="/medicos" />
					<Route component={Medico} exact path="/medicos/novo" />
					<Route component={Medico} exact path="/medicos/:id" />
					<Route component={Especialidades} exact path="/especialidades" />
					<Route component={Especialidade} exact path="/especialidades/novo" />
					<Route component={Especialidade} exact path="/especialidades/:id" />
				</Switch>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
