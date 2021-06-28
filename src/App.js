import Play from './components/play'
import Results from './components/results'
import Home from './components/home'
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'
import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/tic-tac-toe">
        <div>
          <div>
            <NavLink className="app-link" exact={true} activeClassName='active-link' to='/play'>Play</NavLink>
            <NavLink className="app-link" activeClassName='active-link' to='/results'>Results</NavLink>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/play" component={Play} />
            <Route path="/results" component={Results} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
