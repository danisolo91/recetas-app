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
      <div className="container pt-5" style={{minHeight: '70vh'}}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile/:userId" component={BoardUser} />
          {/*<Route exact path="/recipes" component={BoardUser} />
          <Route path="/recipes/:id" component={BoardUser} />*/}
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
