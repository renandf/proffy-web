import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import MentorList from "./pages/MentorList";
import MentorForm from "./pages/MentorForm";

function Routes() {
	return (
		<BrowserRouter>
			<Route path="/" exact component={Landing} />
			<Route path="/study" component={MentorList} />
			<Route path="/give-classes" component={MentorForm} />
		</BrowserRouter>
	);
}

export default Routes;
