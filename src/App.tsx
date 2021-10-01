import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './pages/Index';

const App: React.FC = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={ Index } />
        </Switch>
    </Router>
  );
}

export default App;
