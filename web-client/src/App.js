import { BrowserRouter, Switch, Route } from "react-router-dom";

import Footer from './components/Footer';
import Header from './components/Header';
import BoardUser from "./pages/BoardUser";
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/iniciar-sesion" component={Login} />
          <Route exact path="/crear-cuenta" component={Register} />
          <Route exact path="/mi-cuenta" component={BoardUser} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
