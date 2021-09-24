import { BrowserRouter, Switch, Route } from "react-router-dom";

import Footer from './components/Footer';
import Header from './components/Header';
import BoardUser from "./pages/BoardUser";
import Home from './pages/Home';
import Login from "./pages/Login";
import Recipe from "./pages/Recipe";
import Recipes from "./pages/Recipes";
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
          <Route exact path="/profiles/:userId" component={BoardUser} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/recipes/cat/:category" component={Recipes} />
          <Route exact path="/recipes/:recipeId" component={Recipe} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
