import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utilities/setAuthToken";
import { setCurrentUser, logoutCurrentUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/Common/PrivateRoute";

import "./App.css";

//Import components
import { Layout } from "antd";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navigation from "./components/Layout/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateProfile from "./components/Profile/CreateProfile";
import NotFound from "./components/Common/NotFound";
import EditProfile from "./components/Profile/EditProfile";
import NewInjury from "./components/GeneralData/NewInjury";
import NewBloodPressure from "./components/GeneralData/NewBloodPressure";
import NewBPM from "./components/GeneralData/NewBPM";
import RaceDash from "./components/Races/RaceDash";
import FiftyMetre from "./components/Races/FiftyMetre";
import HundredMetre from "./components/Races/HundredMetre";
import SwimmerProfiles from "./components/Swimmers/SwimmerProfiles";
import IndividualProfile from "./components/SwimmerProfiles/IndividualProfile";
import RaceAnalysis from "./components/RaceAnalysis/RaceAnalysis";

//Check to see if token is in local storage
if (localStorage.jwtToken) {
  //set the auth token to the header
  setAuthToken(localStorage.jwtToken);
  //decode toekn and get user info and when token expires
  const decodedToken = jwt_decode(localStorage.jwtToken);
  //set the user and isAuthenticated
  store.dispatch(setCurrentUser(decodedToken));

  //Check to see if the token has retired
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    //log out user
    store.dispatch(logoutCurrentUser());
    //Clear current profile
    store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    const { Footer, Content } = Layout;
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              {/* https://stackoverflow.com/questions/49595304/nested-routes-inside-react-component */}
              <Layout style={{ height: "100vh" }}>
                <Navigation />
                <Content
                  style={{
                    padding: "0 16px"
                  }}
                >
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/dashboard"
                      component={Dashboard}
                    />
                    <PrivateRoute
                      exact
                      path="/create-profile"
                      component={CreateProfile}
                    />
                    <PrivateRoute
                      exact
                      path="/edit-profile"
                      component={EditProfile}
                    />
                    <PrivateRoute
                      exact
                      path="/new-injury/:username"
                      component={NewInjury}
                    />
                    <PrivateRoute
                      exact
                      path="/new-bloodpressure/:username"
                      component={NewBloodPressure}
                    />
                    <PrivateRoute
                      exact
                      path="/new-bpm/:username"
                      component={NewBPM}
                    />
                    <PrivateRoute exact path="/my-races" component={RaceDash} />
                    <PrivateRoute
                      exact
                      path="/fiftyrace/:username"
                      component={FiftyMetre}
                    />
                    <PrivateRoute
                      exact
                      path="/hundredrace/:username"
                      component={HundredMetre}
                    />
                    <PrivateRoute
                      exact
                      path="/swimmer-search"
                      component={SwimmerProfiles}
                    />
                    <PrivateRoute
                      exact
                      path="/swimmer/:username"
                      component={IndividualProfile}
                    />
                    <PrivateRoute
                      exact
                      path="/race/:race_id"
                      component={RaceAnalysis}
                    />
                    <PrivateRoute path="/" component={NotFound} />
                  </Switch>
                  <Footer style={{ textAlign: "center" }}>
                    Prototype system {new Date().getFullYear} - Created by
                    Andrew De Torres
                  </Footer>
                </Content>
              </Layout>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
