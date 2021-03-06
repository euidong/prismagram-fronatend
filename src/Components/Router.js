import React from "react";
import PropTypes from "prop-types";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Feed from "../Routes/Feed";
import Auth from "../Routes/Auth/index";

const LoggedInRoutes = () => <><Route exact path="/" component={Feed} /></>

const LoggedOutRoutes = () => <><Route exact path="/" component={Auth} /></>

const AppRouter = ({isLoggedIn}) => <Router><Switch>{isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes/> }</Switch></Router>

AppRouter.prototypes = {
    isLoggedIn: PropTypes.bool.isRequired
};
export default AppRouter;