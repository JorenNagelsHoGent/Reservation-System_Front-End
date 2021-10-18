import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Header from "./Components/header.js";
import Footer from "./Components/footer.js";
import Reservation from "./Components/reservation.js";
import Cloud from "./Components/cloud.js";
import Orders from "./Components/orders.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />

      
      <Router>
        <Switch>
          <Route exact path="/">
            <Reservation />
            {/* <Cloud
              title="Sorry!"
              description="De inschrijvingen zijn gesloten."
            /> */}
          </Route>
          <Route path="/succes">
            <Cloud
              title="Bedankt!"
              description="Je ontvangt een bevestigingsmail."
            />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route exact path="/validation">
            <Cloud title="Bedankt!" description="Uw reservatie is bevestigd!" />
          </Route>
          <Route path="/validation/error">
            <Cloud title="Oops!" description="Er is iets misgelopen!" />
          </Route>
          <Route path="/validation/expired">
            <Cloud title="Oops!" description="Uw reservatie is al bevestigd!" />
          </Route>
          <Route path="*">
            <Cloud title="Oops!" description="Error 404 : Page Not Found" />
          </Route>
        </Switch>
      </Router>

      <Footer />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
