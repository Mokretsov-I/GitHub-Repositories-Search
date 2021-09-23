import { Route, Switch } from "react-router-dom";

import { ROUTES } from "../const/routes";
import { SearchPage, SearchPageDetail } from "search";

export const AppRoutes = () => (
	<Switch>
		<Route exact path={ROUTES.SearchPage} component={SearchPage} />
		<Route path={ROUTES.SearchDetail} component={SearchPageDetail} />
	</Switch>
);
