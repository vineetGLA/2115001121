import './App.css';
import { Route,Routes } from 'react-router-dom';
import Register from './component/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="*" element={<p>Page not found</p>}/>
      </Routes>
    </div>
  );
}

export default App;
