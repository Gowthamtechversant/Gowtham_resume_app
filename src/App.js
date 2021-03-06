import './App.css';
import Resume from './Resume';
import Preview from './Preview';
import {
  Route,
  HashRouter
} from "react-router-dom"; 


function App() {
  return (
    <div style={{backgroundColor: "aliceblue", height:"100vh"}}>
        <HashRouter>
        <Route exact path="/" component={Resume} />
        <Route path="/preview" component={Preview} />
        </HashRouter>
     </div>
  );
}

export default App;
