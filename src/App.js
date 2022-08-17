import './App.css';

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Nav from './components/Nav/Nav';
import RoutesPath from './routes/RoutesPath';
import MetaExpert from './components/metaExpert/MetaExpert';

function App() {
  return (
    <section className='bodyWrapper'>
      <Router>        
       <RoutesPath/>
      </Router>
    </section>
  );
}

export default App;
