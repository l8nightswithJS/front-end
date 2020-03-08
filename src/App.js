import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { bwReducer as reducer } from "./reducers/bwReducer";

import SignupForm from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Login from "./components/Login/Login";
import LandingPage from "./components/UserLandingPage/LandingPage";
import NewUser from "./components/UserLandingPage/NewUserLanding";
import AccountPage from "./components/AccountPage";
import EditData from "./components/EditData";

import "./App.css";

const store = createStore(reducer, applyMiddleware(thunk));

// TODO: create list compojnent that lets you view previous date ranges and have them display on the graph

function App() {
    return (
        <Provider store={store}>
            {/* All of your jsx and components will be inside of Provider */}
            <Router>
                <Header headerText="Sleep Tracker" />
                <div className="App">
                    <Route exact path="/" component={Login} />
                    <Route exact path="/signup" component={SignupForm} />
                    <PrivateRoute exact path="/new" component={NewUser} />
                    <PrivateRoute exact path="/home" component={LandingPage} />
                    <PrivateRoute
                        exact
                        path="/account"
                        component={AccountPage}
                    />
                    <PrivateRoute exact path="/edit" component={EditData} />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
