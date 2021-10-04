
import "./App.css";
import Formulaire from "./Formulaire";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:id">
          <Formulaire />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
