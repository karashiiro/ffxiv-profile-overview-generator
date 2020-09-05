import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { OverviewGenerator } from "./OverviewGenerator";

export function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/:world/:characterName" component={OverviewGenerator} />
			</Switch>
		</Router>
	);
}
