import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './React/LandingPage/LandingPage';
import Home from './React/Home/Home';
import RecipeCreate from './React/RecipeCreate/RecipeCreate';
import Detail from './React/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route>
            <Route className="home-conteiner" path='/home' component={Home}/>
            <Route path='/recipe' component={RecipeCreate}/>
            <Route path='/detail/:id' component={Detail}/>
          </Route>
        </Switch> 
      </div>
    </BrowserRouter>
  );
}

export default App;